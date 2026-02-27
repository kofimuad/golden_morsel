import { useState, useRef } from 'react'
import { adminApi } from '../../services/api'
import { showToast } from '../ui/Toast'

/**
 * ProductImageInput
 *
 * Props:
 *   value      - current image URL string
 *   onChange   - fn(url) called when image URL changes
 */
export default function ProductImageInput({ value, onChange }) {
  const [tab,       setTab]       = useState('url')   // 'url' | 'upload'
  const [uploading, setUploading] = useState(false)
  const [preview,   setPreview]   = useState(value || '')
  const fileRef = useRef(null)

  // ── Handle URL input ─────────────────────────────────────────
  const handleUrlChange = (e) => {
    setPreview(e.target.value)
    onChange(e.target.value)
  }

  // ── Handle file select + upload ──────────────────────────────
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Show local preview immediately
    const localUrl = URL.createObjectURL(file)
    setPreview(localUrl)

    // Upload to Cloudinary via backend
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('image', file)

      const res = await adminApi.post('/upload/product-image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      const cloudinaryUrl = res.data.data.url
      setPreview(cloudinaryUrl)
      onChange(cloudinaryUrl)
      showToast.success('Image uploaded!')
    } catch (err) {
      showToast.error(err.response?.data?.message || 'Upload failed')
      setPreview(value || '') // revert preview
      onChange(value || '')
    } finally {
      setUploading(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file && fileRef.current) {
      // Simulate file input change
      const dt = new DataTransfer()
      dt.items.add(file)
      fileRef.current.files = dt.files
      handleFileChange({ target: { files: [file] } })
    }
  }

  return (
    <div>
      <p className="text-[10px] uppercase tracking-widest text-gray-400 font-sans mb-2">
        Product Image
      </p>

      {/* ── Tab switcher ──────────────────────────────────────── */}
      <div className="flex gap-1 p-1 bg-surface-dark-3 border border-border-dark rounded-sm mb-3 w-fit">
        {[
          { key: 'url',    label: 'Image URL'   },
          { key: 'upload', label: 'Upload File' },
        ].map(t => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={[
              'px-4 py-1.5 text-[10px] uppercase tracking-widest font-sans font-medium rounded-sm transition-all',
              tab === t.key
                ? 'bg-primary text-black'
                : 'text-gray-500 hover:text-white',
            ].join(' ')}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── URL tab ───────────────────────────────────────────── */}
      {tab === 'url' && (
        <div className="relative">
          <span className="material-icons-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg pointer-events-none">
            image
          </span>
          <input
            type="url"
            placeholder="https://..."
            value={tab === 'url' ? (value || '') : ''}
            onChange={handleUrlChange}
            className="w-full bg-surface-dark-3 border border-border-dark rounded-sm pl-10 pr-4 py-3 text-sm text-white font-sans placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary transition-all"
          />
        </div>
      )}

      {/* ── Upload tab ────────────────────────────────────────── */}
      {tab === 'upload' && (
        <div
          onDrop={handleDrop}
          onDragOver={e => e.preventDefault()}
          className={[
            'relative border-2 border-dashed rounded-sm transition-colors cursor-pointer',
            uploading
              ? 'border-primary/40 bg-primary/5'
              : 'border-border-dark hover:border-primary/40 hover:bg-primary/3',
          ].join(' ')}
          onClick={() => !uploading && fileRef.current?.click()}
        >
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleFileChange}
          />

          <div className="flex flex-col items-center justify-center py-8 gap-2">
            {uploading ? (
              <>
                <span className="material-icons-outlined text-3xl text-primary animate-spin">
                  autorenew
                </span>
                <p className="text-xs text-primary font-sans">Uploading to Cloudinary...</p>
              </>
            ) : (
              <>
                <span className="material-icons-outlined text-3xl text-gray-600">
                  cloud_upload
                </span>
                <p className="text-sm text-gray-400 font-sans">
                  Click or drag & drop an image
                </p>
                <p className="text-[10px] text-gray-600 font-sans uppercase tracking-widest">
                  JPG, PNG, WebP · Max 5MB
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── Image preview ─────────────────────────────────────── */}
      {preview && !uploading && (
        <div className="mt-3 relative group w-24">
          <img
            src={preview}
            alt="Product preview"
            className="w-24 h-28 object-cover rounded-sm border border-border-dark"
            onError={() => setPreview('')}
          />
          <button
            type="button"
            onClick={() => { setPreview(''); onChange('') }}
            className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <span className="material-icons-outlined text-xs">close</span>
          </button>
        </div>
      )}
    </div>
  )
}