import { adminApi } from './api'

export const getStockLevels    = ()      => adminApi.get('/inventory/stock')
export const getInventoryLogs  = (params)=> adminApi.get('/inventory/logs', { params })
export const getLowStockAlerts = ()      => adminApi.get('/inventory/alerts')
export const restockProduct    = (data)  => adminApi.post('/inventory/restock', data)
export const adjustInventory   = (data)  => adminApi.post('/inventory/adjust', data)
