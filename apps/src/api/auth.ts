import axios from 'axios'
import apiClient from './axios'

interface LoginResponse {
  token: string
  user: {
    id: number
    name: string
    role: string
  }
}

/**
 * 관리자 로그인
 * POST /api/auth/login
 */
export const loginAdmin = async (loginId: string, password: string): Promise<LoginResponse> => {
  let data: Record<string, unknown>

  try {
    const res = await apiClient.post('/api/auth/login', { login_id: loginId, password })
    data = res.data
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        '서버에 연결할 수 없습니다.'
      throw new Error(msg)
    }
    throw err
  }

  if (!data?.success) {
    throw new Error((data?.message as string) || '로그인에 실패했습니다.')
  }

  return data.data as LoginResponse
}

/**
 * 비밀번호 변경
 * PATCH /api/auth/password
 */
export const changePassword = async (
  currentPassword: string,
  newPassword: string,
  newPasswordConfirm: string,
): Promise<void> => {
  try {
    const { data } = await apiClient.patch('/api/auth/password', {
      current_password: currentPassword,
      new_password: newPassword,
      new_password_confirm: newPasswordConfirm,
    })
    if (!data.success) throw new Error(data.message || '비밀번호 변경에 실패했습니다.')
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response?.data?.message) {
      throw new Error(err.response.data.message)
    }
    throw err
  }
}
