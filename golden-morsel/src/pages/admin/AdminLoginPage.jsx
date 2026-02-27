import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdminAuth } from '../../hooks/useAdminAuth'
import { showToast } from '../../components/ui/Toast'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import gmLogoGold from '../../assets/logos/gm-logo-gold.png'

export default function AdminLoginPage() {
  const { login } = useAdminAuth()
  const navigate  = useNavigate()

  const [form,    setForm]    = useState({ email: '', password: '' })
  const [errors,  setErrors]  = useState({})
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const errs = {}
    if (!form.email)    errs.email    = 'Email is required'
    if (!form.password) errs.password = 'Password is required'
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    try {
      await login(form.email, form.password)
      showToast.success('Welcome back!')
      navigate('/admin/dashboard')
    } catch (err) {
      const msg = err.response?.data?.message || 'Invalid credentials'
      showToast.error(msg)
      setErrors({ general: msg })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background-dark flex items-center justify-center px-4">

      {/* Background gold glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-sm">

        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <img src={gmLogoGold} alt="Golden Morsel" className="h-10 object-contain mb-6" />
          <h1 className="font-serif text-2xl text-white text-center">
            Admin <span className="italic text-primary">Portal</span>
          </h1>
          <p className="text-[10px] uppercase tracking-widest text-gray-500 font-sans mt-2">
            Golden Morsel Management
          </p>
        </div>

        {/* Card */}
        <div className="bg-surface-dark-2 border border-border-dark rounded-sm p-8 shadow-2xl shadow-black/40">

          {errors.general && (
            <div className="flex items-center gap-2 p-3 mb-6 rounded-sm bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-sans">
              <span className="material-icons-outlined text-base">error_outline</span>
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Email Address"
              name="email"
              type="email"
              placeholder="admin@goldenmorsel.com"
              value={form.email}
              onChange={handleChange}
              error={errors.email}
              leftIcon="mail_outline"
              autoComplete="email"
            />
            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              error={errors.password}
              leftIcon="lock_outline"
              autoComplete="current-password"
            />
            <div className="pt-2">
              <Button type="submit" fullWidth size="lg" loading={loading}>
                Sign In to Admin
              </Button>
            </div>
          </form>
        </div>

        {/* Back to store */}
        <p className="text-center mt-6 text-xs text-gray-600 font-sans">
          <a href="/" className="hover:text-primary transition-colors uppercase tracking-widest">
            ← Back to Storefront
          </a>
        </p>

        {/* Gold accent */}
        <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>
    </div>
  )
}