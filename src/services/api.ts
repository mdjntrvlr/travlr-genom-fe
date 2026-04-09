const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

type RequestOptions = RequestInit & {
  query?: Record<string, string | number | boolean | undefined | null>
}

const buildUrl = (path: string, query?: RequestOptions['query']) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  const url = new URL(`${API_BASE_URL}${normalizedPath}`, window.location.origin)

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, String(value))
      }
    })
  }

  return `${url.pathname}${url.search}`
}

export const apiRequest = async <T>(path: string, options: RequestOptions = {}): Promise<T> => {
  const { query, headers, ...restOptions } = options

  const response = await fetch(buildUrl(path, query), {
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    ...restOptions,
  })

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`)
  }

  return response.json() as Promise<T>
}

export const api = {
  get: <T>(path: string, options?: Omit<RequestOptions, 'method'>) =>
    apiRequest<T>(path, { ...options, method: 'GET' }),
}