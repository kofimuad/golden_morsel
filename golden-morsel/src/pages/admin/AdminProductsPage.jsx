import { useState, useEffect, useCallback } from 'react'
import { adminApi } from '../../services/api'
import { showToast } from '../../components/ui/Toast'
import { formatPrice } from '../../utils/formatters'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import Input from '../../components/ui/Input'
import { Select } from '../../components/ui/Select'
import { Textarea } from '../../components/ui/Textarea'
import { Skeleton } from '../../components/ui/Skeleton'
import ProductImageInput from '../../components/admin/ProductImageInput'

const CATEGORIES = [
  { value: 'treaties',   label: 'Treaties'   },
  { value: 'memoria',    label: 'Memoria'    },
  { value: 'convention', label: 'Convention' },
]

const EMPTY_FORM = {
  title: '', description: '', price: '',
  category: 'treaties', stock: '', image: '',
  lowStockThreshold: 5, variants: [],
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [search,   setSearch]   = useState('')

  // Modal state
  const [modal,   setModal]   = useState({ open: false, mode: 'create', product: null })
  const [delModal, setDelModal] = useState({ open: false, product: null })
  const [saving,  setSaving]  = useState(false)
  const [deleting, setDeleting] = useState(false)

  // Form state
  const [form,   setForm]   = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [variantInput, setVariantInput] = useState({ name: '', price: '' })

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    try {
      const params = search ? `?search=${search}` : ''
      const res = await adminApi.get(`/products${params}`)
      setProducts(res.data.data)
    } catch {
      showToast.error('Failed to load products')
    } finally {
      setLoading(false)
    }
  }, [search])

  useEffect(() => { fetchProducts() }, [fetchProducts])

  // ── Open create modal ────────────────────────────────────────
  const openCreate = () => {
    setForm(EMPTY_FORM)
    setErrors({})
    setVariantInput({ name: '', price: '' })
    setModal({ open: true, mode: 'create', product: null })
  }

  // ── Open edit modal ──────────────────────────────────────────
  const openEdit = (product) => {
    setForm({
      title:             product.title        || '',
      description:       product.description  || '',
      price:             product.price        || '',
      category:          product.category     || 'treaties',
      stock:             product.stock        ?? '',
      image:             product.image        || '',
      lowStockThreshold: product.lowStockThreshold ?? 5,
      variants:          product.variants     || [],
    })
    setErrors({})
    setVariantInput({ name: '', price: '' })
    setModal({ open: true, mode: 'edit', product })
  }

  // ── Form change ──────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  // ── Add variant ──────────────────────────────────────────────
  const addVariant = () => {
    if (!variantInput.name.trim()) return
    setForm(prev => ({
      ...prev,
      variants: [...prev.variants, {
        name:  variantInput.name.trim(),
        price: parseFloat(variantInput.price) || parseFloat(form.price) || 0,
      }],
    }))
    setVariantInput({ name: '', price: '' })
  }

  const removeVariant = (i) => {
    setForm(prev => ({ ...prev, variants: prev.variants.filter((_, idx) => idx !== i) }))
  }

  // ── Validate ─────────────────────────────────────────────────
  const validate = () => {
    const errs = {}
    if (!form.title.trim())   errs.title    = 'Title is required'
    if (!form.price)          errs.price    = 'Price is required'
    if (isNaN(form.price))    errs.price    = 'Price must be a number'
    if (!form.category)       errs.category = 'Category is required'
    if (form.stock === '')    errs.stock    = 'Stock is required'
    return errs
  }

  // ── Save (create or edit) ────────────────────────────────────
  const handleSave = async () => {
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setSaving(true)
    const payload = {
      ...form,
      price: parseFloat(form.price),
      stock: parseInt(form.stock),
      lowStockThreshold: parseInt(form.lowStockThreshold) || 5,
    }

    try {
      if (modal.mode === 'create') {
        await adminApi.post('/products', payload)
        showToast.success('Product created!')
      } else {
        await adminApi.put(`/products/${modal.product._id}`, payload)
        showToast.success('Product updated!')
      }
      setModal({ open: false, mode: 'create', product: null })
      fetchProducts()
    } catch (err) {
      showToast.error(err.response?.data?.message || 'Failed to save product')
    } finally {
      setSaving(false)
    }
  }

  // ── Delete ───────────────────────────────────────────────────
  const handleDelete = async () => {
    if (!delModal.product) return
    setDeleting(true)
    try {
      await adminApi.delete(`/products/${delModal.product._id}`)
      showToast.success('Product deleted')
      setDelModal({ open: false, product: null })
      fetchProducts()
    } catch {
      showToast.error('Failed to delete product')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="space-y-6">

      {/* ── Header ──────────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-gray-500 font-sans">
            {products.length} products
          </p>
          <h2 className="font-display text-xl text-white mt-0.5">Products</h2>
        </div>
        <Button leftIcon="add" onClick={openCreate}>New Product</Button>
      </div>

      {/* ── Search ──────────────────────────────────────────────── */}
      <div className="relative max-w-sm">
        <span className="material-icons-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg pointer-events-none">
          search
        </span>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-surface-dark-3 border border-border-dark rounded-sm pl-10 pr-4 py-2.5 text-sm text-white font-sans placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary"
        />
      </div>

      {/* ── Products grid ───────────────────────────────────────── */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => <Skeleton key={i} variant="card" />)}
        </div>
      ) : products.length === 0 ? (
        <div className="py-20 text-center">
          <span className="material-icons-outlined text-4xl text-gray-700 mb-3 block">inventory_2</span>
          <p className="text-sm text-gray-500 font-sans">No products found</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map(product => (
            <div
              key={product._id}
              className="bg-surface-dark-2 border border-border-dark rounded-sm overflow-hidden hover:border-primary/20 transition-colors group"
            >
              {/* Image */}
              <div className="aspect-[3/4] overflow-hidden bg-surface-dark-3">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="material-icons-outlined text-3xl text-gray-700">image_not_supported</span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-3 space-y-2">
                <p className="text-sm text-white font-sans font-medium leading-snug line-clamp-2">
                  {product.title}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-primary font-sans">{formatPrice(product.price)}</p>
                  <Badge
                    status={product.stock === 0 ? 'out' : product.stock <= product.lowStockThreshold ? 'low' : 'ok'}
                  />
                </div>
                <p className="text-[10px] text-gray-500 font-sans uppercase tracking-wide">
                  {product.category} · {product.stock} in stock
                </p>

                {/* Actions */}
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => openEdit(product)}
                    className="flex-1 flex items-center justify-center gap-1 py-1.5 text-[10px] uppercase tracking-widest font-sans text-gray-400 hover:text-primary border border-border-dark hover:border-primary/30 rounded-sm transition-colors"
                  >
                    <span className="material-icons-outlined text-sm">edit</span>
                    Edit
                  </button>
                  <button
                    onClick={() => setDelModal({ open: true, product })}
                    className="flex items-center justify-center p-1.5 text-gray-600 hover:text-red-400 border border-border-dark hover:border-red-500/30 rounded-sm transition-colors"
                  >
                    <span className="material-icons-outlined text-sm">delete_outline</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Create / Edit Modal ──────────────────────────────────── */}
      <Modal
        open={modal.open}
        onClose={() => setModal({ open: false, mode: 'create', product: null })}
        title={modal.mode === 'create' ? 'New Product' : 'Edit Product'}
        size="lg"
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setModal({ open: false, mode: 'create', product: null })}>
              Cancel
            </Button>
            <Button size="sm" loading={saving} onClick={handleSave} leftIcon="save">
              {modal.mode === 'create' ? 'Create Product' : 'Save Changes'}
            </Button>
          </>
        }
      >
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
          <Input label="Title" name="title" value={form.title} onChange={handleChange} error={errors.title} />

          <Textarea label="Description" name="description" value={form.description} onChange={handleChange} rows={3} />

          <div className="grid grid-cols-2 gap-4">
            <Input label="Price (GH₵)" name="price" type="number" step="0.01" value={form.price} onChange={handleChange} error={errors.price} />
            <Input label="Stock" name="stock" type="number" value={form.stock} onChange={handleChange} error={errors.stock} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Select label="Category" name="category" options={CATEGORIES} value={form.category} onChange={handleChange} error={errors.category} />
            <Input label="Low Stock Threshold" name="lowStockThreshold" type="number" value={form.lowStockThreshold} onChange={handleChange} />
          </div>

          <ProductImageInput
            value={form.image}
            onChange={(url) => setForm(prev => ({ ...prev, image: url }))}
          />

          {/* Variants */}
          <div>
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-sans mb-2">
              Variants (Optional)
            </p>

            {form.variants.map((v, i) => (
              <div key={i} className="flex items-center justify-between py-2 px-3 mb-1.5 rounded-sm bg-surface-dark-3 border border-border-dark">
                <span className="text-xs text-white font-sans">{v.name}</span>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-primary font-sans">{formatPrice(v.price)}</span>
                  <button onClick={() => removeVariant(i)} className="text-gray-600 hover:text-red-400 transition-colors">
                    <span className="material-icons-outlined text-sm">close</span>
                  </button>
                </div>
              </div>
            ))}

            <div className="flex gap-2 mt-2">
              <input
                type="text"
                placeholder="Variant name"
                value={variantInput.name}
                onChange={e => setVariantInput(p => ({ ...p, name: e.target.value }))}
                className="flex-1 bg-surface-dark-3 border border-border-dark rounded-sm px-3 py-2 text-sm text-white font-sans placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-primary/50"
              />
              <input
                type="number"
                placeholder="Price"
                value={variantInput.price}
                onChange={e => setVariantInput(p => ({ ...p, price: e.target.value }))}
                className="w-24 bg-surface-dark-3 border border-border-dark rounded-sm px-3 py-2 text-sm text-white font-sans placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-primary/50"
              />
              <button
                onClick={addVariant}
                className="px-3 py-2 bg-primary/15 border border-primary/30 text-primary rounded-sm hover:bg-primary/25 transition-colors"
              >
                <span className="material-icons-outlined text-base">add</span>
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* ── Delete Confirm Modal ─────────────────────────────────── */}
      <Modal
        open={delModal.open}
        onClose={() => setDelModal({ open: false, product: null })}
        title="Delete Product"
        description="This action cannot be undone."
        size="sm"
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setDelModal({ open: false, product: null })}>
              Cancel
            </Button>
            <Button variant="danger" size="sm" loading={deleting} onClick={handleDelete} leftIcon="delete_outline">
              Delete
            </Button>
          </>
        }
      >
        <p className="text-sm text-gray-300 font-sans">
          Are you sure you want to delete <span className="text-white font-medium">{delModal.product?.title}</span>? This will permanently remove the product and all its data.
        </p>
      </Modal>
    </div>
  )
}