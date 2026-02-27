import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { showToast } from '../../components/ui/Toast'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import gmLogoGold from '../../assets/logos/gm-logo-gold.png'
import gmLogoBlack from '../../assets/logos/gm-logo-black.png'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Redirect back to where they came from, or /account
  const from = location.state?.from || '/account'

  const [form, setForm] = useState({ phone: '', password: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    // Clear error on change
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const errs = {}
    if (!form.phone) errs.phone = 'Phone number is required'
    if (!form.password) errs.password = 'Password is required'
    if (form.password && form.password.length < 6)
      errs.password = 'Password must be at least 6 characters'
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }

    setLoading(true)
    try {
      // Format phone — add +233 if not present
      let phone = form.phone.trim()
      if (phone.startsWith('0')) phone = '+233' + phone.slice(1)
      else if (!phone.startsWith('+')) phone = '+233' + phone

      await login(phone, form.password)
      showToast.success('Welcome back!')
      navigate(from, { replace: true })
    } catch (err) {
      const msg = err.response?.data?.message || 'Invalid phone or password'
      showToast.error(msg)
      setErrors({ general: msg })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-16 bg-background-light dark:bg-background-dark">
      <div className="w-full max-w-md">

        {/* ── Logo ──────────────────────────────────────────────── */}
        <div className="flex flex-col items-center mb-10">
          <img
            src={gmLogoBlack}
            alt="Golden Morsel"
            className="h-10 object-contain mb-6 dark:hidden"
          />
          <img
            src={gmLogoGold}
            alt="Golden Morsel"
            className="h-10 object-contain mb-6 hidden dark:block"
          />
          <h1 className="font-serif text-3xl text-gray-900 dark:text-white text-center">
            Welcome <span className="italic text-primary">Back</span>
          </h1>
          <p className="text-xs text-gray-400 font-sans uppercase tracking-widest mt-2">
            Sign in to your account
          </p>
        </div>

        {/* ── Form card ─────────────────────────────────────────── */}
        <div className="bg-white dark:bg-surface-dark-2 border border-gray-100 dark:border-border-dark rounded-sm shadow-sm p-8">

          {/* General error */}
          {errors.general && (
            <div className="flex items-center gap-2 p-3 mb-6 rounded-sm bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-sans">
              <span className="material-icons-outlined text-base">error_outline</span>
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Phone */}
            <Input
              label="Phone Number"
              name="phone"
              type="tel"
              prefix="+233"
              placeholder="XX XXX XXXX"
              value={form.phone}
              onChange={handleChange}
              error={errors.phone}
              autoComplete="tel"
            />

            {/* Password */}
            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              error={errors.password}
              autoComplete="current-password"
            />

            {/* Submit */}
            <div className="pt-2">
              <Button
                type="submit"
                fullWidth
                loading={loading}
                size="lg"
              >
                Sign In
              </Button>
            </div>
          </form>
        </div>

        {/* ── Footer links ──────────────────────────────────────── */}
        <p className="text-center text-xs text-gray-400 font-sans mt-6">
          Don't have an account?{' '}
          <Link
            to="/signup"
            className="text-primary hover:text-primary-light transition-colors font-medium"
          >
            Create one
          </Link>
        </p>

        {/* ── Gold divider ──────────────────────────────────────── */}
        <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>
    </div>
  )
}