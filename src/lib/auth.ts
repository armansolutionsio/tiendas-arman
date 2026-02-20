import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'
import { prisma } from './prisma'

export interface User {
  id: string
  email: string
  name?: string | null
}

export async function getUser(request: NextRequest): Promise<User | null> {
  try {
    const token = request.cookies.get('token')?.value

    if (!token) {
      return null
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as {
      userId: string
      email: string
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true, name: true }
    })

    return user
  } catch (error) {
    console.error('Error verifying token:', error)
    return null
  }
}

export function requireAuth() {
  return async (request: NextRequest) => {
    const user = await getUser(request)
    if (!user) {
      return Response.json({ error: 'No autorizado' }, { status: 401 })
    }
    return user
  }
}