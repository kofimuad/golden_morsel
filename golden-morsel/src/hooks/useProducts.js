import { useState, useEffect } from 'react'
import { getProducts } from '../services/productService'

export function useProducts(params = {}) {
  const [products, setProducts] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState(null)

  useEffect(() => {
    setLoading(true)
    getProducts(params)
      .then(res => setProducts(res.data.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [JSON.stringify(params)])

  return { products, loading, error }
}
