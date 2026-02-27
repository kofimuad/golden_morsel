import { adminApi } from './api'

export const getDashboard    = ()              => adminApi.get('/admin/dashboard')
export const getAllOrders     = (params)        => adminApi.get('/admin/orders', { params })
export const confirmPayment  = (orderId, data) => adminApi.post(`/admin/orders/${orderId}/confirm-payment`, data)
export const getAnalytics    = ()              => adminApi.get('/admin/analytics')
