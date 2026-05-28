import Anthropic from '@anthropic-ai/sdk'

let cachedClient: Anthropic | null = null

export function getClaudeClient(): Anthropic {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error(
      'ANTHROPIC_API_KEY no configurada. Agregala en docker-compose.yml o en .env.local'
    )
  }
  if (!cachedClient) {
    cachedClient = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  }
  return cachedClient
}

export const CLAUDE_MODEL = process.env.CLAUDE_MODEL || 'claude-sonnet-4-6'

export const PRODUCT_CATEGORIES = [
  'Electrónicos',
  'Ropa y Accesorios',
  'Hogar y Jardín',
  'Deportes',
  'Libros',
  'Vehículos',
  'Otros',
] as const

export const PRODUCT_CONDITIONS = [
  'Nuevo',
  'Usado - Excelente',
  'Usado - Muy bueno',
  'Usado - Bueno',
  'Usado - Regular',
  'Refurbished',
] as const

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number]
export type ProductCondition = (typeof PRODUCT_CONDITIONS)[number]
