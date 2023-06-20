export interface AuthenticatedUser {
  email: string
  id: string
  role: string
  iat: number
  exp: number
}
