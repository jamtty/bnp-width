const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''
const UPLOAD_BASE_URL = (import.meta.env.VITE_UPLOAD_BASE_URL ?? API_BASE_URL).replace(/\/$/, '')

export function toAbsUrl(path: string): string {
  if (!path) return ''
  if (path.startsWith('http')) return path
  return `${UPLOAD_BASE_URL}/${path.replace(/^\//, '')}`
}

export function resolveContentUrls(html: string): string {
  if (!html) return ''
  return html.replace(/src="\/(?!\/)/g, `src="${UPLOAD_BASE_URL}/`)
}
