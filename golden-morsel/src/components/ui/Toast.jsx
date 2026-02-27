import toast, { Toaster } from 'react-hot-toast'

/**
 * Toast — wrapper around react-hot-toast with Golden Morsel styling
 *
 * Usage (call anywhere, no import of this file needed):
 *   import { showToast } from '../components/ui/Toast'
 *   showToast.success('Order placed!')
 *   showToast.error('Something went wrong')
 *   showToast.loading('Processing...')
 *   showToast.info('Payment instructions sent to WhatsApp')
 *   showToast.dismiss()
 *
 * The <ToastProvider /> component is already mounted in App.jsx via react-hot-toast's
 * <Toaster /> — this file just re-exports styled helpers + a custom info variant.
 */

// ── Styled toast helpers ─────────────────────────────────────────────────────

const baseStyle = {
  fontFamily: 'Lato, sans-serif',
  fontSize: '13px',
  borderRadius: '2px',
  padding: '12px 16px',
  maxWidth: '360px',
}

const darkStyle = {
  ...baseStyle,
  background: '#1A1A1A',
  color: '#F5F0E8',
  border: '1px solid rgba(201, 168, 76, 0.25)',
}

const successStyle = {
  ...darkStyle,
  border: '1px solid rgba(74, 222, 128, 0.25)',
}

const errorStyle = {
  ...darkStyle,
  border: '1px solid rgba(248, 113, 113, 0.25)',
}

const infoStyle = {
  ...darkStyle,
  border: '1px solid rgba(201, 168, 76, 0.35)',
}

export const showToast = {
  success: (message, options = {}) =>
    toast.success(message, {
      style: successStyle,
      iconTheme: { primary: '#4ade80', secondary: '#1A1A1A' },
      duration: 3500,
      ...options,
    }),

  error: (message, options = {}) =>
    toast.error(message, {
      style: errorStyle,
      iconTheme: { primary: '#f87171', secondary: '#1A1A1A' },
      duration: 4500,
      ...options,
    }),

  loading: (message, options = {}) =>
    toast.loading(message, {
      style: darkStyle,
      ...options,
    }),

  info: (message, options = {}) =>
    toast(message, {
      style: infoStyle,
      icon: '✦',
      duration: 3500,
      ...options,
    }),

  promise: (promise, messages = {}, options = {}) =>
    toast.promise(
      promise,
      {
        loading: messages.loading || 'Loading...',
        success: messages.success || 'Done!',
        error:   messages.error   || 'Something went wrong',
      },
      {
        style: darkStyle,
        success: { style: successStyle },
        error:   { style: errorStyle },
        ...options,
      }
    ),

  dismiss: (id) => toast.dismiss(id),
}

// ── ToastProvider ────────────────────────────────────────────────────────────
// Drop this in App.jsx if you want to use the styled Toaster from here.
// Already handled by react-hot-toast's <Toaster /> in App.jsx — this is optional.

export function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      gutter={8}
      toastOptions={{
        style: darkStyle,
        success: { style: successStyle, iconTheme: { primary: '#4ade80', secondary: '#1A1A1A' } },
        error:   { style: errorStyle,   iconTheme: { primary: '#f87171', secondary: '#1A1A1A' } },
      }}
    />
  )
}

export default showToast