import { formatDate } from '../../utils/formatters'

const STEPS = [
  { key: 'pending',    label: 'Order Placed',       icon: 'receipt_long'    },
  { key: 'confirmed',  label: 'Payment Confirmed',  icon: 'verified'        },
  { key: 'processing', label: 'Being Prepared',     icon: 'inventory_2'     },
  { key: 'shipped',    label: 'Out for Delivery',   icon: 'local_shipping'  },
  { key: 'delivered',  label: 'Delivered',          icon: 'check_circle'    },
]

const STEP_ORDER = ['pending', 'confirmed', 'processing', 'shipped', 'delivered']

export function OrderTimeline({ status, updatedAt }) {
  const currentIndex = STEP_ORDER.indexOf(status)

  return (
    <div className="relative">
      {STEPS.map((step, i) => {
        const isDone    = i < currentIndex
        const isCurrent = i === currentIndex
        const isFuture  = i > currentIndex

        return (
          <div key={step.key} className="flex gap-4 relative">
            {/* Line connector */}
            {i < STEPS.length - 1 && (
              <div
                className={[
                  'absolute left-[19px] top-10 w-0.5 h-full -mb-2',
                  isDone || isCurrent ? 'bg-primary/40' : 'bg-gray-200 dark:bg-border-dark',
                ].join(' ')}
              />
            )}

            {/* Icon */}
            <div
              className={[
                'relative z-10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-all',
                isDone    ? 'bg-primary border-primary text-black'                          : '',
                isCurrent ? 'bg-primary/15 border-primary text-primary animate-pulse'       : '',
                isFuture  ? 'bg-gray-100 dark:bg-surface-dark-3 border-gray-200 dark:border-border-dark text-gray-300 dark:text-gray-600' : '',
              ].join(' ')}
            >
              <span className="material-icons-outlined text-lg">
                {isDone ? 'check' : step.icon}
              </span>
            </div>

            {/* Label */}
            <div className="pb-7">
              <p
                className={[
                  'text-sm font-sans font-medium',
                  isCurrent ? 'text-primary' : '',
                  isDone    ? 'text-gray-700 dark:text-gray-300' : '',
                  isFuture  ? 'text-gray-300 dark:text-gray-600' : '',
                ].join(' ')}
              >
                {step.label}
              </p>
              {isCurrent && updatedAt && (
                <p className="text-[10px] text-gray-400 font-sans mt-0.5">
                  {formatDate(updatedAt)}
                </p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}