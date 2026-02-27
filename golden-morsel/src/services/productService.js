import api from './api'

export const getProducts          = (params)   => api.get('/products', { params })
export const getProductById       = (id)        => api.get(`/products/${id}`)
export const getProductsByCategory= (category) => api.get(`/products/category/${category}`)
