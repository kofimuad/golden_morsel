import { useState, useEffect, useCallback } from 'react'
import { adminApi } from '../../services/api'
import { useAdminAuth } from '../../hooks/useAdminAuth'
import { showToast } from '../../components/ui/Toast'
import { formatDate } from '../../utils/formatters'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import Input from '../../components/ui/Input'
import Badge from '../../components/ui/Badge'
import { Skeleton } from '../../components/ui/Skeleton'

export default function AdminManagementPage() {
  const { admin: currentAdmin } = useAdminAuth()
  const isSuperAdmin = currentAdmin?.role === 'superadmin'

  const [admins,  setAdmins]  = useState([])
  const [loading, setLoading] = useState(true)

  // Create modal
  const [createModal,  setCreateModal]  = useState(false)
  const [form,         setForm]         = useState({ name: '', email: '', phone: '', password: '' })
  const [errors,       setErrors]       = useState({})
  const [saving,       setSaving]       = useState(false)

  // Delete modal
  const [delModal,  setDelModal]  = useState({ open: false, admin: null })
  const [deleting,  setDeleting]  = useState(false)

  // Toggle active
  const [togglingId, setTogglingId] = useState(null)

  // ── Fetch admins ─────────────────────────────────────────────
  const fetchAdmins = useCallback(async () => {
    setLoading(true)
    try {
      const res = await adminApi.get('/admin/admins')
      setAdmins(res.data.data)
    } catch (err) {
      showToast.error('Failed to load admins')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchAdmins() }, [fetchAdmins])

  // ── Not superadmin — show locked view ────────────────────────
  if (!isSuperAdmin) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6">
          <span className="material-icons-outlined text-3xl text-red-400">lock</span>
        </div>
        <h2 className="font-display text-xl text-white mb-2">Access Restricted</h2>
        <p className="text-sm text-gray-500 font-sans">
          Only the superadmin can manage admin accounts.
        </p>
      </div>
    )
  }

  // ── Form change ──────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const errs = {}
    if (!form.name.trim())    errs.name     = 'Name is required'
    if (!form.email.trim())   errs.email    = 'Email is required'
    if (!form.password)       errs.password = 'Password is required'
    if (form.password.length < 8)
      errs.password = 'Password must be at least 8 characters'
    return errs
  }

  // ── Create admin ─────────────────────────────────────────────
  const handleCreate = async () => {
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setSaving(true)
    try {
      await adminApi.post('/auth/admin-signup', form)
      showToast.success(`Admin account created for ${form.name}`)
      setCreateModal(false)
      setForm({ name: '', email: '', phone: '', password: '' })
      fetchAdmins()
    } catch (err) {
      showToast.error(err.response?.data?.message || 'Failed to create admin')
    } finally {
      setSaving(false)
    }
  }

  // ── Delete admin ─────────────────────────────────────────────
  const handleDelete = async () => {
    if (!delModal.admin) return
    setDeleting(true)
    try {
      await adminApi.delete(`/admin/admins/${delModal.admin._id}`)
      showToast.success('Admin account removed')
      setDelModal({ open: false, admin: null })
      fetchAdmins()
    } catch (err) {
      showToast.error(err.response?.data?.message || 'Failed to remove admin')
    } finally {
      setDeleting(false)
    }
  }

  // ── Toggle active ─────────────────────────────────────────────
  const handleToggle = async (admin) => {
    setTogglingId(admin._id)
    try {
      await adminApi.patch(`/admin/admins/${admin._id}/toggle`)
      showToast.success(`${admin.name} ${admin.active ? 'deactivated' : 'activated'}`)
      fetchAdmins()
    } catch (err) {
      showToast.error(err.response?.data?.message || 'Failed to update status')
    } finally {
      setTogglingId(null)
    }
  }

  return (
    <div className="space-y-6">

      {/* ── Header ──────────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-gray-500 font-sans">
            Superadmin Only
          </p>
          <h2 className="font-display text-xl text-white mt-0.5">Admin Management</h2>
        </div>
        <Button leftIcon="person_add" onClick={() => {
          setForm({ name: '', email: '', phone: '', password: '' })
          setErrors({})
          setCreateModal(true)
        }}>
          Create Admin
        </Button>
      </div>

      {/* ── Current user banner ─────────────────────────────────── */}
      <div className="flex items-center gap-3 px-5 py-4 rounded-sm bg-primary/8 border border-primary/20">
        <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
          <span className="text-primary text-sm font-display font-semibold uppercase">
            {currentAdmin?.name?.charAt(0)}
          </span>
        </div>
        <div>
          <p className="text-sm text-white font-sans font-medium">{currentAdmin?.name}</p>
          <p className="text-[10px] text-primary font-sans uppercase tracking-widest">
            Superadmin · You
          </p>
        </div>
        <div className="ml-auto">
          <Badge variant="gold" label="Superadmin" dot={false} />
        </div>
      </div>

      {/* ── Admins table ────────────────────────────────────────── */}
      <div className="bg-surface-dark-2 border border-border-dark rounded-sm overflow-hidden">

        {/* Header */}
        <div className="hidden md:grid grid-cols-[2fr_1.5fr_1fr_1fr_auto] gap-4 px-5 py-3 border-b border-border-dark">
          {['Admin', 'Email', 'Role', 'Status', 'Actions'].map(h => (
            <p key={h} className="text-[10px] uppercase tracking-widest text-gray-500 font-sans">{h}</p>
          ))}
        </div>

        {loading ? (
          <div className="p-4 space-y-3">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} variant="text" lines={1} className="h-14" />
            ))}
          </div>
        ) : admins.length === 0 ? (
          <div className="py-16 text-center">
            <span className="material-icons-outlined text-4xl text-gray-700 mb-3 block">
              group
            </span>
            <p className="text-sm text-gray-500 font-sans">No admins yet</p>
          </div>
        ) : (
          <div className="divide-y divide-border-dark">
            {admins.map(admin => {
              const isYou       = admin._id === currentAdmin?._id
              const isSuperadmin = admin.role === 'superadmin'

              return (
                <div
                  key={admin._id}
                  className="grid grid-cols-1 md:grid-cols-[2fr_1.5fr_1fr_1fr_auto] gap-3 md:gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors"
                >
                  {/* Name + joined */}
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-surface-dark-3 border border-border-dark flex items-center justify-center flex-shrink-0">
                      <span className={`text-sm font-display font-semibold uppercase ${isSuperadmin ? 'text-primary' : 'text-gray-400'}`}>
                        {admin.name?.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-white font-sans font-medium flex items-center gap-2">
                        {admin.name}
                        {isYou && (
                          <span className="text-[9px] uppercase tracking-widest text-primary font-sans">You</span>
                        )}
                      </p>
                      <p className="text-[10px] text-gray-500 font-sans">
                        Joined {formatDate(admin.createdAt)}
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <p className="text-xs text-gray-400 font-sans self-center truncate">
                    {admin.email}
                  </p>

                  {/* Role */}
                  <div className="self-center">
                    <Badge
                      variant={isSuperadmin ? 'gold' : 'gray'}
                      label={admin.role}
                      dot={false}
                    />
                  </div>

                  {/* Active status */}
                  <div className="self-center">
                    <Badge
                      variant={admin.active ? 'green' : 'red'}
                      label={admin.active ? 'Active' : 'Inactive'}
                    />
                  </div>

                  {/* Actions */}
                  <div className="self-center flex items-center gap-2">
                    {/* Toggle active — can't touch yourself or superadmin */}
                    {!isYou && !isSuperadmin && (
                      <button
                        onClick={() => handleToggle(admin)}
                        disabled={togglingId === admin._id}
                        className={[
                          'flex items-center gap-1 px-3 py-1.5 text-[10px] uppercase tracking-widest font-sans rounded-sm border transition-colors disabled:opacity-50',
                          admin.active
                            ? 'text-amber-400 bg-amber-500/10 border-amber-500/20 hover:bg-amber-500/20'
                            : 'text-green-400 bg-green-500/10 border-green-500/20 hover:bg-green-500/20',
                        ].join(' ')}
                      >
                        <span className="material-icons-outlined text-sm">
                          {admin.active ? 'pause_circle' : 'play_circle'}
                        </span>
                        {admin.active ? 'Deactivate' : 'Activate'}
                      </button>
                    )}

                    {/* Delete — can't touch yourself or superadmin */}
                    {!isYou && !isSuperadmin && (
                      <button
                        onClick={() => setDelModal({ open: true, admin })}
                        className="p-1.5 text-gray-600 hover:text-red-400 border border-border-dark hover:border-red-500/30 rounded-sm transition-colors"
                        aria-label="Remove admin"
                      >
                        <span className="material-icons-outlined text-sm">delete_outline</span>
                      </button>
                    )}

                    {/* Lock icon for superadmin / yourself */}
                    {(isYou || isSuperadmin) && (
                      <span className="material-icons-outlined text-gray-700 text-lg" title="Protected">
                        lock
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* ── Create Admin Modal ───────────────────────────────────── */}
      <Modal
        open={createModal}
        onClose={() => setCreateModal(false)}
        title="Create Admin Account"
        description="They'll receive full admin access except admin management."
        size="md"
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setCreateModal(false)}>
              Cancel
            </Button>
            <Button size="sm" loading={saving} onClick={handleCreate} leftIcon="person_add">
              Create Admin
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input
            label="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            error={errors.name}
            placeholder="Ama Owusu"
          />
          <Input
            label="Email Address"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="ama@goldenmorsel.com"
          />
          <Input
            label="Phone (Optional)"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="+233..."
          />
          <Input
            label="Temporary Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
            hint="At least 8 characters. Ask them to change it after first login."
          />
        </div>
      </Modal>

      {/* ── Delete Confirm Modal ─────────────────────────────────── */}
      <Modal
        open={delModal.open}
        onClose={() => setDelModal({ open: false, admin: null })}
        title="Remove Admin"
        description="This action cannot be undone."
        size="sm"
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setDelModal({ open: false, admin: null })}>
              Cancel
            </Button>
            <Button variant="danger" size="sm" loading={deleting} onClick={handleDelete} leftIcon="delete_outline">
              Remove Admin
            </Button>
          </>
        }
      >
        <p className="text-sm text-gray-300 font-sans">
          Are you sure you want to remove{' '}
          <span className="text-white font-medium">{delModal.admin?.name}</span>'s
          admin access? They will no longer be able to log in.
        </p>
      </Modal>

    </div>
  )
}