import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children, type = 'user' }) {
  const token = type === 'admin'
    ? localStorage.getItem('gm_admin_token')
    : localStorage.getItem('gm_token')

  if (!token) {
    return <Navigate to={type === 'admin' ? '/admin/login' : '/login'} replace />
  }
  return children
}
