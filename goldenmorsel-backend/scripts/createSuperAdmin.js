// ─────────────────────────────────────────────────────────────
// scripts/createSuperAdmin.js
//
// Run ONCE to create the first superadmin account:
//   node scripts/createSuperAdmin.js
//
// After running, delete or gitignore this file.
// ─────────────────────────────────────────────────────────────

import mongoose from 'mongoose'
import bcryptjs from 'bcryptjs'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname  = dirname(__filename)

dotenv.config({ path: join(__dirname, '../.env') })

// ── Inline Admin schema (avoids import path issues) ──────────
const adminSchema = new mongoose.Schema({
  email:       { type: String, required: true, unique: true },
  password:    { type: String, required: true, select: false },
  name:        { type: String, required: true },
  phone:       { type: String },
  role:        { type: String, enum: ['superadmin', 'admin'], default: 'admin' },
  permissions: [String],
  active:      { type: Boolean, default: true },
}, { timestamps: true })

const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema)

// ── Superadmin details — CHANGE THESE ────────────────────────
const SUPERADMIN = {
  name:     'Super Admin',
  email:    'superadmin@goldenmorsel.com',
  password: 'kierkegaardniil33m)',     // ← change this
  phone:    '+233551283848',          // ← change this
}

// ── Run ───────────────────────────────────────────────────────
const run = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ Connected to MongoDB')

    const existing = await Admin.findOne({ email: SUPERADMIN.email })
    if (existing) {
      console.log('⚠️  Superadmin already exists:', existing.email)
      process.exit(0)
    }

    const salt     = await bcryptjs.genSalt(10)
    const hashed   = await bcryptjs.hash(SUPERADMIN.password, salt)

    await Admin.create({
      ...SUPERADMIN,
      password:    hashed,
      role:        'superadmin',
      permissions: [
        'view_orders',
        'confirm_payment',
        'manage_inventory',
        'manage_products',
        'manage_admins',
        'view_analytics',
      ],
    })

    console.log('✅ Superadmin created!')
    console.log('   Email:   ', SUPERADMIN.email)
    console.log('   Password:', SUPERADMIN.password)
    console.log('\n⚠️  Change the password after first login.')
    process.exit(0)
  } catch (err) {
    console.error('❌ Error:', err.message)
    process.exit(1)
  }
}

run()