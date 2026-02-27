import { createContext, useContext, useState, useEffect } from 'react'
import { login as loginService, signup as signupService, getMe } from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null)
  const [token,   setToken]   = useState(() => localStorage.getItem('gm_token'))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (token) {
      getMe()
        .then(res => setUser(res.data.data))
        .catch(() => logout())
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [token])

  const login = async (phone, password) => {
    const res = await loginService({ phone, password })
    const { user, token } = res.data.data
    localStorage.setItem('gm_token', token)
    setToken(token)
    setUser(user)
    return user
  }

  const signup = async (data) => {
    const res = await signupService(data)
    const { user, token } = res.data.data
    localStorage.setItem('gm_token', token)
    setToken(token)
    setUser(user)
    return user
  }

  const logout = () => {
    localStorage.removeItem('gm_token')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, isAuthenticated: !!token, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
