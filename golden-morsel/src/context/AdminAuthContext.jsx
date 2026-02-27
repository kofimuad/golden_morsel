import { createContext, useContext, useState, useEffect } from 'react'
import { adminLogin as adminLoginService, getAdminMe } from '../services/authService'

const AdminAuthContext = createContext(null)

export function AdminAuthProvider({ children }) {
  const [admin,   setAdmin]   = useState(null)
  const [token,   setToken]   = useState(() => localStorage.getItem('gm_admin_token'))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (token) {
      getAdminMe()
        .then(res => setAdmin(res.data.data))
        .catch(() => logout())
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [token])

  const login = async (email, password) => {
    const res = await adminLoginService({ email, password })
    const { admin, token } = res.data.data
    localStorage.setItem('gm_admin_token', token)
    setToken(token)
    setAdmin(admin)
    return admin
  }

  const logout = () => {
    localStorage.removeItem('gm_admin_token')
    setToken(null)
    setAdmin(null)
  }

  return (
    <AdminAuthContext.Provider value={{ admin, token, loading, isAuthenticated: !!token, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export const useAdminAuth = () => useContext(AdminAuthContext)
