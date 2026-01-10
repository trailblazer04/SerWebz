# 🔧 Troubleshooting Guide

Common issues and solutions for SerWebz.

## Frontend Issues

### 1. Module Not Found Errors

**Error:**
```
Module not found: Can't resolve '@/components/...'
```

**Solutions:**
```bash
# 1. Reinstall dependencies
rm -rf node_modules .next
pnpm install

# 2. Check tsconfig.json has:
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}

# 3. Restart dev server
pnpm dev
```

### 2. Tailwind Classes Not Working

**Error:** Classes don't apply styling

**Solutions:**
```bash
# 1. Check tailwind.config.ts has:
content: [
  './app/**/*.{js,ts,jsx,tsx}',
  './components/**/*.{js,ts,jsx,tsx}',
]

# 2. Restart dev server
# 3. Clear .next folder
rm -rf .next
```

### 3. Images Not Loading

**Error:** Next/Image shows broken image

**Solutions:**
```javascript
// next.config.js - Add domains
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'images.unsplash.com',
    },
    {
      protocol: 'https',
      hostname: '*.supabase.co',
    },
  ],
}
```

## Backend Issues

### 1. Database Connection Failed

**Error:**
```
Error: P1001: Can't reach database server
```

**Solutions:**
```bash
# 1. Check DATABASE_URL in .env
echo $DATABASE_URL

# 2. Test connection
npx prisma studio

# 3. Regenerate Prisma client
npx prisma generate

# 4. Check Supabase is running
curl https://your-project.supabase.co
```

### 2. Email Not Sending

**Error:** Contact form submits but no email received

**Solutions:**
```bash
# 1. Check Gmail app password (not regular password)
# 2. Enable "Less secure app access"
# 3. Check SMTP settings:
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false

# 4. Test email manually:
node -e "require('./src/services/emailService').sendContactEmail({...})"
```

### 3. CORS Errors

**Error:**
```
Access to fetch has been blocked by CORS policy
```

**Solutions:**
```javascript
// backend/src/server.ts
import cors from 'cors';

app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://serwebz.vercel.app',
    'https://serwebz.com'
  ]
}));
```

## Deployment Issues

### 1. Vercel Build Fails

**Error:** Build fails on Vercel

**Solutions:**
1. Check build works locally: `pnpm build`
2. Check all environment variables are set
3. View Vercel logs for specific error
4. Check Node.js version matches

### 2. Environment Variables Not Working

**Error:** Variables are undefined

**Solutions:**
```bash
# Frontend variables must start with NEXT_PUBLIC_
NEXT_PUBLIC_API_URL=...

# Restart after adding variables
# Redeploy on Vercel
```

### 3. SSL Certificate Issues

**Error:** Site shows "Not Secure"

**Solutions:**
1. Wait 24 hours for DNS propagation
2. Check domain is correctly pointed
3. Force SSL renewal: `sudo certbot renew --force-renewal`

## Common Questions

### Q: How do I reset the database?
```bash
cd backend
npx prisma migrate reset
npx prisma migrate dev
```

### Q: How do I clear the cache?
```bash
# Frontend
rm -rf .next
pnpm dev

# Browser
Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
```

### Q: How do I update dependencies?
```bash
# Check outdated packages
pnpm outdated

# Update all
pnpm update

# Update specific package
pnpm update next@latest
```

---

**Still stuck?** Email: leofrancis6988@gmail.com

[Back to Main README](../README.md)
```

---

## 📁 Final Documentation Structure

Your `docs/` folder should look like this:
```
docs/
├── API.md                    # API reference
├── CONTENTFUL-SETUP.md       # CMS setup guide
├── DEPLOYMENT.md             # Deployment guide
├── TECH-STACK.md             # Technology overview
├── TROUBLESHOOTING.md        # Common issues
└── postman/                  # API testing (optional)
    └── SerWebz-API.json