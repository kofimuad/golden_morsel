import api from './api'

export const sendCheckout = (data) => api.post('/whatsapp/send-checkout', data)
