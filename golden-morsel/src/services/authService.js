import api, { adminApi } from './api'

export const signup        = (data) => api.post('/auth/signup', data)
export const login         = (data) => api.post('/auth/login', data)
export const getMe         = ()     => api.get('/auth/me')
export const adminLogin    = (data) => adminApi.post('/auth/admin-login', data)
export const getAdminMe    = ()     => adminApi.get('/auth/admin-me')
