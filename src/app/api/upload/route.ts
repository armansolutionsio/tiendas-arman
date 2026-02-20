import { NextRequest, NextResponse } from 'next/server'
import { getUser } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    // Verificar autenticación
    const user = await getUser(request)
    if (!user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json({ error: 'No se encontró archivo' }, { status: 400 })
    }

    // Validar tipo de archivo
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ 
        error: 'Tipo de archivo no válido. Solo se permiten JPG, PNG y WebP' 
      }, { status: 400 })
    }

    // Validar tamaño (5MB máximo)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json({ 
        error: 'Archivo muy grande. Máximo 5MB' 
      }, { status: 400 })
    }

    // Convertir archivo a base64 para Cloudinary
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64Data = buffer.toString('base64')
    const dataURI = `data:${file.type};base64,${base64Data}`

    // Por ahora, devolver la imagen como base64 (temporal)
    // En la siguiente iteración conectaremos con Cloudinary
    return NextResponse.json({ 
      imageUrl: dataURI,
      message: 'Imagen procesada exitosamente' 
    })

  } catch (error) {
    console.error('Error subiendo imagen:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}