#!/bin/bash

# 🎨 TIENDAS ARMAN - Script de Inicialización

echo "=================================="
echo "🛍️  Bienvenido a Tiendas Arman"
echo "=================================="
echo ""

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado"
    echo "Por favor, instala Node.js desde https://nodejs.org"
    exit 1
fi

echo "✅ Node.js versión: $(node --version)"
echo ""

# Instalación de dependencias
echo "📦 Instalando dependencias..."
npm install

echo ""
echo "🗄️  Configurando base de datos..."
echo "   1. Iniciando Docker..."
npm run docker:up

echo ""
echo "   2. Ejecutando migraciones..."
npm run db:migrate

echo ""
echo "✅ ¡Instalación completada!"
echo ""
echo "🚀 Para iniciar el servidor:"
echo "   npm run dev"
echo ""
echo "📖 Accede a: http://localhost:3000"
echo ""
echo "=================================="
