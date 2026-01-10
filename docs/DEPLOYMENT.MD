# 🚀 SerWebz Deployment Guide

Complete guide to deploying SerWebz to production.

**Deployment Options:**
1. **Quick Deploy** - Vercel (5 minutes, free)
2. **Professional Deploy** - AWS (30 minutes, $15-30/month)

---

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Option 1: Vercel (Recommended)](#option-1-vercel-recommended)
- [Option 2: AWS Professional Setup](#option-2-aws-professional-setup)
- [Domain Configuration](#domain-configuration)
- [SSL Certificate](#ssl-certificate)
- [Monitoring](#monitoring)
- [Backup Strategy](#backup-strategy)
- [Troubleshooting](#troubleshooting)

---

## 📦 Prerequisites

Before deploying, ensure you have:

✅ **GitHub Account** - Code repository  
✅ **Supabase Database** - Set up and populated  
✅ **Contentful CMS** - Content added  
✅ **Email configured** - Gmail app password  
✅ **Domain name** (optional) - e.g., serwebz.com  

---

## 🎯 Option 1: Vercel (Recommended)

**Best for:** Quick deployment, testing, small businesses  
**Cost:** FREE (hobby plan)  
**Time:** 5-10 minutes  
**Performance:** Excellent (global CDN)

### Step 1: Prepare Repository
```bash
# Make sure all changes are committed
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### Step 2: Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel

### Step 3: Import Project

1. Click **"Add New..."** → **"Project"**
2. Select your **serwebz** repository
3. Click **"Import"**

### Step 4: Configure Build Settings

**Framework Preset:** Next.js  
**Root Directory:** `frontend`  
**Build Command:** `pnpm build`  
**Output Directory:** `.next`  
**Install Command:** `pnpm install`

### Step 5: Add Environment Variables

Click **"Environment Variables"** and add these:
```env
# Contentful
NEXT_PUBLIC_CONTENTFUL_SPACE_ID=your_space_id
NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=your_access_token

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# Backend API (use your deployed backend URL)
NEXT_PUBLIC_API_URL=https://api.serwebz.com

# Analytics (optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Step 6: Deploy

1. Click **"Deploy"**
2. Wait 2-3 minutes
3. ✓ Done! Your site is live at: `https://serwebz.vercel.app`

### Step 7: Deploy Backend

**Option A: Vercel (Serverless Functions)**

1. Create new project for backend
2. Root Directory: `backend`
3. Framework: Other
4. Build Command: `pnpm build`
5. Output Directory: `dist`

**Option B: Railway (Recommended for Backend)**

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click **"New Project"** → **"Deploy from GitHub repo"**
4. Select **serwebz** repository
5. Root Directory: `backend`
6. Add environment variables
7. Deploy

**Railway Environment Variables:**
```env
NODE_ENV=production
PORT=3001
DATABASE_URL=your_supabase_connection_string
FRONTEND_URL=https://serwebz.vercel.app
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
SMTP_FROM=SerWebz <your_email@gmail.com>
NOTIFICATION_EMAIL=leofrancis6988@gmail.com
```

### Step 8: Update Frontend API URL

Go back to Vercel frontend project:
1. Settings → Environment Variables
2. Update `NEXT_PUBLIC_API_URL` to your Railway URL:
```
   NEXT_PUBLIC_API_URL=https://your-app.railway.app
```
3. Redeploy

### Step 9: Test Deployment

1. Visit your site: `https://serwebz.vercel.app`
2. Test contact form
3. Check portfolio loads from Contentful
4. Verify all pages work

**✓ Deployment Complete!**

---

## 🏢 Option 2: AWS Professional Setup

**Best for:** Production, scalability, full control  
**Cost:** $15-30/month  
**Time:** 30-60 minutes  
**Performance:** Excellent (customizable)

### Architecture Overview
```
┌─────────────────────────────────────────────┐
│              Route 53 (DNS)                 │
│           serwebz.com → CloudFront          │
└────────────────┬────────────────────────────┘
                 │
         ┌───────┴────────┐
         │                │
    ┌────▼────┐      ┌────▼────┐
    │CloudFront│      │   ALB   │
    │   CDN    │      │         │
    └────┬────┘      └────┬────┘
         │                │
    ┌────▼────┐      ┌────▼────┐
    │   S3    │      │   EC2   │
    │Frontend │      │Backend  │
    └─────────┘      └────┬────┘
                           │
                      ┌────▼────┐
                      │Supabase │
                      │Database │
                      └─────────┘
```

### Step 1: Setup S3 + CloudFront (Frontend)

**1.1 Build Frontend:**
```bash
cd frontend
pnpm build
```

**1.2 Create S3 Bucket:**
```bash
aws s3 mb s3://serwebz-frontend --region us-east-1
```

**1.3 Enable Static Website Hosting:**
```bash
aws s3 website s3://serwebz-frontend \
  --index-document index.html \
  --error-document 404.html
```

**1.4 Set Bucket Policy:**
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::serwebz-frontend/*"
    }
  ]
}
```

**1.5 Upload Build:**
```bash
aws s3 sync .next/static s3://serwebz-frontend/_next/static
aws s3 sync public s3://serwebz-frontend/
```

**1.6 Create CloudFront Distribution:**
```bash
aws cloudfront create-distribution \
  --origin-domain-name serwebz-frontend.s3.amazonaws.com \
  --default-root-object index.html
```

### Step 2: Setup EC2 (Backend)

**2.1 Launch EC2 Instance:**
- AMI: Ubuntu 22.04 LTS
- Instance Type: t3.micro (free tier)
- Security Group: Allow ports 22, 80, 443, 3001

**2.2 SSH into Instance:**
```bash
ssh -i "your-key.pem" ubuntu@your-ec2-ip
```

**2.3 Install Dependencies:**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install pnpm
npm install -g pnpm

# Install PM2 (process manager)
npm install -g pm2

# Install Nginx
sudo apt install -y nginx
```

**2.4 Clone Repository:**
```bash
git clone https://github.com/yourusername/serwebz.git
cd serwebz/backend
pnpm install
```

**2.5 Create Environment File:**
```bash
nano .env
```

Add production environment variables:
```env
NODE_ENV=production
PORT=3001
DATABASE_URL=your_supabase_url
FRONTEND_URL=https://serwebz.com
# ... (rest of variables)
```

**2.6 Build and Start:**
```bash
pnpm build
pm2 start dist/server.js --name serwebz-api
pm2 save
pm2 startup
```

**2.7 Configure Nginx:**
```bash
sudo nano /etc/nginx/sites-available/serwebz-api
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name api.serwebz.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable and restart:
```bash
sudo ln -s /etc/nginx/sites-available/serwebz-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 3: SSL Certificates (Let's Encrypt)
```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d serwebz.com -d www.serwebz.com -d api.serwebz.com

# Auto-renewal
sudo certbot renew --dry-run
```

### Step 4: Route 53 (DNS)

1. Go to AWS Route 53
2. Create Hosted Zone for `serwebz.com`
3. Create A records:
   - `serwebz.com` → CloudFront distribution
   - `www.serwebz.com` → CloudFront distribution
   - `api.serwebz.com` → EC2 Elastic IP

### Step 5: Test Production
```bash
# Test frontend
curl https://serwebz.com

# Test backend
curl https://api.serwebz.com/health

# Test contact form
curl -X POST https://api.serwebz.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","phone":"+911234567890","projectType":"basic","message":"Test message"}'
```

**✓ AWS Deployment Complete!**

---

## 🌐 Domain Configuration

### Buy Domain

**Recommended Registrars:**
- Namecheap (cheap, good support)
- Google Domains (simple)
- GoDaddy (popular)

**Cost:** $10-15/year for `.com`

### Point Domain to Vercel

1. Go to Vercel project settings
2. Click **"Domains"**
3. Add your domain: `serwebz.com`
4. Copy nameservers or DNS records
5. Add to your domain registrar
6. Wait 24-48 hours for propagation

### Point Domain to AWS

1. Copy Route 53 nameservers
2. Update at your domain registrar
3. Wait 24-48 hours

---

## 🔒 SSL Certificate

### Vercel (Automatic)
- Vercel auto-provisions SSL via Let's Encrypt
- Nothing to configure!

### AWS (Manual)
- Already configured with Certbot
- Auto-renews every 90 days

---

## 📊 Monitoring

### Vercel Analytics

1. Go to project settings
2. Enable **Vercel Analytics**
3. View at: `https://vercel.com/dashboard/analytics`

### Custom Monitoring

**Backend Health Check:**
```bash
# Create health endpoint
# backend/src/routes/health.ts
export default function(app) {
  app.get('/health', (req, res) => {
    res.json({
      status: 'healthy',
      timestamp: new Date(),
      uptime: process.uptime()
    });
  });
}
```

**Uptime Monitoring:**
- [UptimeRobot](https://uptimerobot.com) (free)
- [Pingdom](https://www.pingdom.com)

**Error Tracking:**
- [Sentry](https://sentry.io) (free tier)

---

## 💾 Backup Strategy

### Database Backups (Supabase)

Supabase auto-backs up daily on paid plans. For free tier:
```bash
# Manual backup
pg_dump $DATABASE_URL > backup-$(date +%Y%m%d).sql

# Restore
psql $DATABASE_URL < backup-20260111.sql
```

### Code Backups

- Code is on GitHub (automatically backed up)
- Tag releases: `git tag v1.0.0`

### Content Backups (Contentful)

- Export content monthly
- Contentful has version history

---

## 🐛 Troubleshooting

### Site Not Loading

1. Check DNS propagation: [whatsmydns.net](https://www.whatsmydns.net/)
2. Clear browser cache
3. Try incognito mode
4. Check Vercel/AWS logs

### 500 Errors

1. Check environment variables
2. View server logs:
```bash
   # Vercel
   vercel logs
   
   # AWS
   pm2 logs serwebz-api
```
3. Check database connection

### Contact Form Not Working

1. Verify backend is running
2. Check CORS settings
3. Test API directly with cURL
4. Check email credentials

### Images Not Loading

1. Check `next.config.js` domains
2. Verify Contentful images are published
3. Clear CloudFront/Vercel cache

---

## 🔄 Continuous Deployment

### Vercel (Auto)

- Push to `main` → Auto-deploys
- Push to `develop` → Preview deployment

### GitHub Actions (AWS)

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to AWS

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy Frontend
        run: |
          cd frontend
          npm run build
          aws s3 sync .next/static s3://serwebz-frontend/_next/static
      
      - name: Deploy Backend
        run: |
          ssh ubuntu@${{ secrets.EC2_HOST }} 'cd serwebz/backend && git pull && pnpm install && pnpm build && pm2 restart serwebz-api'
```

---

## 📈 Performance Optimization

### Frontend
```javascript
// next.config.js
module.exports = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  compress: true,
  swcMinify: true,
}
```

### Backend
```javascript
// Add compression
import compression from 'compression';
app.use(compression());

// Cache static assets
app.use(express.static('public', {
  maxAge: '1d',
  etag: true
}));
```

---

## 💰 Cost Breakdown

### Vercel + Railway (Recommended)

| Service | Plan | Cost |
|---------|------|------|
| Vercel Frontend | Hobby | FREE |
| Railway Backend | Starter | $5/month |
| Supabase Database | Free | FREE |
| Domain | .com | $12/year |
| **Total** | | **~$6/month** |

### AWS Professional

| Service | Usage | Cost |
|---------|-------|------|
| S3 | 10GB | $0.23/month |
| CloudFront | 50GB transfer | $4.25/month |
| EC2 t3.micro | 720 hours | $7.50/month |
| Route 53 | 1 hosted zone | $0.50/month |
| Domain | .com | $12/year |
| **Total** | | **~$13/month** |

---

## 📞 Support

**Issues?** Contact:
- Email: leofrancis6988@gmail.com
- Phone: +91 7499216988

---

<div align="center">

**🎉 Congratulations! Your Site is Live!**

[Back to Main README](../README.md)

</div>