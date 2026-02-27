import { formatPrice } from '../../utils/formatters'

/**
 * StatsCard
 * Props:
 *   title    - string
 *   value    - string | number
 *   icon     - material icon name
 *   trend    - number (% change, positive or negative)
 *   prefix   - 'currency' | null
 *   color    - 'gold' | 'green' | 'blue' | 'purple' (default gold)
 */

const COLOR_MAP = {
  gold:   { bg: 'bg-primary/10',   icon: 'text-primary',   border: 'border-primary/20'   },
  green:  { bg: 'bg-green-500/10', icon: 'text-green-400', border: 'border-green-500/20' },
  blue:   { bg: 'bg-blue-500/10',  icon: 'text-blue-400',  border: 'border-blue-500/20'  },
  purple: { bg: 'bg-purple-500/10',icon: 'text-purple-400',border: 'border-purple-500/20'},
}

export function StatsCard({ title, value, icon, trend, prefix, color = 'gold' }) {
  const c = COLOR_MAP[color] ?? COLOR_MAP.gold
  const displayValue = prefix === 'currency' ? formatPrice(value) : value

  return (
    <div className="bg-surface-dark-2 border border-border-dark rounded-sm p-5 hover:border-primary/20 transition-colors">
      <div className="flex items-start justify-between mb-4">
        {/* Icon */}
        <div className={`w-10 h-10 rounded-sm ${c.bg} border ${c.border} flex items-center justify-center`}>
          <span className={`material-icons-outlined text-xl ${c.icon}`}>{icon}</span>
        </div>

        {/* Trend badge */}
        {trend !== undefined && trend !== null && (
          <div className={[
            'flex items-center gap-0.5 text-[10px] font-sans font-medium px-2 py-0.5 rounded-full',
            trend >= 0
              ? 'text-green-400 bg-green-500/10'
              : 'text-red-400 bg-red-500/10',
          ].join(' ')}>
            <span className="material-icons-outlined text-xs">
              {trend >= 0 ? 'trending_up' : 'trending_down'}
            </span>
            {Math.abs(trend)}%
          </div>
        )}
      </div>

      {/* Value */}
      <p className="font-display text-2xl text-white font-semibold leading-none mb-1">
        {displayValue}
      </p>

      {/* Title */}
      <p className="text-[10px] uppercase tracking-widest text-gray-500 font-sans">{title}</p>
    </div>
  )
}