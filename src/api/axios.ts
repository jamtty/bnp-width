import axios from 'axios'
import { useAuthStore, isTokenExpired } from '@/store/useAuthStore'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 요청 인터셉터 - 인증 토큰 자동 첨부 + FormData Content-Type 처리
apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken
    if (token) {
      // 만료된 토큰이면 요청 전에 바로 로그아웃 처리
      if (isTokenExpired(token)) {
        useAuthStore.getState().clearAuth()
        window.location.href = import.meta.env.BASE_URL + 'admin/login'
        return Promise.reject(new Error('세션이 만료됐습니다. 다시 로그인해주세요.'))
      }
      config.headers.Authorization = `Bearer ${token}`
    }
    // FormData 전송 시 Content-Type 헤더를 제거해야
    // 브라우저가 자동으로 multipart/form-data; boundary=... 를 설정함
    // (기본값 application/json 이 남아있으면 PHP의 $_FILES, $_POST 가 비어있게 됨)
    if (config.data instanceof FormData) {
      config.headers.delete('Content-Type')
    }
    return config
  },
  (error) => Promise.reject(error),
)

// 응답 인터셉터 - 공통 에러 처리
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const url = error.config?.url ?? ''
      if (!url.includes('/auth/login')) {
        useAuthStore.getState().clearAuth()
        window.location.href = import.meta.env.BASE_URL + 'admin/login'
      }
    }

    // 서버가 JSON body에 담아 준 message를 그대로 사용
    // (없으면 axios 기본 메시지 'Request failed with status code NNN' 유지)
    const serverMessage = error.response?.data?.message
    if (serverMessage) {
      error.message = serverMessage
    }

    return Promise.reject(error)
  },
)

export default apiClient
