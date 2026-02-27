export const formatPrice = (amount) =>
  `GH₵ ${parseFloat(amount).toFixed(2)}`

export const formatDate = (date) =>
  new Date(date).toLocaleDateString('en-GH', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

export const formatPhone = (phone) => {
  const cleaned = phone.replace(/\D/g, '')
  return cleaned.startsWith('0') ? '+233' + cleaned.substring(1) : '+' + cleaned
}
