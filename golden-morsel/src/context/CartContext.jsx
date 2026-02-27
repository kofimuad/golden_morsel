import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('gm_cart')) || [] }
    catch { return [] }
  })

  useEffect(() => {
    localStorage.setItem('gm_cart', JSON.stringify(items))
  }, [items])

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0)
  const subtotal  = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  const addItem = (product, variant = null, qty = 1) => {
    setItems(prev => {
      const key      = variant ? `${product._id}-${variant}` : product._id
      const existing = prev.find(i => i.key === key)
      if (existing) {
        return prev.map(i => i.key === key ? { ...i, quantity: i.quantity + qty } : i)
      }
      return [...prev, {
        key,
        productId: product._id,
        title:     product.title,
        price:     variant
          ? (product.variants?.find(v => v.name === variant)?.price ?? product.price)
          : product.price,
        quantity:  qty,
        variant,
        image:     product.image,
      }]
    })
  }

  const removeItem = (key) => setItems(prev => prev.filter(i => i.key !== key))

  const updateQty = (key, qty) => {
    if (qty <= 0) return removeItem(key)
    setItems(prev => prev.map(i => i.key === key ? { ...i, quantity: qty } : i))
  }

  const clearCart = () => setItems([])

  return (
    <CartContext.Provider value={{ items, itemCount, subtotal, addItem, removeItem, updateQty, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
