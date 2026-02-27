export function WhatsAppPaymentNote() {
  return (
    <div className="rounded-sm bg-primary/5 border border-primary/20 p-4 flex items-start gap-3">
      <span className="material-icons-outlined text-primary text-xl flex-shrink-0 mt-0.5">
        info
      </span>
      <div className="space-y-1">
        <p className="text-xs font-sans font-medium text-primary uppercase tracking-widest">
          WhatsApp Payment
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 font-sans leading-relaxed">
          After placing your order, we'll send full payment instructions directly to
          your WhatsApp number. Your order will be confirmed once payment is verified
          by our team.
        </p>
      </div>
    </div>
  )
}