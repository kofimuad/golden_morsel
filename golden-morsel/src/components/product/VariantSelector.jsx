/**
 * VariantSelector
 *
 * Props:
 *   variants   - [{ name, price }]
 *   selected   - currently selected variant name
 *   onChange   - fn(variantName)
 */
import { formatPrice } from '../../utils/formatters'

export default function VariantSelector({ variants = [], selected, onChange }) {
  if (!variants.length) return null

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-400 font-sans">
          Select Option
        </p>
        {selected && (
          <p className="text-xs text-primary font-sans">
            {variants.find(v => v.name === selected)?.price
              ? formatPrice(variants.find(v => v.name === selected).price)
              : ''}
          </p>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {variants.map((variant) => (
          <button
            key={variant.name}
            onClick={() => onChange(variant.name)}
            className={[
              'px-4 py-2 rounded-sm text-xs font-sans font-medium uppercase tracking-widest transition-all duration-200',
              selected === variant.name
                ? 'bg-primary text-black shadow-gold-glow border border-primary'
                : 'bg-transparent border border-gray-200 dark:border-border-dark text-gray-600 dark:text-gray-400 hover:border-primary/50 hover:text-primary',
            ].join(' ')}
          >
            {variant.name}
          </button>
        ))}
      </div>
    </div>
  )
}