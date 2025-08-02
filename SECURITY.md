# 🔐 Portfolio Security Guide

This guide explains how to secure your portfolio application and protect it from unauthorized access.

## 🚨 Security Issues Addressed

### **Before Security Implementation:**
- ❌ Anyone with GitHub repo access could modify your live database
- ❌ Dashboard had no authentication protection
- ❌ Database credentials were exposed in public repository
- ❌ No access control for admin operations

### **After Security Implementation:**
- ✅ Dashboard requires authentication to access
- ✅ Only authorized admin users can modify content
- ✅ Environment variables properly configured
- ✅ Row-level security policies in place
- ✅ Session management with secure tokens

## 🔧 Setup Instructions

### **1. Environment Configuration**

1. **Copy the example environment file:**
   ```bash
   cp .env.example .env.local
   ```

2. **Update `.env.local` with your credentials:**
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   VITE_ADMIN_EMAIL=your-admin-email@example.com
   ```

3. **Add `.env.local` to `.gitignore`** (already done):
   ```gitignore
   .env.local
   .env.production
   ```

### **2. Supabase Authentication Setup**

1. **Enable Email Authentication in Supabase:**
   - Go to Supabase Dashboard → Authentication → Settings
   - Enable "Email" provider
   - Configure email templates if needed

2. **Create Admin User:**
   - Go to Supabase Dashboard → Authentication → Users
   - Click "Invite a user"
   - Enter your admin email address
   - Complete the signup process

3. **Update Admin Email in Code:**
   - Open `src/contexts/AuthContext.tsx`
   - Update the `ADMIN_EMAIL` constant to your email:
   ```tsx
   const ADMIN_EMAIL = 'your-admin-email@example.com';
   ```

### **3. Database Security (Row Level Security)**

Run this SQL in your Supabase SQL Editor to enable RLS:

```sql
-- Enable Row Level Security on all tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE personal_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated admin users only
-- Replace 'your-admin-email@example.com' with your actual admin email

-- Projects policies
CREATE POLICY "Admin can view projects" ON projects FOR SELECT USING (auth.jwt() ->> 'email' = 'your-admin-email@example.com');
CREATE POLICY "Admin can insert projects" ON projects FOR INSERT WITH CHECK (auth.jwt() ->> 'email' = 'your-admin-email@example.com');
CREATE POLICY "Admin can update projects" ON projects FOR UPDATE USING (auth.jwt() ->> 'email' = 'your-admin-email@example.com');
CREATE POLICY "Admin can delete projects" ON projects FOR DELETE USING (auth.jwt() ->> 'email' = 'your-admin-email@example.com');

-- Public read access for portfolio display
CREATE POLICY "Public can view active projects" ON projects FOR SELECT USING (active = true);

-- Repeat similar policies for other tables...
-- (You can customize these based on your security requirements)
```

## 🛡️ Security Features

### **Authentication System**
- **Email/Password Login:** Secure authentication via Supabase Auth
- **Session Management:** Automatic token refresh and session handling
- **Admin-Only Access:** Only specified admin email can access dashboard
- **Auto Logout:** Sessions expire for security

### **Route Protection**
- **Protected Dashboard:** `/dashboard` requires authentication
- **Public Portfolio:** `/` remains publicly accessible
- **Redirect Logic:** Unauthorized users redirected to login
- **Loading States:** Proper loading indicators during auth checks

### **Database Security**
- **Row Level Security:** Database-level access control
- **Admin Policies:** Only admin users can modify data
- **Public Read Access:** Portfolio content remains publicly readable
- **Secure Connections:** All database connections use secure protocols

## 🚀 Deployment Security

### **Environment Variables**
Never commit these files to Git:
- `.env.local` (development)
- `.env.production` (production)
- Any file containing actual credentials

### **Production Deployment**
1. **Set environment variables** in your hosting platform:
   - Netlify: Site Settings → Environment Variables
   - Vercel: Project Settings → Environment Variables
   - Other platforms: Check their documentation

2. **Use different Supabase projects** for development and production
3. **Enable additional security features** in production:
   - HTTPS only
   - CORS restrictions
   - Rate limiting

## 🔑 Admin Access

### **How to Access Dashboard:**
1. Visit: `https://your-domain.com/dashboard`
2. Enter your admin email and password
3. Click "Sign In"
4. You'll be redirected to the dashboard

### **If You Forget Password:**
1. Go to Supabase Dashboard → Authentication → Users
2. Find your user and click "Send recovery email"
3. Follow the reset password link in your email

### **Adding Additional Admins:**
1. Update the `ADMIN_EMAIL` constant to include multiple emails:
   ```tsx
   const ADMIN_EMAILS = ['admin1@example.com', 'admin2@example.com'];
   const isAdmin = ADMIN_EMAILS.includes(user?.email || '');
   ```

## 🧪 Testing Security

### **Test Authentication:**
1. Try accessing `/dashboard` without logging in → Should show login page
2. Try logging in with wrong credentials → Should show error
3. Try logging in with non-admin email → Should show "Access Denied"
4. Log in with admin email → Should access dashboard

### **Test Database Security:**
1. Try accessing Supabase directly without auth → Should be restricted
2. Test all CRUD operations in dashboard → Should work for admin
3. Verify public portfolio still loads → Should work without auth

## 📋 Security Checklist

- [ ] Environment variables configured
- [ ] Admin user created in Supabase
- [ ] Admin email updated in code
- [ ] Row Level Security enabled
- [ ] Database policies created
- [ ] Authentication tested
- [ ] Dashboard access tested
- [ ] Public portfolio still accessible
- [ ] Environment files added to .gitignore
- [ ] Production environment variables set

## 🆘 Troubleshooting

### **Can't Access Dashboard:**
- Check if admin email matches exactly
- Verify Supabase authentication is enabled
- Check browser console for errors

### **Database Errors:**
- Ensure RLS policies are created correctly
- Check if admin email in policies matches your actual email
- Verify Supabase credentials are correct

### **Environment Issues:**
- Ensure `.env.local` file exists and has correct format
- Restart development server after changing environment variables
- Check that environment variables are properly loaded

## 🔒 Best Practices

1. **Never commit credentials** to version control
2. **Use strong passwords** for admin accounts
3. **Regularly update dependencies** for security patches
4. **Monitor access logs** in Supabase dashboard
5. **Use HTTPS** in production
6. **Implement rate limiting** for API calls
7. **Regular security audits** of your application

---

Your portfolio is now secure! Only authorized administrators can access the dashboard and modify content, while the public portfolio remains accessible to everyone.
