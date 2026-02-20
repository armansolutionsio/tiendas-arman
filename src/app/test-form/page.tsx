'use client'

import { useState } from 'react'

export default function TestForm() {
  const [inputValue, setInputValue] = useState('')
  const [selectValue, setSelectValue] = useState('')

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">Prueba de formulario</h1>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Input de prueba
            </label>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Escribe algo aquí"
            />
            <div className="mt-1 text-sm text-gray-600">
              Valor actual: &quot;{inputValue}&quot;
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select de prueba
            </label>
            <select
              value={selectValue}
              onChange={(e) => setSelectValue(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecciona una opción</option>
              <option value="opcion1">Opción 1</option>
              <option value="opcion2">Opción 2</option>
            </select>
            <div className="mt-1 text-sm text-gray-600">
              Selección: &quot;{selectValue}&quot;
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-100 rounded">
            <h3 className="font-bold">Estado actual:</h3>
            <pre className="text-xs mt-2">
              {JSON.stringify({ inputValue, selectValue }, null, 2)}
            </pre>
          </div>

          <button
            onClick={() => alert(`Input: ${inputValue}, Select: ${selectValue}`)}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Probar valores
          </button>
        </div>
      </div>
    </div>
  )
}