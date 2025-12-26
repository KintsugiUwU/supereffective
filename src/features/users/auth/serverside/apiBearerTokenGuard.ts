import { NextApiRequest } from 'next'

import { ApiResponse, apiErrors } from '@/lib/utils/types'

/**
 * Validates bearer token authentication for admin API endpoints
 * @param req - Next.js API request object
 * @returns ApiResponse with allowed flag
 */
export function apiBearerTokenGuard(req: NextApiRequest): ApiResponse & { allowed: boolean } {
  const apiToken = process.env.ADMIN_API_TOKEN

  // Check if ADMIN_API_TOKEN is configured
  if (!apiToken) {
    console.error('ADMIN_API_TOKEN environment variable is not configured')
    return { ...apiErrors.internalServerError, allowed: false }
  }

  // Extract Authorization header
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return { ...apiErrors.notAuthenticated, allowed: false }
  }

  // Check if it's a Bearer token
  const parts = authHeader.split(' ')
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return { ...apiErrors.notAuthenticated, allowed: false }
  }

  const token = parts[1]

  // Validate token
  if (token !== apiToken) {
    return { ...apiErrors.notAuthenticated, allowed: false }
  }

  return {
    statusCode: 200,
    data: { message: 'Authenticated' },
    allowed: true,
  }
}
