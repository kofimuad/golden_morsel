import api, { adminApi } from './api'

export const createOrder      = (data)           => api.post('/orders/create', data)
export const getOrderById     = (orderId)         => api.get(`/orders/${orderId}`)
export const trackByPhone     = (phone)           => api.get(`/orders/track/${phone}`)
export const updateOrderStatus= (orderId, data)   => adminApi.put(`/orders/${orderId}/status`, data)
export const getOrderByOrderId = (orderId) =>
  api.get(`/orders/ref/${orderId}`)