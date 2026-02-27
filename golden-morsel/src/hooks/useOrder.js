import { useState, useEffect } from 'react'
import { getOrderById, trackByPhone } from '../services/orderService'

export function useOrderById(orderId) {
  const [order,   setOrder]   = useState(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  useEffect(() => {
    if (!orderId) return
    getOrderById(orderId)
      .then(res => setOrder(res.data.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [orderId])

  return { order, loading, error }
}

export function useTrackOrders(phone) {
  const [orders,  setOrders]  = useState([])
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState(null)

  const track = async (phoneNumber) => {
    setLoading(true)
    setError(null)
    try {
      const res = await trackByPhone(phoneNumber)
      setOrders(res.data.data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { orders, loading, error, track }
}
