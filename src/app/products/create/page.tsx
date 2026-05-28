'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type AIAnalysis = {
  match: {
    isMatch: boolean
    confidence: number
    explanation: string
  }
  suggestedTitle: string
  description: string
  category: string
  condition: string
  estimatedPrice: {
    min: number
    max: number
    note: string
  }
  characteristics: string[]
}

export default function CreateProductPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    condition: '',
    category: '',
    location: ''
  })
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [uploadingImages, setUploadingImages] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Estado IA
  const [analyzing, setAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null)
  const [aiError, setAiError] = useState('')
  const [mismatchWarning, setMismatchWarning] = useState<AIAnalysis | null>(null)

  const router = useRouter()

  const categories = [
    'Electrónicos',
    'Ropa y Accesorios',
    'Hogar y Jardín',
    'Deportes',
    'Libros',
    'Vehículos',
    'Otros'
  ]

  const conditions = [
    'Nuevo',
    'Usado - Excelente',
    'Usado - Muy bueno',
    'Usado - Bueno',
    'Usado - Regular',
    'Refurbished'
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return

    const newFiles = Array.from(files).slice(0, 5)
    setSelectedFiles(prev => [...prev, ...newFiles].slice(0, 5))

    newFiles.forEach(file => {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviews(prev => [...prev, e.target?.result as string].slice(0, 5))
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
    setPreviews(prev => prev.filter((_, i) => i !== index))
    setUploadedImages(prev => prev.filter((_, i) => i !== index))
    setAnalysis(null)
  }

  const uploadImages = async () => {
    if (selectedFiles.length === 0) return []

    setUploadingImages(true)
    const uploadedUrls: string[] = []

    try {
      for (const file of selectedFiles) {
        const fd = new FormData()
        fd.append('file', file)

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: fd,
        })

        if (response.ok) {
          const data = await response.json()
          uploadedUrls.push(data.imageUrl)
        } else {
          throw new Error('Error subiendo imagen')
        }
      }

      setUploadedImages(uploadedUrls)
      return uploadedUrls
    } catch (err) {
      console.error('Error uploading images:', err)
      setError('Error subiendo imágenes')
      return []
    } finally {
      setUploadingImages(false)
    }
  }

  const applyAnalysis = (a: AIAnalysis) => {
    setFormData(prev => ({
      ...prev,
      title: a.suggestedTitle || prev.title,
      description: a.description,
      category: a.category,
      condition: a.condition,
      price: prev.price || String(Math.round((a.estimatedPrice.min + a.estimatedPrice.max) / 2)),
    }))
    setAnalysis(a)
  }

  const handleAnalyze = async () => {
    setAiError('')
    setAnalysis(null)

    if (!formData.title.trim()) {
      setAiError('Escribí primero el nombre del producto.')
      return
    }
    if (previews.length === 0) {
      setAiError('Subí al menos una foto del producto.')
      return
    }

    setAnalyzing(true)
    try {
      const response = await fetch('/api/products/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: formData.title,
          images: previews,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setAiError(data.error || 'No se pudo analizar el producto.')
        return
      }

      const a: AIAnalysis = data.analysis

      // Umbral de mismatch: confianza < 50 o isMatch=false
      if (!a.match.isMatch || a.match.confidence < 50) {
        setMismatchWarning(a)
        return
      }

      applyAnalysis(a)
    } catch (err) {
      console.error('Error analizando:', err)
      setAiError('Error de conexión al analizar.')
    } finally {
      setAnalyzing(false)
    }
  }

  const acceptMismatch = () => {
    if (mismatchWarning) {
      applyAnalysis(mismatchWarning)
      setMismatchWarning(null)
    }
  }

  const cancelMismatch = () => {
    setMismatchWarning(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    if (!formData.title || !formData.description || !formData.price || !formData.condition || !formData.category || !formData.location) {
      setError('Todos los campos son requeridos')
      setLoading(false)
      return
    }

    if (parseFloat(formData.price) <= 0) {
      setError('El precio debe ser mayor a 0')
      setLoading(false)
      return
    }

    try {
      let imageUrls = uploadedImages
      if (selectedFiles.length > 0 && uploadedImages.length === 0) {
        imageUrls = await uploadImages()
      }

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          images: imageUrls
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess('Producto creado exitosamente. Redirigiendo...')
        setTimeout(() => {
          router.push('/products')
        }, 2000)
      } else {
        setError(data.error || 'Error al crear el producto')
      }
    } catch (err) {
      console.error('Error:', err)
      setError('Error de conexión')
    } finally {
      setLoading(false)
    }
  }

  const canAnalyze = previews.length > 0 && formData.title.trim().length > 0 && !analyzing

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-primary-600">
                🛍️ Tiendas Arman
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard"
                className="text-primary-600 hover:text-primary-800"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">
              Publicar nuevo producto
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Subí fotos, escribí el nombre y dejá que la IA complete el resto. Después revisás y publicás.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Nombre del producto *
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 bg-white focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Ej: iPhone 13 Pro Max 256GB"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Imágenes del producto *
                </label>

                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-500 transition-colors"
                  onDrop={(e) => {
                    e.preventDefault()
                    handleFileSelect(e.dataTransfer.files)
                  }}
                  onDragOver={(e) => e.preventDefault()}
                  onDragEnter={(e) => e.preventDefault()}
                >
                  <div className="space-y-2">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex text-sm text-gray-600 justify-center">
                      <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none">
                        <span>Subir archivos</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          accept="image/*"
                          multiple
                          className="sr-only"
                          onChange={(e) => handleFileSelect(e.target.files)}
                        />
                      </label>
                      <p className="pl-1">o arrastrá y soltá</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, WebP hasta 5MB (máximo 5 imágenes)</p>
                  </div>
                </div>

                {previews.length > 0 && (
                  <div className="mt-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                      {previews.map((preview, index) => (
                        <div key={index} className="relative">
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                    {uploadingImages && (
                      <div className="mt-2 flex items-center text-sm text-gray-600">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600 mr-2"></div>
                        Subiendo imágenes...
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Bloque de IA */}
              <div className="border-2 border-primary-200 bg-primary-50 rounded-lg p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-primary-900 flex items-center gap-2">
                      <span>✨</span>
                      <span>Análisis automático con IA</span>
                    </h4>
                    <p className="text-xs text-primary-700 mt-1">
                      La IA mira tus fotos + el nombre y completa descripción, categoría, estado y precio sugerido. Después podés editar lo que quieras.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAnalyze}
                    disabled={!canAnalyze}
                    className="shrink-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {analyzing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Analizando...
                      </>
                    ) : (
                      'Analizar con IA'
                    )}
                  </button>
                </div>

                {aiError && (
                  <div className="mt-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded p-2">
                    {aiError}
                  </div>
                )}

                {analysis && (
                  <div className="mt-4 bg-white rounded p-3 border border-primary-200 space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-green-600">✓</span>
                      <span className="font-medium text-gray-900">
                        Coincidencia: {analysis.match.confidence}%
                      </span>
                      <span className="text-gray-600">— {analysis.match.explanation}</span>
                    </div>
                    {analysis.characteristics.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-gray-700 mb-1">Características detectadas:</p>
                        <div className="flex flex-wrap gap-1">
                          {analysis.characteristics.map((c, i) => (
                            <span key={i} className="text-xs bg-primary-100 text-primary-800 px-2 py-0.5 rounded">
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="text-xs text-gray-600">
                      <span className="font-semibold">Precio sugerido:</span> ${analysis.estimatedPrice.min.toLocaleString('es-AR')} – ${analysis.estimatedPrice.max.toLocaleString('es-AR')} ARS
                      <span className="block text-gray-500 mt-0.5">{analysis.estimatedPrice.note}</span>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Descripción *
                </label>
                <textarea
                  name="description"
                  id="description"
                  rows={5}
                  required
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 bg-white focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Describí tu producto. Si usás la IA, se completa solo y podés ajustar."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Precio (ARS) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    required
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 bg-white focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder="50000"
                  />
                </div>

                <div>
                  <label htmlFor="condition" className="block text-sm font-medium text-gray-700">
                    Estado *
                  </label>
                  <select
                    name="condition"
                    id="condition"
                    required
                    value={formData.condition}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 bg-white focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="" className="text-gray-900">Seleccionar estado</option>
                    {conditions.map((condition) => (
                      <option key={condition} value={condition} className="text-gray-900">
                        {condition}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Categoría *
                  </label>
                  <select
                    name="category"
                    id="category"
                    required
                    value={formData.category}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 bg-white focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="" className="text-gray-900">Seleccionar categoría</option>
                    {categories.map((category) => (
                      <option key={category} value={category} className="text-gray-900">
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                    Ubicación *
                  </label>
                  <input
                    type="text"
                    name="location"
                    id="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 bg-white focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Ej: Capital Federal, Buenos Aires"
                  />
                </div>
              </div>

              {error && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="text-sm text-red-700">{error}</div>
                </div>
              )}

              {success && (
                <div className="rounded-md bg-green-50 p-4">
                  <div className="text-sm text-green-700">{success}</div>
                </div>
              )}

              <div className="flex justify-end space-x-3">
                <Link
                  href="/products"
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Cancelar
                </Link>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                >
                  {loading ? 'Publicando...' : 'Publicar producto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Modal de mismatch */}
      {mismatchWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-start gap-3">
              <div className="text-3xl">⚠️</div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900">
                  Las fotos no coinciden bien con el nombre
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Confianza: {mismatchWarning.match.confidence}%
                </p>
              </div>
            </div>
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-sm text-gray-800">
              {mismatchWarning.match.explanation}
            </div>
            <div className="mt-4 text-sm text-gray-700">
              <p className="font-semibold mb-1">La IA detectó:</p>
              <p>{mismatchWarning.suggestedTitle}</p>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={cancelMismatch}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Revisar fotos / nombre
              </button>
              <button
                type="button"
                onClick={acceptMismatch}
                className="px-4 py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700"
              >
                Aplicar de todos modos
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
