# GoldenMorsel Backend - Complete Setup Guide v2.0

## 🎯 PROJECT OVERVIEW

This is a WhatsApp-integrated e-commerce backend for GoldenMorsel - a premium Ghanaian treats business.

### Key Features

- ✅ **Guest Checkout** - No signup required (fast sales)
- ✅ **Optional Accounts** - Phone-based login for repeat customers
- ✅ **WhatsApp Integration** - Order confirmation + payment handling
- ✅ **Inventory Management** - Auto-reduce stock on payment, audit logs
- ✅ **Order Lifecycle** - pending → confirmed → paid → processing → shipped → delivered
- ✅ **Admin Dashboard API** - Order management, inventory, analytics
- ✅ **Payment Processing** - WhatsApp message processing + confirmation

---

## 📊 TECHNOLOGY STACK

| Component       | Technology | Purpose                       |
| --------------- | ---------- | ----------------------------- |
| **Runtime**     | Node.js    | JavaScript on server          |
| **Framework**   | Express.js | HTTP request handling         |
| **Database**    | MongoDB    | Store products, orders, users |
| **Auth**        | JWT        | Secure admin access           |
| **Passwords**   | bcryptjs   | Hash passwords securely       |
| **API Testing** | Postman    | Test endpoints                |
| **Environment** | dotenv     | Manage secrets                |

---

## 📁 COMPLETE PROJECT STRUCTURE

```
goldenmorse-backend/
│
├── src/
│   ├── server.js                      ← Main entry point
│   ├── config/
│   │   ├── database.js                ← MongoDB connection
│   │   └── constants.js               ← App constants
│   │
│   ├── models/                        ← Database schemas
│   │   ├── Product.js                 ← Product catalog
│   │   ├── Order.js                   ← Customer orders
│   │   ├── User.js                    ← Optional user accounts
│   │   ├── InventoryLog.js            ← Stock audit trail
│   │   └── Admin.js                   ← Admin users
│   │
│   ├── controllers/                   ← Business logic
│   │   ├── productController.js       ← Manage products
│   │   ├── orderController.js         ← Manage orders
│   │   ├── userController.js          ← Manage users
│   │   ├── inventoryController.js     ← Manage inventory
│   │   ├── authController.js          ← Admin login
│   │   ├── adminController.js         ← Admin dashboard
│   │   └── whatsappController.js      ← WhatsApp webhook
│   │
│   ├── routes/                        ← API endpoints
│   │   ├── productRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── userRoutes.js
│   │   ├── inventoryRoutes.js
│   │   ├── authRoutes.js
│   │   ├── adminRoutes.js
│   │   └── whatsappRoutes.js
│   │
│   ├── middleware/                    ← Custom middleware
│   │   ├── authMiddleware.js          ← Check JWT tokens
│   │   ├── adminMiddleware.js         ← Check admin role
│   │   ├── errorHandler.js            ← Handle errors
│   │   └── validation.js              ← Validate input
│   │
│   ├── services/                      ← External integrations
│   │   ├── whatsappService.js         ← WhatsApp API calls
│   │   ├── inventoryService.js        ← Stock management
│   │   ├── orderService.js            ← Order business logic
│   │   └── emailService.js            ← Email notifications
│   │
│   └── utils/
│       ├── helpers.js                 ← Utility functions
│       ├── validators.js              ← Input validators
│       └── formatters.js              ← Data formatters
│
├── logs/                              ← Log files
│   └── .gitkeep
│
├── .env                               ← ENVIRONMENT VARIABLES (don't commit)
├── .env.example                       ← Template for .env
├── .gitignore                         ← What to exclude from git
├── package.json                       ← Dependencies
├── package-lock.json                  ← Dependency lock file
├── README.md                          ← Project overview
└── SETUP.md                           ← This file
```

---

## 🚀 QUICK START

### Prerequisites

- Node.js 14+ installed
- MongoDB installed locally OR MongoDB Atlas account
- Text editor (VS Code recommended)
- Postman/Insomnia for testing

### Step 1: Create Project Folder

```bash
mkdir goldenmorse-backend
cd goldenmorse-backend
```

### Step 2: Initialize Node Project

```bash
npm init -y
```

### Step 3: Install Dependencies

```bash
npm install express mongoose bcryptjs jsonwebtoken dotenv cors axios nodemailer
npm install --save-dev nodemon
```

### Step 4: Create .env File

```bash
cp .env.example .env
# Edit .env with your settings
```

### Step 5: Start Server

```bash
npm run dev
```

You should see:

```
✓ MongoDB connected
🚀 Server running on port 5000
```

---

## 🔧 ENVIRONMENT VARIABLES

Create `.env` file with:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/goldenmorse
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/goldenmorse

# JWT
JWT_SECRET=your_super_secret_key_min_32_characters
JWT_ADMIN_SECRET=your_admin_secret_key_min_32_characters

# WhatsApp API
WHATSAPP_ACCESS_TOKEN=your_meta_access_token
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
WHATSAPP_BUSINESS_ACCOUNT_ID=your_business_account_id
WHATSAPP_VERIFY_TOKEN=random_webhook_verify_token
ADMIN_WHATSAPP_NUMBER=+233XXXXXXXXX

# Frontend
FRONTEND_URL=http://localhost:3000

# Email (optional, for notifications)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# Admin
ADMIN_PHONE=+233XXXXXXXXX
ADMIN_EMAIL=admin@goldenmorse.com
```

---

## 📚 DATA MODELS

### Product Model

```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  price: Number,
  priceDisplay: String, // e.g., "GH₵ 45.00"
  image: String,
  category: String, // "treaties", "memoria", "convention"

  variants: [
    { name: "Vanilla", price: 45 },
    { name: "Chocolate", price: 50 }
  ],

  // Inventory
  stock: Number,
  lowStockThreshold: Number, // e.g., 10

  // Metadata
  rating: Number,
  active: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Order Model

```javascript
{
  _id: ObjectId,
  orderId: String, // "ORD-2025-0001"

  // Guest or User info
  guestInfo: {
    name: String,
    phone: String,
    email: String,
    address: String,
    city: String
  },
  userId: ObjectId, // Optional - if customer has account

  // Order details
  items: [
    {
      productId: ObjectId,
      title: String,
      variant: String,
      quantity: Number,
      price: Number,
      subtotal: Number
    }
  ],

  // Totals
  subtotal: Number,
  vat: Number, // 6%
  shipping: Number,
  total: Number,

  // Status workflow
  status: String, // pending → confirmed → paid → processing → shipped → delivered
  paymentStatus: String, // unpaid → paid

  // Timestamps
  createdAt: Date,
  confirmedAt: Date, // When WhatsApp message received
  paidAt: Date, // When admin confirmed payment
  processedAt: Date, // When started preparing
  shippedAt: Date,
  deliveredAt: Date,

  // Payment
  paymentMethod: String, // "whatsapp", "bank_transfer", "mobile_money"
  paymentReference: String,
  paymentProof: String, // Screenshot URL

  // Notes
  notes: String,
  internalNotes: String
}
```

### User Model (Optional Accounts)

```javascript
{
  _id: ObjectId,
  phone: String, // Primary identifier
  email: String, // Optional
  password: String, // Optional (hashed)
  name: String,

  // Addresses
  addresses: [
    {
      label: String, // "Home", "Work"
      street: String,
      city: String,
      region: String,
      default: Boolean
    }
  ],

  // Preferences
  emailNotifications: Boolean,
  smsNotifications: Boolean,

  // Tracking
  createdAt: Date,
  lastOrderDate: Date,
  totalOrders: Number,
  totalSpent: Number
}
```

### InventoryLog Model

```javascript
{
  _id: ObjectId,
  orderId: String, // Which order caused change
  productId: ObjectId,
  productTitle: String,

  // Stock change
  quantityBefore: Number,
  quantityAfter: Number,
  change: Number, // -2 or +5

  // Why it changed
  reason: String, // "order_paid", "restock", "manual_adjustment", "damage"
  reference: String, // Invoice number for restock

  // Who made the change
  changedBy: ObjectId, // Admin user

  // Timestamp
  createdAt: Date
}
```

### Admin Model

```javascript
{
  _id: ObjectId,
  email: String, // Unique
  password: String, // Hashed
  name: String,
  phone: String,

  // Permissions
  role: String, // "admin", "manager", "staff"
  permissions: [String], // ["view_orders", "confirm_payment", "manage_inventory"]

  // Status
  active: Boolean,
  lastLogin: Date,

  // Tracking
  createdAt: Date,
  createdBy: ObjectId // Which admin created this
}
```

---

## 🔄 API ENDPOINTS

### Products

```
GET    /api/products                     ← Get all products
GET    /api/products/:id                 ← Get single product
POST   /api/products                     ← Create (admin only)
PUT    /api/products/:id                 ← Update (admin only)
DELETE /api/products/:id                 ← Delete (admin only)
```

### Orders (Guest Checkout)

```
POST   /api/orders/create                ← Create order (guest)
GET    /api/orders/:orderId              ← Get order details
GET    /api/orders/track/:phone          ← Track orders by phone
GET    /api/orders                       ← List user orders (if logged in)
```

### Users (Optional Accounts)

```
POST   /api/users/signup                 ← Create account
POST   /api/users/login                  ← Login with phone
GET    /api/users/me                     ← Get current user
PUT    /api/users/me                     ← Update profile
GET    /api/users/:phone/orders          ← Get user's past orders
```

### WhatsApp

```
POST   /api/whatsapp/webhook             ← Receive messages
POST   /api/whatsapp/:orderId/confirm    ← Admin confirm payment
GET    /api/whatsapp/:orderId/send       ← Send message to customer
```

### Inventory

```
GET    /api/inventory/stock              ← Current stock levels
GET    /api/inventory/logs               ← View audit log
GET    /api/inventory/alerts             ← Low stock alerts
POST   /api/inventory/restock            ← Restock product
POST   /api/inventory/adjust             ← Manual adjustment
```

### Admin

```
POST   /api/admin/login                  ← Admin login
GET    /api/admin/dashboard              ← Dashboard stats
GET    /api/admin/orders                 ← All orders
POST   /api/admin/orders/:id/confirm     ← Confirm payment
GET    /api/admin/analytics              ← Sales analytics
```

---

## 🔐 AUTHENTICATION FLOW

### For Customers (Optional)

```
Customer visits site
    ↓
Browse & add to cart
    ↓
Checkout
    ├─ Option 1: Guest checkout (phone only)
    │  └─ Skip signup
    │
    └─ Option 2: Create account (optional)
       ├─ Enter phone
       ├─ (Verify via WhatsApp)
       └─ Save address, get order history
```

### For Admin

```
Admin navigates to /admin/login
    ↓
Enter email + password
    ↓
Backend creates JWT token
    ↓
Admin redirected to dashboard
    ↓
All admin requests include JWT token
    ↓
Middleware verifies token
    ↓
Access granted if valid
```

---

## 🔄 ORDER WORKFLOW

```
1. CUSTOMER CREATES ORDER (Guest)
   POST /api/orders/create
   Body: {
     guestInfo: { name, phone, email, address },
     items: [{ productId, variant, quantity }],
     totalPrice: 150
   }
   ↓
   Order status: "pending"
   ↓
   Send invoice to WhatsApp

2. CUSTOMER OPENS WHATSAPP
   GET /api/whatsapp/:orderId/send
   ↓
   Pre-filled message with invoice

3. CUSTOMER SENDS PAYMENT
   Sends screenshot/confirmation on WhatsApp
   ↓

4. ADMIN RECEIVES MESSAGE
   Sees payment proof in WhatsApp
   ↓

5. ADMIN CONFIRMS IN DASHBOARD
   POST /api/admin/orders/:id/confirm-payment
   ↓
   Order status: "paid"
   ↓
   For each item:
     - Reduce product.stock
     - Create InventoryLog entry
   ↓
   Send receipt to customer

6. ORDER PROCESSING
   Admin marks: "processing"
   ↓

7. SHIPMENT
   Admin marks: "shipped" + tracking number
   ↓
   Send tracking via WhatsApp

8. DELIVERY
   Admin marks: "delivered"
   ↓
   Send delivery confirmation
   ↓

9. COMPLETE
   Order workflow done
   ↓
   Customer can login later to see order history
```

---

## 📱 WHATSAPP INTEGRATION FLOW

```
Order Created
    ↓
Backend calls WhatsApp API
    ↓
Sends pre-filled message:
"Order #ORD-2025-0001
 Items:
 • Chocolate Cake x2 = GH₵ 90.00
 • Strawberry Jam x1 = GH₵ 60.00

 TOTAL: GH₵ 150.00

 Reply to confirm/ask questions"
    ↓
Customer opens message
    ↓
Customer sends payment proof
    ↓
Webhook receives message
    ↓
Backend detects payment keywords
    ↓
Admin notified in WhatsApp
    ↓
Admin confirms in dashboard
    ↓
Backend sends receipt
"✅ Payment confirmed!
 Order #ORD-2025-0001 confirmed.
 We'll prepare your order.
 Tracking: [link]"
```

---

## 🚀 IMPLEMENTATION PHASES

### PHASE 1: MVP (Week 1)

- ✅ Product model & CRUD
- ✅ Guest checkout (no auth)
- ✅ Order creation
- ✅ Basic WhatsApp integration
- ✅ Admin manual confirmation

### PHASE 2: Growth (Week 2-3)

- ✅ Inventory system + InventoryLog
- ✅ Detailed order statuses
- ✅ WhatsApp webhook for auto-confirmation
- ✅ Admin dashboard
- ✅ Analytics

### PHASE 3: Scale (Week 4)

- ✅ Optional user accounts
- ✅ Phone-based login
- ✅ Order history
- ✅ Email notifications
- ✅ Loyalty program ready

---

## 🧪 TESTING THE BACKEND

### Test with Postman

1. **Create Product**

```
POST http://localhost:5000/api/products
Headers: Authorization: Bearer <admin_token>
Body:
{
  "title": "Chocolate Cake",
  "description": "Rich chocolate",
  "price": 45,
  "priceDisplay": "GH₵ 45.00",
  "image": "url",
  "category": "treaties",
  "stock": 50
}
```

2. **Get Products**

```
GET http://localhost:5000/api/products
```

3. **Create Guest Order**

```
POST http://localhost:5000/api/orders/create
Body:
{
  "guestInfo": {
    "name": "John Doe",
    "phone": "+233123456789",
    "email": "john@example.com",
    "address": "123 Main St, Accra"
  },
  "items": [
    {
      "productId": "product_id_here",
      "title": "Chocolate Cake",
      "quantity": 2,
      "price": 45,
      "subtotal": 90
    }
  ],
  "totalPrice": 90
}
```

---

## 📋 DEPLOYMENT CHECKLIST

### Before Going Live

- [ ] All environment variables set
- [ ] MongoDB backup configured
- [ ] Admin user created
- [ ] WhatsApp API credentials working
- [ ] Error logging setup
- [ ] Rate limiting enabled
- [ ] HTTPS/SSL certificate
- [ ] Security headers added
- [ ] CORS properly configured
- [ ] Tests passing

### Deployment Platforms

- **Heroku** - Simple, free tier available
- **Railway** - Easy GitHub integration
- **Render** - Good free tier
- **AWS/DigitalOcean** - More control, more setup

---

## 📞 TROUBLESHOOTING

### MongoDB Connection Error

```
Check MONGODB_URI in .env
Make sure MongoDB is running: mongod
For Atlas: Check IP whitelist
```

### WhatsApp Webhook Not Receiving

```
Check WHATSAPP_VERIFY_TOKEN
Make sure backend is accessible
Configure webhook in Meta Dashboard
```

### Port Already in Use

```bash
lsof -i :5000
kill -9 <PID>
```

### JWT Token Issues

```
Check JWT_SECRET is set in .env
Token might be expired
Check Authorization header format: Bearer <token>
```

---

## 📚 NEXT STEPS

1. ✅ Create all model files
2. ✅ Create all controller files
3. ✅ Create all route files
4. ✅ Create middleware files
5. ✅ Create service files
6. ✅ Test endpoints with Postman
7. ✅ Deploy to production

---

**Ready to start coding? Let's go!** 🚀
