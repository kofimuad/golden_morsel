import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { showToast } from '../../components/ui/Toast'
import { isValidEmail } from '../../utils/validators'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import gmLogoGold from '../../assets/logos/gm-logo-gold.png'
import gmLogoBlack from '../../assets/logos/gm-logo-black.png'

export default function SignupPage() {
  const { signup } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Full name is required'
    if (!form.phone) errs.phone = 'Phone number is required'
    if (!form.password) errs.password = 'Password is required'
    if (form.password && form.password.length < 6)
      errs.password = 'Password must be at least 6 characters'
    if (form.password !== form.confirmPassword)
      errs.confirmPassword = 'Passwords do not match'
    if (form.email && !isValidEmail(form.email))
      errs.email = 'Invalid email address'
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
      // Format phone
      let phone = form.phone.trim()
      if (phone.startsWith('0')) phone = '+233' + phone.slice(1)
      else if (!phone.startsWith('+')) phone = '+233' + phone

      await signup({
        name: form.name.trim(),
        phone,
        email: form.email || undefined,
        password: form.password,
      })

      showToast.success('Account created! Welcome to Golden Morsel.')
      navigate('/account')
    } catch (err) {
      const msg = err.response?.data?.message || 'Something went wrong. Please try again.'
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
            Create <span className="italic text-primary">Account</span>
          </h1>
          <p className="text-xs text-gray-400 font-sans uppercase tracking-widest mt-2">
            Join the Golden Morsel family
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

            {/* Name */}
            <Input
              label="Full Name"
              name="name"
              type="text"
              placeholder="Kwame Mensah"
              value={form.name}
              onChange={handleChange}
              error={errors.name}
              autoComplete="name"
            />

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
              hint="This will be used for order updates via WhatsApp"
              autoComplete="tel"
            />

            {/* Email (optional) */}
            <Input
              label="Email Address (Optional)"
              name="email"
              type="email"
              placeholder="kwame@example.com"
              value={form.email}
              onChange={handleChange}
              error={errors.email}
              autoComplete="email"
            />

            {/* Password */}
            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="Min. 6 characters"
              value={form.password}
              onChange={handleChange}
              error={errors.password}
              autoComplete="new-password"
            />

            {/* Confirm password */}
            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={form.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              autoComplete="new-password"
            />

            {/* Submit */}
            <div className="pt-2">
              <Button
                type="submit"
                fullWidth
                loading={loading}
                size="lg"
              >
                Create Account
              </Button>
            </div>
          </form>
        </div>

        {/* ── Footer links ──────────────────────────────────────── */}
        <p className="text-center text-xs text-gray-400 font-sans mt-6">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-primary hover:text-primary-light transition-colors font-medium"
          >
            Sign in
          </Link>
        </p>

        {/* ── Gold divider ──────────────────────────────────────── */}
        <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>
    </div>
  )
}