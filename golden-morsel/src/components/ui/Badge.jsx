/**
 * Badge — colored pill for order status, stock levels, labels etc.
 *
 * Variants (auto-mapped from value or set manually):
 *   order status  → pending | confirmed | paid | processing | shipped | delivered | cancelled
 *   stock status  → ok | low | out
 *   manual        → gold | gray | green | red | blue | amber | teal | purple
 *
 * Usage:
 *   <Badge status="paid" />
 *   <Badge status="low" />
 *   <Badge variant="gold" label="Featured" />
 */

const STATUS_MAP = {
  // Order statuses
  pending:     { variant: 'amber',  label: 'Pending'     },
  confirmed:   { variant: 'blue',   label: 'Confirmed'   },
  paid:        { variant: 'green',  label: 'Paid'        },
  processing:  { variant: 'purple', label: 'Processing'  },
  shipped:     { variant: 'teal',   label: 'Shipped'     },
  delivered:   { variant: 'green',  label: 'Delivered'   },
  cancelled:   { variant: 'red',    label: 'Cancelled'   },
  // Stock statuses
  ok:          { variant: 'green',  label: 'In Stock'    },
  low:         { variant: 'amber',  label: 'Low Stock'   },
  out:         { variant: 'red',    label: 'Out of Stock'},
  // Payment statuses
  unpaid:      { variant: 'red',    label: 'Unpaid'      },
}

const VARIANT_STYLES = {
  gold:   'bg-primary/15   text-primary        border border-primary/30',
  gray:   'bg-gray-500/10  text-gray-400       border border-gray-500/20',
  green:  'bg-green-500/10 text-green-400      border border-green-500/20',
  red:    'bg-red-500/10   text-red-400        border border-red-500/20',
  blue:   'bg-blue-500/10  text-blue-400       border border-blue-500/20',
  amber:  'bg-amber-500/10 text-amber-400      border border-amber-500/20',
  teal:   'bg-teal-500/10  text-teal-400       border border-teal-500/20',
  purple: 'bg-purple-500/10 text-purple-400    border border-purple-500/20',
}

export default function Badge({ status, variant, label, dot = true, className = '' }) {
  // Resolve from status string if provided
  const resolved = status ? STATUS_MAP[status] : null
  const finalVariant = variant || resolved?.variant || 'gray'
  const finalLabel   = label   || resolved?.label   || status || ''

  return (
    <span
      className={[
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider font-sans whitespace-nowrap',
        VARIANT_STYLES[finalVariant] ?? VARIANT_STYLES.gray,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {dot && (
        <span
          className={[
            'w-1.5 h-1.5 rounded-full flex-shrink-0',
            finalVariant === 'gold'   && 'bg-primary',
            finalVariant === 'gray'   && 'bg-gray-400',
            finalVariant === 'green'  && 'bg-green-400',
            finalVariant === 'red'    && 'bg-red-400',
            finalVariant === 'blue'   && 'bg-blue-400',
            finalVariant === 'amber'  && 'bg-amber-400',
            finalVariant === 'teal'   && 'bg-teal-400',
            finalVariant === 'purple' && 'bg-purple-400',
          ]
            .filter(Boolean)
            .join(' ')}
        />
      )}
      {finalLabel}
    </span>
  )
}