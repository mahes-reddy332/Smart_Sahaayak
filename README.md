# SmartSahaayak - Your Digital Business Partner

A comprehensive business management application built for Indian shopkeepers and small business owners, featuring Supabase-powered real-time data sync and RevenueCat-powered subscription management.

## Features

### Free Features
- 📦 **Inventory Management** - Track stock levels and get low-stock alerts
- 🛒 **Sales Logging** - Record sales quickly and efficiently
- 🧾 **Billing & Receipts** - Generate and print professional receipts
- 👥 **Contact Management** - Manage suppliers and customers
- ⏰ **Manual Reminders** - Set up important business reminders
- 📊 **Basic Reports** - Download CSV reports of your sales data

### Premium Features (RevenueCat Powered)
- 📈 **Advanced Analytics** - Detailed profit/loss analysis and trends
- 📊 **Monthly Trend Graphs** - Visual representation of your business performance
- 🏆 **Top 5 Products Analysis** - Identify your best-selling items
- 💡 **Smart Business Tips** - AI-powered suggestions to grow your business
- 📄 **PDF Report Downloads** - Professional business reports
- 🔔 **Automated Reminders** - Smart notifications for important tasks
- 🎯 **Priority Support** - Get help when you need it most

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Database**: Supabase (PostgreSQL with real-time subscriptions)
- **Authentication**: Supabase Auth with email/password
- **Payments**: RevenueCat (Cross-platform subscription management)
- **State Management**: React Context API + Supabase real-time sync
- **Styling**: Tailwind CSS with custom Indian-themed design
- **Icons**: Lucide React
- **Charts**: Recharts
- **Deployment**: Netlify
- **Built with**: [Bolt.new](https://bolt.new) AI-powered development

## RevenueCat Integration

This application uses RevenueCat for subscription management, providing:

- ✅ **Cross-platform subscriptions** - Works on web, mobile, and desktop
- ✅ **Automatic subscription management** - Handles renewals, cancellations, and upgrades
- ✅ **Secure payment processing** - PCI compliant with multiple payment methods
- ✅ **Real-time subscription status** - Instant updates across all devices
- ✅ **Purchase restoration** - Users can restore purchases on new devices
- ✅ **Analytics and insights** - Detailed subscription analytics in RevenueCat dashboard

### Setting up RevenueCat

1. **Create a RevenueCat account** at [app.revenuecat.com](https://app.revenuecat.com)
2. **Get your API keys** from the RevenueCat dashboard
3. **Configure your subscription products** in RevenueCat
4. **Set up your environment variables**:

```bash
VITE_REVENUECAT_API_KEY=your_revenuecat_public_api_key
```

### RevenueCat Configuration Steps

1. **Create an App** in RevenueCat dashboard
2. **Add Products** (e.g., monthly/yearly subscriptions)
3. **Create Offerings** to group your products
4. **Configure Entitlements** (e.g., "pro" features)
5. **Get your Public API Key** from Project Settings
6. **Add the API key** to your environment variables

### Subscription Products

Configure these products in your RevenueCat dashboard:
- **Monthly Pro**: ₹99/month
- **Yearly Pro**: ₹999/year (Save 2 months!)

## Supabase Integration

This application uses Supabase for:

- ✅ **Real-time Database** - PostgreSQL with instant sync
- ✅ **User Authentication** - Secure email/password auth
- ✅ **Row Level Security** - Data isolation per user
- ✅ **Real-time Subscriptions** - Live data updates
- ✅ **Automatic Backups** - Enterprise-grade data protection
- ✅ **Global CDN** - Fast data access worldwide

### Database Schema

The app uses these main tables:
- **users** - User profiles and business information
- **inventory** - Product inventory with cost/selling prices
- **sales** - Sales transactions with profit tracking
- **contacts** - Supplier and customer information
- **reminders** - Business tasks and follow-ups

All tables have Row Level Security (RLS) enabled to ensure users can only access their own data.

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd smartsahaayak
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Copy your project URL and anon key
   - Update `.env` with your Supabase credentials

4. **Set up RevenueCat**
   - Create an account at [app.revenuecat.com](https://app.revenuecat.com)
   - Create your app and configure subscription products
   - Get your Public API Key
   - Update `.env` with your RevenueCat API key:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# RevenueCat Configuration
VITE_REVENUECAT_API_KEY=your_revenuecat_public_api_key
```

5. **Configure Supabase Authentication URLs** ⚠️ **IMPORTANT**
   
   **This step is crucial for authentication to work properly:**
   
   - Go to your Supabase project dashboard
   - Navigate to **Authentication** → **URL Configuration**
   - Set the **Site URL** to your deployed application's URL:
     - For development: `http://localhost:5173`
     - For production: `https://your-app-name.netlify.app` (replace with your actual domain)
   - Add **Redirect URLs** (add all possible URLs your app might use):
     - `http://localhost:5173`
     - `http://localhost:5173/`
     - `http://localhost:5173/dashboard`
     - `https://your-app-name.netlify.app`
     - `https://your-app-name.netlify.app/`
     - `https://your-app-name.netlify.app/dashboard`

6. **Run database migrations**
   - Go to your Supabase dashboard
   - Navigate to SQL Editor
   - Run the migration files from `supabase/migrations/`

7. **Start the development server**
   ```bash
   npm run dev
   ```

8. **Build for production**
   ```bash
   npm run build
   ```

## RevenueCat Product Configuration

In your RevenueCat dashboard, create these products:

### Products
1. **smartsahaayak_pro_monthly**
   - Type: Subscription
   - Duration: 1 month
   - Price: ₹99

2. **smartsahaayak_pro_yearly**
   - Type: Subscription
   - Duration: 1 year
   - Price: ₹999

### Entitlements
1. **pro**
   - Description: Premium features access
   - Attach to both monthly and yearly products

### Offerings
1. **default**
   - Add both monthly and yearly packages
   - Set monthly as default

## Payment Flow

1. **User clicks "Upgrade to Pro"**
2. **RevenueCat payment modal opens**
3. **User selects subscription plan** (monthly/yearly)
4. **RevenueCat handles payment processing**
5. **Subscription status updates in real-time**
6. **Premium features are unlocked immediately**
7. **User can restore purchases on other devices**

## Troubleshooting

### RevenueCat Issues

1. **"RevenueCat not initialized"**
   - Check that `VITE_REVENUECAT_API_KEY` is set correctly
   - Ensure you're using the Public API Key, not the Secret Key
   - Verify the API key is from the correct project

2. **"No products available"**
   - Configure products in RevenueCat dashboard
   - Create offerings and attach products
   - Ensure products are active and properly configured

3. **Payment fails**
   - Check browser console for detailed error messages
   - Verify products are configured correctly in RevenueCat
   - Test with RevenueCat's test mode first

### Supabase Authentication Issues

If you're experiencing "Invalid login credentials" errors, see the `SUPABASE_AUTH_FIX.md` file for detailed troubleshooting steps.

## Language Support

The application supports both English and Hindi (हिंदी) languages, making it accessible to a wider range of Indian business owners.

## Design Philosophy

SmartSahaayak follows Indian design principles with:
- 🇮🇳 **Indian Flag Colors**: Saffron (#FF9933), White (#FFFFFF), Green (#138808)
- 🎨 **Modern UI/UX**: Clean, intuitive interface with smooth animations
- 📱 **Mobile-First**: Responsive design that works on all devices
- ♿ **Accessibility**: WCAG compliant with proper contrast ratios
- 🚀 **Performance**: Optimized for fast loading and smooth interactions

## Data Security & Privacy

- **Row Level Security**: Each user can only access their own data
- **Real-time Sync**: Changes are instantly reflected across all devices
- **Automatic Backups**: Supabase handles all data backups
- **GDPR Compliant**: Built with privacy-first principles
- **Secure Payments**: RevenueCat handles all payment processing securely

## Real-time Features

- **Live Inventory Updates**: Stock changes sync instantly
- **Real-time Sales Tracking**: See sales as they happen
- **Instant Notifications**: Get alerts for low stock and reminders
- **Multi-device Sync**: Access your data from anywhere
- **Subscription Status**: Real-time premium feature access

## Contributing

We welcome contributions! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Support

For support, email support@smartsahaayak.com or join our WhatsApp support at +91-9876543210.

---

**Built with ❤️ in India using [Bolt.new](https://bolt.new), powered by Supabase and RevenueCat**