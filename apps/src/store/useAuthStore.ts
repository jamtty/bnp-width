import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: number
  email: string
  name: string
  role: string
  createdAt: string
}

interface AuthState {
  isAuthenticated: boolean
  accessToken: string | null
  user: User | null
  setAuth: (user: User, token: string) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      accessToken: null,
      user: null,
      setAuth: (user, token) => set({ isAuthenticated: true, accessToken: token, user }),
      clearAuth: () => set({ isAuthenticated: false, accessToken: null, user: null }),
    }),
    { name: 'admin-auth' },
  ),
)

export const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload.exp * 1000 < Date.now()
  } catch {
    return true
  }
}
