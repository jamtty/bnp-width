import apiClient from './axios'

/**
 * 에디터 이미지 업로드
 * POST /api/upload/image → { url }
 */
export const uploadEditorImage = async (file: File): Promise<string> => {
  const form = new FormData()
  form.append('image', file)
  const { data } = await apiClient.post('/api/upload/image', form, {
    timeout: 60000, // 이미지 업로드는 60초로 연장
  })
  if (!data.success) throw new Error(data.message ?? '이미지 업로드에 실패했습니다.')
  const url = data.data.url as string
  const base = (import.meta.env.VITE_UPLOAD_BASE_URL ?? '').replace(/\/$/, '')
  return base && url.startsWith('/') ? base + url : url
}
