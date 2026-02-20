# 🛍️ Tiendas Arman - Marketplace Seguro

[![Next.js](https://img.shields.io/badge/Next.js-15.0-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-18.0-blue?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![Prisma](https://img.shields.io/badge/Prisma-6.13-2D3748?logo=prisma)](https://www.prisma.io)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

**Tiendas Arman** es una plataforma segura y moderna de compra-venta de Argentina. Construida con tecnologías modernas y con un diseño premium.

## 🎯 Características Principales

- 🔐 **Autenticación Segura** - JWT con contraseñas hasheadas
- 💳 **Gestión de Productos** - CRUD completo para productos
- 🔍 **Búsqueda y Filtros** - Búsqueda por categoría y término
- 👤 **Perfil de Usuario** - Dashboard personal
- 📱 **Responsive Design** - Funciona en todos los dispositivos
- 🎨 **Diseño Moderno** - UI/UX premium
- ⚡ **Rendimiento** - Optimizado para velocidad
- 🌐 **API RESTful** - API completo y documentado

## 🛠️ Stack Tecnológico

### Frontend
- **Framework:** Next.js 15
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS 3.4
- **Componentes:** React 18

### Backend
- **ORM:** Prisma 6.13
- **Base de Datos:** PostgreSQL
- **Autenticación:** JWT + bcryptjs
- **API:** Next.js Route Handlers

### DevOps
- **Containerización:** Docker & Docker Compose
- **Base de Datos:** PostgreSQL en contenedor
- **Gestor de Paquetes:** npm/yarn

## 🚀 Inicio Rápido

### Requisitos Previos
- Node.js 18+ 
- Docker y Docker Compose
- npm o yarn

### Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/tuusuario/tiendas-arman.git
cd tiendas-arman
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
# Copiar archivo de ejemplo
cp .env.example .env.local

# Editar con tus valores
nano .env.local
```

Variables necesarias:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/tiendas_arman
NEXT_PUBLIC_API_URL=http://localhost:3000
JWT_SECRET=tu_secreto_super_seguro
```

4. **Iniciar base de datos**
```bash
npm run docker:up
```

5. **Ejecutar migraciones**
```bash
npm run db:migrate
```

6. **Iniciar servidor de desarrollo**
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📦 Estructura del Proyecto

```
tiendas-arman/
├── src/
│   ├── app/
│   │   ├── api/              # Rutas API
│   │   ├── auth/             # Autenticación (login, register)
│   │   ├── products/         # Gestión de productos
│   │   ├── dashboard/        # Panel del usuario
│   │   └── page.tsx          # Página principal
│   ├── components/           # Componentes reutilizables
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── ProductCard.tsx
│   ├── lib/                  # Funciones auxiliares
│   │   ├── auth.ts
│   │   └── prisma.ts
│   └── types/                # Definiciones de tipos
├── prisma/
│   ├── schema.prisma         # Modelo de datos
│   └── migrations/           # Migraciones de BD
├── public/                   # Archivos estáticos
│   └── logo.svg              # Logo de Tiendas Arman
├── docker-compose.yml        # Configuración Docker
├── tailwind.config.ts        # Config Tailwind
├── tsconfig.json             # Config TypeScript
└── package.json              # Dependencias
```

## 🔧 Comandos Disponibles

### Desarrollo
```bash
npm run dev          # Iniciar servidor desarrollo
npm run build        # Construir para producción
npm run start        # Iniciar servidor producción
npm run lint         # Ejecutar linter
```

### Base de Datos
```bash
npm run db:migrate   # Ejecutar migraciones
npm run db:generate  # Generar cliente Prisma
npm run db:studio    # Abrir Prisma Studio
npm run db:reset     # Resetear base de datos
npm run db:seed      # Cargar datos de prueba
```

### Docker
```bash
npm run docker:up    # Iniciar contenedores
npm run docker:down  # Detener contenedores
npm run docker:logs  # Ver logs
```

## 🎨 Branding y Diseño

### Paleta de Colores
- **Primario:** Púrpura (#9333ea)
- **Secundario:** Gris (#525252)
- **Éxito:** Verde (#10b981)
- **Advertencia:** Amarillo (#f59e0b)
- **Peligro:** Rojo (#ef4444)

### Logo
El logo es una bolsa de compras púrpura con la letra "A" blanca en el centro, representando el marcaAlignmentManuel de Tiendas Arman.

### Tipografía
- **Font:** Inter (Google Fonts)
- **Headings:** Bold
- **Body:** Regular

## 📚 Documentación de API

### Autenticación

#### POST `/api/auth/register`
Registrar nuevo usuario.

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "password": "password123"
  }'
```

#### POST `/api/auth/login`
Iniciar sesión.

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@example.com",
    "password": "password123"
  }'
```

### Productos

#### GET `/api/products`
Obtener listado de productos con paginación.

```bash
curl "http://localhost:3000/api/products?category=Electrónicos&search=laptop&page=1&limit=12"
```

#### POST `/api/products`
Crear nuevo producto (requiere autenticación).

```bash
curl -X POST http://localhost:3000/api/products \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Laptop HP",
    "description": "Laptop en perfecto estado",
    "price": 50000,
    "category": "Electrónicos",
    "condition": "Nuevo",
    "location": "Buenos Aires"
  }'
```

## 🔐 Seguridad

- ✅ Contraseñas hasheadas con bcryptjs
- ✅ JWT para autenticación
- ✅ Variables de entorno para secretos
- ✅ Validación de entrada en APIs
- ✅ CORS configurado
- ✅ Rate limiting (recomendado para producción)

## 📱 Responsive Design

La aplicación es completamente responsive:
- **Desktop:** 4 columnas
- **Tablet:** 3 columnas
- **Mobile:** 2 columnas / 1 columna

## 🧪 Testing

```bash
# Tests unitarios (próximamente)
npm run test

# Coverage
npm run test:coverage

# E2E Tests
npm run test:e2e
```

## 🐛 Reporte de Bugs

Si encuentras un bug, por favor abre un issue en GitHub con:
- Descripción del problema
- Pasos para reproducir
- Navegador y versión
- Screenshots (si aplica)

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 👥 Autor

**Tiendas Arman**
- 🌐 [Sitio Web](https://tiendas-arman.com)
- 📧 info@tiendas-arman.com
- 📱 +54 9 11 0000-0000

## 🙏 Agradecimientos

- Next.js por el excelente framework
- Vercel por el hosting
- Tailwind CSS por los estilos
- Prisma por el ORM
- La comunidad de código abierto

## 📊 Estadísticas

- **Versión:** 0.1.0
- **Estado:** En desarrollo
- **Última actualización:** Febrero 2026
- **Total de commits:** 50+

---

**Hecho con 💜 en Argentina**
