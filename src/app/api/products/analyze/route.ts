import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { zodOutputFormat } from '@anthropic-ai/sdk/helpers/zod'
import Anthropic from '@anthropic-ai/sdk'
import { getUser } from '@/lib/auth'
import {
  getClaudeClient,
  CLAUDE_MODEL,
  PRODUCT_CATEGORIES,
  PRODUCT_CONDITIONS,
} from '@/lib/claude'

export const maxDuration = 60

const AnalysisSchema = z.object({
  match: z.object({
    isMatch: z
      .boolean()
      .describe(
        'true si las imágenes muestran un producto compatible con el nombre declarado por el usuario'
      ),
    confidence: z
      .number()
      .min(0)
      .max(100)
      .describe('Confianza de la coincidencia entre imágenes y nombre, 0-100'),
    explanation: z
      .string()
      .describe(
        'Explicación breve en español argentino de por qué coincide o no. Si no coincide, qué producto se ve realmente.'
      ),
  }),
  suggestedTitle: z
    .string()
    .describe('Título mejorado en español, claro y específico. Máx 80 caracteres.'),
  description: z
    .string()
    .describe(
      'Descripción detallada del producto en español argentino, 2-4 párrafos. Incluir características, materiales, uso, defectos visibles si los hay.'
    ),
  category: z.enum(PRODUCT_CATEGORIES).describe('Categoría más apropiada de la lista'),
  condition: z
    .enum(PRODUCT_CONDITIONS)
    .describe('Estado/condición estimada del producto basada en lo que se ve en las fotos'),
  estimatedPrice: z.object({
    min: z.number().describe('Precio mínimo estimado en pesos argentinos (ARS)'),
    max: z.number().describe('Precio máximo estimado en pesos argentinos (ARS)'),
    note: z
      .string()
      .describe(
        'Nota breve explicando el rango: marca/modelo detectado, comparables del mercado, factores de ajuste.'
      ),
  }),
  characteristics: z
    .array(z.string())
    .describe(
      'Lista de 4-8 características clave detectadas (marca, modelo, color, tamaño, material, año, etc.)'
    ),
})

const SYSTEM_PROMPT = `Sos un experto en marketplace argentino de compraventa de productos usados y nuevos.

Tu tarea: analizar fotos de un producto + el nombre que el vendedor escribió, y devolver:
1. Validación: ¿las fotos coinciden con el nombre declarado?
2. Datos del producto detectado: título mejorado, descripción, categoría, estado, precio estimado en ARS, características.

Reglas:
- Si el usuario escribió "iPhone 13" pero las fotos muestran un Samsung, marcá isMatch=false con confidence bajo (<30) y explicá qué se ve realmente.
- Si las fotos son borrosas o no se ve claro el producto, usá confidence medio (40-70) y aclarálo.
- Precios en ARS deben ser realistas para el mercado argentino actual. Considerá inflación y mercado de usados.
- Descripción: tono natural argentino, sin emojis excesivos, sin frases hechas tipo "Excelente oportunidad".
- Estado: basate solo en lo visible. Si no podés determinarlo, asumí "Usado - Bueno".
- Categoría: elegí EXACTAMENTE una de la lista.

Categorías disponibles: ${PRODUCT_CATEGORIES.join(', ')}
Estados disponibles: ${PRODUCT_CONDITIONS.join(', ')}`

const RequestBodySchema = z.object({
  productName: z.string().min(1).max(200),
  images: z.array(z.string()).min(1).max(5),
})

function parseDataUri(
  dataUri: string
): { mediaType: 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp'; data: string } | null {
  const match = dataUri.match(/^data:(image\/(?:jpeg|jpg|png|gif|webp));base64,(.+)$/)
  if (!match) return null
  const mediaType = (match[1] === 'image/jpg' ? 'image/jpeg' : match[1]) as
    | 'image/jpeg'
    | 'image/png'
    | 'image/gif'
    | 'image/webp'
  return { mediaType, data: match[2] }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getUser(request)
    if (!user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const body = await request.json()
    const parsed = RequestBodySchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const { productName, images } = parsed.data

    const imageBlocks = images
      .map(parseDataUri)
      .filter((x): x is NonNullable<typeof x> => x !== null)
      .map((img) => ({
        type: 'image' as const,
        source: { type: 'base64' as const, media_type: img.mediaType, data: img.data },
      }))

    if (imageBlocks.length === 0) {
      return NextResponse.json(
        { error: 'No se pudo procesar ninguna imagen. Formato esperado: data:image/...;base64,...' },
        { status: 400 }
      )
    }

    const client = getClaudeClient()

    const response = await client.messages.parse({
      model: CLAUDE_MODEL,
      max_tokens: 4096,
      system: [
        {
          type: 'text',
          text: SYSTEM_PROMPT,
          cache_control: { type: 'ephemeral' },
        },
      ],
      messages: [
        {
          role: 'user',
          content: [
            ...imageBlocks,
            {
              type: 'text',
              text: `El vendedor declaró que está publicando: "${productName}"\n\nAnalizá las imágenes y devolvé el JSON estructurado.`,
            },
          ],
        },
      ],
      output_config: {
        format: zodOutputFormat(AnalysisSchema),
      },
    })

    if (!response.parsed_output) {
      return NextResponse.json(
        { error: 'La IA no devolvió un análisis válido. Probá de nuevo o subí mejores fotos.' },
        { status: 502 }
      )
    }

    return NextResponse.json({
      analysis: response.parsed_output,
      usage: {
        inputTokens: response.usage.input_tokens,
        outputTokens: response.usage.output_tokens,
        cacheReadTokens: response.usage.cache_read_input_tokens,
        cacheCreationTokens: response.usage.cache_creation_input_tokens,
      },
    })
  } catch (error) {
    if (error instanceof Anthropic.AuthenticationError) {
      return NextResponse.json(
        { error: 'ANTHROPIC_API_KEY inválida o no configurada.' },
        { status: 500 }
      )
    }
    if (error instanceof Anthropic.RateLimitError) {
      return NextResponse.json(
        { error: 'Demasiadas solicitudes a la IA. Esperá unos segundos.' },
        { status: 429 }
      )
    }
    if (error instanceof Anthropic.APIError) {
      console.error('Error de API Claude:', error.status, error.message)
      return NextResponse.json(
        { error: `Error de la IA: ${error.message}` },
        { status: error.status || 500 }
      )
    }
    console.error('Error analizando producto:', error)
    return NextResponse.json(
      { error: 'Error interno al analizar el producto' },
      { status: 500 }
    )
  }
}
