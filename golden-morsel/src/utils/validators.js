export const isValidPhone = (phone) => /^\+?[0-9]{10,15}$/.test(phone)
export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
