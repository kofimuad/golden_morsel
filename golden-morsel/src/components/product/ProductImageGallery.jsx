import { useState } from 'react'

/**
 * ProductImageGallery
 * For now products have a single image field.
 * Built to support multiple images in future — just pass images array.
 *
 * Props:
 *   image  - string (single image URL)
 *   images - string[] (optional array for future multi-image support)
 *   title  - string (alt text)
 */
export default function ProductImageGallery({ image, images = [], title = '' }) {
  const allImages = images.length ? images : image ? [image] : []
  const [active, setActive] = useState(0)

  if (!allImages.length) {
    return (
      <div className="aspect-square w-full rounded-sm bg-gray-100 dark:bg-surface-dark-3 flex items-center justify-center">
        <span className="material-icons-outlined text-5xl text-gray-300 dark:text-gray-700">
          image_not_supported
        </span>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {/* ── Main image ──────────────────────────────────────────── */}
      <div className="relative aspect-square w-full overflow-hidden rounded-sm bg-gray-100 dark:bg-surface-dark-3 group">
        <img
          src={allImages[active]}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Navigation arrows — only show if multiple images */}
        {allImages.length > 1 && (
          <>
            <button
              onClick={() => setActive((a) => (a - 1 + allImages.length) % allImages.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center hover:bg-primary/80 transition-colors opacity-0 group-hover:opacity-100"
              aria-label="Previous image"
            >
              <span className="material-icons-outlined text-lg">chevron_left</span>
            </button>
            <button
              onClick={() => setActive((a) => (a + 1) % allImages.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center hover:bg-primary/80 transition-colors opacity-0 group-hover:opacity-100"
              aria-label="Next image"
            >
              <span className="material-icons-outlined text-lg">chevron_right</span>
            </button>
          </>
        )}

        {/* Dot indicators */}
        {allImages.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {allImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={[
                  'w-1.5 h-1.5 rounded-full transition-all duration-200',
                  i === active ? 'bg-primary w-4' : 'bg-white/50 hover:bg-white/80',
                ].join(' ')}
                aria-label={`Image ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Thumbnails — only show if multiple images ────────────── */}
      {allImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {allImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={[
                'flex-shrink-0 w-16 h-16 rounded-sm overflow-hidden border-2 transition-all duration-200',
                i === active
                  ? 'border-primary'
                  : 'border-transparent opacity-60 hover:opacity-100',
              ].join(' ')}
            >
              <img
                src={img}
                alt={`${title} ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}