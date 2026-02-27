import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({ baseURL: BASE_URL })

api.interceptors.request.use(config => {
  const token = localStorage.getItem('gm_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export const adminApi = axios.create({ baseURL: BASE_URL })

adminApi.interceptors.request.use(config => {
  const token = localStorage.getItem('gm_admin_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default api
