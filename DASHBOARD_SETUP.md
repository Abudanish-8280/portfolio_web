# Portfolio Dashboard Setup Guide

## 🚀 Quick Start

Your portfolio dashboard is now ready! Follow these steps to get it running:

### 1. Supabase Setup

1. **Create a Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Click "New Project"
   - Choose your organization and create the project

2. **Run the Database Schema**
   - Go to your Supabase dashboard
   - Navigate to "SQL Editor"
   - Copy and paste the contents of `supabase-schema.sql`
   - Click "Run" to create all tables and sample data

3. **Get Your Credentials**
   - Go to "Settings" → "API"
   - Copy your `Project URL` and `anon/public key`

### 2. Configure Your App

1. **Update Supabase Configuration**
   ```typescript
   // src/lib/supabase.ts
   const supabaseUrl = 'YOUR_SUPABASE_PROJECT_URL'
   const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY'
   ```

2. **Add Dashboard Route**
   ```typescript
   // Add to your main App.tsx or routing configuration
   import DashboardPage from './pages/DashboardPage'
   
   // Add route: /dashboard → <DashboardPage />
   ```

### 3. Access Your Dashboard

1. **Start your development server**
   ```bash
   npm run dev
   ```

2. **Navigate to the dashboard**
   ```
   http://localhost:5173/dashboard
   ```

## 📊 Dashboard Features

### ✅ **Overview Page**
- Portfolio statistics and metrics
- Recent activity feed
- Quick action buttons
- Portfolio health indicators

### ✅ **Projects Manager**
- Add/Edit/Delete projects
- Upload project images
- Manage technologies and categories
- Set featured projects
- Live preview links

### ✅ **Testimonials Manager**
- Add/Edit/Delete client testimonials
- Star ratings system
- Client avatar management
- Project association

### ✅ **Skills Manager**
- Organize skills by category
- Set proficiency levels (0-100%)
- Visual progress bars
- Technology icons

### ✅ **Personal Info Manager**
- Update bio and contact information
- Social media links
- Resume/CV URL
- Professional title and location

### ✅ **Settings**
- Database configuration
- Portfolio sync settings
- Backup and export options

## 🗄️ Database Schema

The dashboard uses these Supabase tables:

- **`projects`** - Portfolio projects with technologies and categories
- **`testimonials`** - Client testimonials with ratings
- **`skills`** - Technical skills with proficiency levels
- **`personal_info`** - Personal and contact information

## 🔧 Customization

### Adding New Categories
```typescript
// ProjectsManager.tsx
const categories = ['All', 'Shopify', 'WordPress', 'WooCommerce', 'Angular', 'React', 'Vue.js']

// SkillsManager.tsx  
const categories = ['Frontend', 'Backend', 'Database', 'Tools & Platforms', 'Design', 'Mobile']
```

### Styling
The dashboard uses your existing Tailwind CSS configuration and gradient theme:
- `bg-gradient-custom` - Your custom gradient background
- `bg-text-gradient` - Gradient text effect
- `card` - Card component styling
- `hover-lift` - Hover animation effect

## 🚨 Troubleshooting

### Common Issues

1. **"Cannot connect to Supabase"**
   - Check your URL and API key in `src/lib/supabase.ts`
   - Ensure your Supabase project is active

2. **"Table doesn't exist"**
   - Run the SQL schema in Supabase SQL Editor
   - Check table names match exactly

3. **"Permission denied"**
   - Disable Row Level Security for development
   - Or create appropriate policies for your use case

### Database Connection Test
```typescript
// Test in browser console
import { supabase } from './src/lib/supabase'
const { data, error } = await supabase.from('projects').select('*')
console.log({ data, error })
```

## 🔐 Security Notes

- The dashboard is currently configured for development
- For production, implement proper authentication
- Consider enabling Row Level Security (RLS) in Supabase
- Use environment variables for sensitive credentials

## 📱 Mobile Responsive

The dashboard is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🎨 Theme Integration

The dashboard seamlessly integrates with your portfolio's design:
- Same gradient color scheme
- Consistent typography (Playfair Display + Inter)
- Matching dark theme
- Smooth animations and transitions

## 🚀 Next Steps

1. **Set up your Supabase project**
2. **Configure the credentials**
3. **Add the dashboard route**
4. **Start managing your portfolio content!**

Your dashboard is now ready to use. You can manage all your portfolio content dynamically without touching code!
