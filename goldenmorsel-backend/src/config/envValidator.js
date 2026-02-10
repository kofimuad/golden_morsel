/**
 * Validate that all required environment variables are set
 * Runs on server startup before anything else
 */
export const validateEnvironment = () => {
  console.log('\n🔍 Validating environment variables...\n');

  // Required environment variables
  const required = [
    'MONGODB_URI',
    'JWT_SECRET',
    'JWT_ADMIN_SECRET'
  ];

  // Optional but useful variables
  const optional = [
    'WHATSAPP_ACCESS_TOKEN',
    'WHATSAPP_PHONE_NUMBER_ID',
    'WHATSAPP_BUSINESS_ACCOUNT_ID',
    'WHATSAPP_VERIFY_TOKEN',
    'FRONTEND_URL',
    'EMAIL_HOST',
    'EMAIL_USER',
    'EMAIL_PASSWORD'
  ];

  // Check for missing required variables
  const missing = [];

  required.forEach(envVar => {
    if (!process.env[envVar]) {
      missing.push(envVar);
    }
  });

  // If any required variables are missing, exit
  if (missing.length > 0) {
    console.error('❌ CRITICAL: Missing required environment variables:\n');
    missing.forEach(v => {
      console.error(`   ❌ ${v}`);
    });
    console.error('\n📝 Please add these variables to your .env file');
    console.error('📖 See .env.example for reference\n');
    process.exit(1);
  }

  // Check for missing optional variables
  optional.forEach(envVar => {
    if (!process.env[envVar]) {
      console.warn(`⚠️  Optional: ${envVar} not set`);
    }
  });

  // ===== VALIDATE VALUE LENGTHS =====

  // JWT_SECRET must be at least 32 characters
  if (process.env.JWT_SECRET.length < 32) {
    console.error('❌ JWT_SECRET must be at least 32 characters long');
    console.error('   Current length:', process.env.JWT_SECRET.length);
    process.exit(1);
  }

  // JWT_ADMIN_SECRET must be at least 32 characters
  if (process.env.JWT_ADMIN_SECRET.length < 32) {
    console.error('❌ JWT_ADMIN_SECRET must be at least 32 characters long');
    console.error('   Current length:', process.env.JWT_ADMIN_SECRET.length);
    process.exit(1);
  }

  // ===== VALIDATE MONGODB_URI FORMAT =====

  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri.startsWith('mongodb://') && !mongoUri.startsWith('mongodb+srv://')) {
    console.error('❌ MONGODB_URI must start with mongodb:// or mongodb+srv://');
    console.error('   Current:', mongoUri.substring(0, 50) + '...');
    process.exit(1);
  }

  // ===== SUCCESS =====

  console.log('✅ All required environment variables validated\n');
  console.log('📊 Configuration Summary:');
  console.log('   ✓ Node Environment: ' + (process.env.NODE_ENV || 'development'));
  console.log('   ✓ Port: ' + (process.env.PORT || '5000'));
  console.log('   ✓ Database: ' + (mongoUri.includes('localhost') ? 'Local MongoDB' : 'MongoDB Atlas'));
  console.log('   ✓ JWT Secrets: ' + (process.env.JWT_SECRET ? 'Set (' + process.env.JWT_SECRET.length + ' chars)' : 'Not Set'));
  console.log('   ✓ WhatsApp Integration: ' + (process.env.WHATSAPP_ACCESS_TOKEN ? 'Configured' : 'Not Configured'));
  console.log('   ✓ Frontend URL: ' + (process.env.FRONTEND_URL || 'http://localhost:3000'));
  console.log('\n');
};