const VAT_RATE           = 0.06
const FREE_SHIPPING_ABOVE = 200
const SHIPPING_COST      = 30

export const calcSubtotal = (items) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0)

export const calcVAT      = (subtotal) =>
  parseFloat((subtotal * VAT_RATE).toFixed(2))

export const calcShipping = (subtotal) =>
  subtotal >= FREE_SHIPPING_ABOVE ? 0 : SHIPPING_COST

export const calcTotal    = (subtotal) =>
  parseFloat((subtotal + calcVAT(subtotal) + calcShipping(subtotal)).toFixed(2))
