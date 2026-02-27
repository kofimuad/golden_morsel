import { useState, useEffect, useRef } from 'react'

const CATEGORIES = [
  { value: '',           label: 'All'        },
  { value: 'treaties',   label: 'Treaties'   },
  { value: 'memoria',    label: 'Memoria'    },
  { value: 'convention', label: 'Convention' },
]

/**
 * ProductFilters
 *
 * Props:
 *   category   - current category value
 *   search     - current search string
 *   onChange   - fn({ category, search }) called on any filter change
 */
export default function ProductFilters({ category = '', search = '', onChange }) {
  const [localSearch, setLocalSearch] = useState(search)
  const debounceRef = useRef(null)

  // Debounce search input so we don't fire on every keystroke
  useEffect(() => {
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      onChange?.({ category, search: localSearch })
    }, 400)
    return () => clearTimeout(debounceRef.current)
  }, [localSearch])

  const handleCategory = (val) => {
    onChange?.({ category: val, search: localSearch })
  }

  const handleClear = () => {
    setLocalSearch('')
    onChange?.({ category, search: '' })
  }

  return (
    <div className="flex flex-col gap-4 mb-8">

      {/* ── Search bar ──────────────────────────────────────────── */}
      <div className="relative">
        <span className="material-icons-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl pointer-events-none">
          search
        </span>
        <input
          type="text"
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          placeholder="Search products..."
          className={[
            'w-full bg-gray-100 dark:bg-surface-dark-3',
            'border border-gray-200 dark:border-border-dark rounded-sm',
            'pl-11 pr-10 py-3 text-sm font-sans text-gray-900 dark:text-white',
            'placeholder-gray-400 dark:placeholder-gray-600',
            'focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary',
            'transition-all duration-200',
          ].join(' ')}
        />
        {/* Clear button */}
        {localSearch && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
            aria-label="Clear search"
          >
            <span className="material-icons-outlined text-lg">close</span>
          </button>
        )}
      </div>

      {/* ── Category tabs ────────────────────────────────────────── */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {CATEGORIES.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => handleCategory(value)}
            className={[
              'flex-shrink-0 px-5 py-2 rounded-sm text-[10px] font-sans font-medium uppercase tracking-widest transition-all duration-200',
              category === value
                ? 'bg-primary text-black shadow-gold-glow'
                : 'bg-gray-100 dark:bg-surface-dark-3 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-border-dark hover:border-primary/40 hover:text-primary',
            ].join(' ')}
          >
            {label}
          </button>
        ))}
      </div>

    </div>
  )
}