import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'
import { createOrder } from '../../services/orderService'
import { showToast } from '../../components/ui/Toast'
import { isValidEmail } from '../../utils/validators'
import { formatPrice } from '../../utils/formatters'
import { calcVAT, calcShipping, calcTotal } from '../../utils/orderHelpers'
import { ContactForm } from '../../components/checkout/ContactForm'
import { DeliveryForm } from '../../components/checkout/DeliveryForm'
import { OrderSummaryPanel } from '../../components/checkout/OrderSummaryPanel'
import Button from '../../components/ui/Button'
import Spinner from '../../components/ui/Spinner'

const INITIAL_FORM = {
  name: '', phone: '', email: '',
  address: '', city: 'Accra', region: 'Greater Accra', notes: '',
}

const ADMIN_WHATSAPP = '233269191308'

// ── WhatsApp SVG icon ────────────────────────────────────────────
const WhatsAppIcon = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" className={`${className} flex-shrink-0 fill-current`} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.862L.057 23.571a.75.75 0 00.918.919l5.733-1.474A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.693-.5-5.24-1.375l-.372-.214-3.853.99.998-3.827-.229-.38A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
  </svg>
)

// ── Reusable WhatsApp submit button ─────────────────────────────
const WhatsAppButton = ({ loading, fullWidth = true }) => (
  <button
    type="submit"
    disabled={loading}
    className={[
      'h-14 px-8 inline-flex items-center justify-center gap-3',
      'font-sans font-medium tracking-widest uppercase text-xs whitespace-nowrap',
      'bg-primary hover:bg-primary-light active:scale-[0.98] text-black rounded-sm',
      'shimmer-btn shadow-gold-glow hover:shadow-gold-glow-lg',
      'transition-all duration-200',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      fullWidth ? 'w-full' : '',
    ].filter(Boolean).join(' ')}
  >
    {loading ? (
      <>
        <Spinner size="sm" color="dark" />
        <span>Placing Order…</span>
      </>
    ) : (
      <>
        <WhatsAppIcon />
        Place Order & Pay via WhatsApp
      </>
    )}
  </button>
)

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart()
  const navigate = useNavigate()

  const [form,    setForm]    = useState(INITIAL_FORM)
  const [errors,  setErrors]  = useState({})
  const [loading, setLoading] = useState(false)

  // ── Empty cart ───────────────────────────────────────────────
  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <span className="material-icons-outlined text-5xl text-gray-300 dark:text-gray-700 mb-4 block">
          shopping_bag
        </span>
        <h2 className="font-serif text-2xl text-gray-900 dark:text-white mb-2">
          Your cart is empty
        </h2>
        <p className="text-gray-400 font-sans text-sm mb-8">
          Add some products before checking out
        </p>
        <Link to="/products">
          <Button leftIcon="arrow_back">Browse Products</Button>
        </Link>
      </div>
    )
  }

  // ── Field change ─────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  // ── Validation ───────────────────────────────────────────────
  const validate = () => {
    const errs = {}
    if (!form.name.trim())    errs.name    = 'Full name is required'
    if (!form.phone)          errs.phone   = 'Phone number is required'
    if (!form.address.trim()) errs.address = 'Delivery address is required'
    if (!form.city)           errs.city    = 'City is required'
    if (!form.region)         errs.region  = 'Region is required'
    if (form.email && !isValidEmail(form.email))
      errs.email = 'Invalid email address'
    return errs
  }

  // ── Format phone ─────────────────────────────────────────────
  const formatPhone = (phone) => {
    let p = phone.trim().replace(/\s/g, '')
    if (p.startsWith('0')) return '+233' + p.slice(1)
    if (!p.startsWith('+')) return '+233' + p
    return p
  }

  // ── Build WhatsApp URL — takes snapshot params, not component state
  const buildWhatsAppUrl = (orderId, phone, formSnap, itemsSnap, sub) => {
    const vat      = calcVAT(sub)
    const shipping = calcShipping(sub)

    const itemLines = itemsSnap.map(item =>
      `• ${item.title}${item.variant ? ` (${item.variant})` : ''} x${item.quantity} — ${formatPrice(item.price * item.quantity)}`
    ).join('\n')

    const message =
`Hello Golden Morsel! 🌟

I just placed an order and would like to complete payment.

*Order Reference*
${orderId}

*My Details*
Name: ${formSnap.name.trim()}
Phone: ${phone}
Delivery: ${formSnap.address.trim()}, ${formSnap.city}, ${formSnap.region}${formSnap.notes ? `\nNotes: ${formSnap.notes}` : ''}

*Items Ordered*
${itemLines}

*Order Summary*
───────────────
Subtotal:  ${formatPrice(sub)}
VAT (6%):  ${formatPrice(vat)}
Delivery:  ${shipping === 0 ? 'FREE 🎁' : formatPrice(shipping)}
*Total:    ${formatPrice(calcTotal(sub))}*
───────────────

Please send me payment details. Thank you! 🙏`

    return `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(message)}`
  }

  // ── Submit ───────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      showToast.error('Please fill in all required fields')
      return
    }

    setLoading(true)

    const phone    = formatPhone(form.phone)
    const vat      = calcVAT(subtotal)
    const shipping = calcShipping(subtotal)
    const total    = calcTotal(subtotal)

    const orderPayload = {
      guestInfo: {
        name:    form.name.trim(),
        phone,
        email:   form.email || undefined,
        address: form.address.trim(),
        city:    form.city,
        region:  form.region,
      },
      items: items.map(item => ({
        productId: item.productId,
        title:     item.title,
        variant:   item.variant || undefined,
        quantity:  item.quantity,
        price:     item.price,
        subtotal:  item.price * item.quantity,
      })),
      subtotal,
      vat,
      shipping,
      total,
      notes: form.notes || undefined,
    }

    try {
      const orderRes = await createOrder(orderPayload)
      const order    = orderRes.data.data

      // ── Capture everything BEFORE clearCart causes re-render ──
      const capturedOrderId  = order.orderId || `ORD-${order._id?.slice(-8).toUpperCase()}`
      const capturedForm     = { ...form }
      const capturedItems    = [...items]
      const capturedSubtotal = subtotal
      const capturedPhone    = phone

      const waUrl = buildWhatsAppUrl(
        capturedOrderId,
        capturedPhone,
        capturedForm,
        capturedItems,
        capturedSubtotal
      )

      clearCart()
      showToast.success('Order placed! Opening WhatsApp...')

      setTimeout(() => {
        window.open(waUrl, '_blank')
        navigate(`/order-confirmed/${capturedOrderId}`)
      }, 800)

    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to place order. Please try again.'
      showToast.error(msg)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* ── Page header ─────────────────────────────────────────── */}
      <div className="mb-8">
        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-sans mb-1">
          Almost there
        </p>
        <h1 className="font-serif text-3xl text-gray-900 dark:text-white">
          Check<span className="italic text-primary">out</span>
        </h1>
      </div>

      <form onSubmit={handleSubmit} data-checkout-form>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* ── Left: Forms (3/5) ──────────────────────────────── */}
          <div className="lg:col-span-3 space-y-8">
            <ContactForm values={form} errors={errors} onChange={handleChange} />
            <DeliveryForm values={form} errors={errors} onChange={handleChange} />

            {/* How payment works */}
            <div className="flex items-start gap-3 p-4 rounded-sm bg-primary/5 border border-primary/15">
              <WhatsAppIcon className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="text-xs font-sans font-medium text-primary uppercase tracking-widest mb-1">
                  How Payment Works
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-sans leading-relaxed">
                  After placing your order, WhatsApp will open with your full order details
                  already typed out. Simply press the{' '}
                  <span className="inline-flex items-center gap-1 text-gray-900 dark:text-white font-medium">
                    <span className="material-icons-outlined text-sm">send</span>
                    Send
                  </span>{' '}
                  button and we'll reply with payment instructions right away.
                </p>
              </div>
            </div>

            {/* Mobile submit */}
            <div className="lg:hidden">
              <WhatsAppButton loading={loading} />
            </div>
          </div>

          {/* ── Right: Order summary (2/5) ─────────────────────── */}
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-24 space-y-5">
              <OrderSummaryPanel items={items} subtotal={subtotal} />

              {/* Desktop submit */}
              <div className="hidden lg:block">
                <WhatsAppButton loading={loading} />
                <p className="text-center text-[10px] text-gray-400 font-sans mt-3 uppercase tracking-widest">
                  WhatsApp opens with your order details ready to send
                </p>
              </div>
            </div>
          </div>

        </div>
      </form>
    </div>
  )
}