import { useState } from 'react'
import { showToast } from '../ui/Toast'
import { isValidEmail } from '../../utils/validators'

export function NewsletterBanner() {
  const [email,    setEmail]    = useState('')
  const [loading,  setLoading]  = useState(false)
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isValidEmail(email)) {
      showToast.error('Please enter a valid email address')
      return
    }
    setLoading(true)
    // TODO: Wire to newsletter endpoint when available
    await new Promise(r => setTimeout(r, 800))
    setSubscribed(true)
    showToast.success('You\'re on the list! 🎉')
    setLoading(false)
  }

  return (
    <section className="py-20 bg-background-light dark:bg-surface-dark">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">

        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-sans mb-2">
          Stay in the loop
        </p>
        <h2 className="font-serif text-3xl text-gray-900 dark:text-white mb-3">
          Get <span className="italic text-primary">Golden</span> Updates
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-sans mb-8">
          New arrivals, seasonal collections, and exclusive offers — delivered to your inbox.
        </p>

        {subscribed ? (
          <div className="flex items-center justify-center gap-3 p-4 rounded-sm bg-primary/10 border border-primary/25">
            <span className="material-icons-outlined text-primary text-2xl">check_circle</span>
            <p className="text-sm text-primary font-sans font-medium">
              You're subscribed! Welcome to the Golden Morsel family.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="flex-1 bg-gray-100 dark:bg-surface-dark-3 border border-gray-200 dark:border-border-dark rounded-sm px-4 py-3 text-sm font-sans text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary transition-all"
            />
            <button
              type="submit"
              disabled={loading}
              className="shimmer-btn flex-shrink-0 bg-primary hover:bg-primary-light disabled:opacity-50 text-black text-xs uppercase tracking-widest font-sans font-medium px-6 py-3 rounded-sm transition-colors"
            >
              {loading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        )}

        <p className="text-[10px] text-gray-400 font-sans mt-4 uppercase tracking-widest">
          No spam, ever. Unsubscribe anytime.
        </p>
      </div>
    </section>
  )
}

export default NewsletterBanner