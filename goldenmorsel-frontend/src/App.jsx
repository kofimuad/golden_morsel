import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Error & Route Protection
import ErrorBoundary from './components/common/ErrorBoundary';
import PrivateRoute from './components/common/PrivateRoute';

// Layout Components
import Layout from './components/layout/Layout';
import AdminLayout from './components/layout/AdminLayout';

// ============================================================================
// CUSTOMER PAGES (Public & Authenticated)
// ============================================================================

// Public Pages
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import CollectionPage from './pages/CollectionPage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import NotFoundPage from './pages/NotFoundPage';

// Authentication Pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import EmailVerificationPage from './pages/EmailVerificationPage';

// User Account Pages (Authenticated)
import UserProfilePage from './pages/UserProfilePage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import WishlistPage from './pages/WishlistPage';
import AddressManagementPage from './pages/AddressManagementPage';

// Additional Pages
import SearchResultsPage from './pages/SearchResultsPage';
import ContactFormPage from './pages/ContactFormPage';

// Legal/Info Pages
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import ReturnPolicyPage from './pages/ReturnPolicyPage';
import FAQPage from './pages/FAQPage';

// ============================================================================
// ADMIN PAGES
// ============================================================================

// Admin Authentication
import AdminLoginPage from './pages/AdminLoginPage';

// Admin Dashboard
import AdminDashboard from './pages/AdminDashboard';

// Admin Order Management
import OrderManagementPage from './pages/OrderManagementPage';

// Admin Product Management
import ProductManagement from './pages/ProductManagement';
import AddEditProductPage from './pages/AddEditProductPage';

// Admin Customer Management
import CustomerManagementPage from './pages/CustomerManagementPage';

// Admin Inventory Management
import InventoryManagementPage from './pages/InventoryManagementPage';

// Admin Settings
import AdminSettingsPage from './pages/AdminSettingsPage';

// ============================================================================
// APP COMPONENT WITH ROUTES
// ============================================================================

const App = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        <Routes>
          {/* ===== CUSTOMER ROUTES ===== */}

          {/* Public Customer Pages */}
          <Route path="/" element={<Layout><HomePage /></Layout>} />
          <Route path="/shop" element={<Layout><ShopPage /></Layout>} />
          <Route path="/product/:id" element={<Layout><ProductDetailPage /></Layout>} />
          <Route path="/collection/:id" element={<Layout><CollectionPage /></Layout>} />
          <Route path="/cart" element={<Layout><CartPage /></Layout>} />
          <Route path="/search" element={<Layout><SearchResultsPage /></Layout>} />
          <Route path="/track-order" element={<Layout><OrderTrackingPage /></Layout>} />
          <Route path="/contact" element={<Layout><ContactFormPage /></Layout>} />

          {/* Authentication Routes */}
          <Route path="/login" element={<Layout><LoginPage /></Layout>} />
          <Route path="/register" element={<Layout><RegisterPage /></Layout>} />
          <Route path="/forgot-password" element={<Layout><ForgotPasswordPage /></Layout>} />
          <Route path="/reset-password/:token" element={<Layout><ResetPasswordPage /></Layout>} />
          <Route path="/verify-email/:token" element={<Layout><EmailVerificationPage /></Layout>} />

          {/* Protected Customer Routes */}
          <Route
            path="/checkout"
            element={
              <Layout>
                <PrivateRoute>
                  <CheckoutPage />
                </PrivateRoute>
              </Layout>
            }
          />
          <Route
            path="/profile"
            element={
              <Layout>
                <PrivateRoute>
                  <UserProfilePage />
                </PrivateRoute>
              </Layout>
            }
          />
          <Route
            path="/orders"
            element={
              <Layout>
                <PrivateRoute>
                  <OrderHistoryPage />
                </PrivateRoute>
              </Layout>
            }
          />
          <Route
            path="/wishlist"
            element={
              <Layout>
                <PrivateRoute>
                  <WishlistPage />
                </PrivateRoute>
              </Layout>
            }
          />
          <Route
            path="/addresses"
            element={
              <Layout>
                <PrivateRoute>
                  <AddressManagementPage />
                </PrivateRoute>
              </Layout>
            }
          />

          {/* Legal/Info Routes */}
          <Route path="/privacy" element={<Layout><PrivacyPolicyPage /></Layout>} />
          <Route path="/terms" element={<Layout><TermsOfServicePage /></Layout>} />
          <Route path="/return-policy" element={<Layout><ReturnPolicyPage /></Layout>} />
          <Route path="/faq" element={<Layout><FAQPage /></Layout>} />

          {/* ===== ADMIN ROUTES ===== */}

          {/* Admin Login */}
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* Protected Admin Routes */}
          <Route
            path="/admin"
            element={
              <PrivateRoute requiredRole="admin">
                <AdminLayout>
                  <Navigate to="/admin/dashboard" replace />
                </AdminLayout>
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute requiredRole="admin">
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/orders"
            element={
              <PrivateRoute requiredRole="admin">
                <AdminLayout>
                  <OrderManagementPage />
                </AdminLayout>
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/orders/:id"
            element={
              <PrivateRoute requiredRole="admin">
                <AdminLayout>
                  {/* Order Detail Page - TODO: Create */}
                </AdminLayout>
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/products"
            element={
              <PrivateRoute requiredRole="admin">
                <AdminLayout>
                  <ProductManagement />
                </AdminLayout>
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/products/add"
            element={
              <PrivateRoute requiredRole="admin">
                <AdminLayout>
                  <AddEditProductPage />
                </AdminLayout>
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/products/:id/edit"
            element={
              <PrivateRoute requiredRole="admin">
                <AdminLayout>
                  <AddEditProductPage />
                </AdminLayout>
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/inventory"
            element={
              <PrivateRoute requiredRole="admin">
                <AdminLayout>
                  <InventoryManagementPage />
                </AdminLayout>
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/customers"
            element={
              <PrivateRoute requiredRole="admin">
                <AdminLayout>
                  <CustomerManagementPage />
                </AdminLayout>
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/customers/:id"
            element={
              <PrivateRoute requiredRole="admin">
                <AdminLayout>
                  {/* Customer Detail Page - TODO: Create */}
                </AdminLayout>
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/settings"
            element={
              <PrivateRoute requiredRole="admin">
                <AdminLayout>
                  <AdminSettingsPage />
                </AdminLayout>
              </PrivateRoute>
            }
          />

          {/* ===== FALLBACK ROUTES ===== */}

          {/* 404 Not Found - Must be last */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;