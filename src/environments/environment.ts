import { AuthMode } from '../app/auth/auth.enum'

export const environment = {
  production: false,
  baseUrl: 'http://localhost:3000',
  authMode: AuthMode.CustomServer,
}
