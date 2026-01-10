# 🎨 Contentful CMS Setup Guide

Complete guide to setting up Contentful CMS for SerWebz.

**Time Required:** 30-45 minutes  
**Difficulty:** Intermediate  
**Cost:** Free (up to 10,000 records)

---

## 📋 Table of Contents

- [Why Contentful?](#why-contentful)
- [Account Setup](#account-setup)
- [Content Model](#content-model)
- [Creating Content](#creating-content)
- [API Integration](#api-integration)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)

---

## 🤔 Why Contentful?

**Contentful** is a headless CMS that allows you to:

✅ **Manage content easily** - No code needed to update projects, testimonials  
✅ **Collaborate** - Multiple team members can edit content  
✅ **Preview changes** - See updates before publishing  
✅ **Version control** - Roll back to previous versions  
✅ **API-first** - Built for modern web development  
✅ **Free tier** - Perfect for small businesses  

**Alternatives:** Strapi, Sanity, WordPress (with REST API)

---

## 🚀 Account Setup

### Step 1: Create Account

1. Go to [contentful.com](https://www.contentful.com/)
2. Click **"Get started"**
3. Sign up with email or GitHub
4. Verify your email

### Step 2: Create Space

1. Click **"Create space"**
2. Choose **"Free"** plan
3. Name your space: **"SerWebz"**
4. Click **"Create space"**

**✓ Checkpoint:** You should see your space dashboard

---

## 🏗️ Content Model

Now we'll create the content types for portfolio projects and testimonials.

### Content Type 1: Portfolio Project

**Purpose:** Store portfolio project information

1. Go to **Content model** in sidebar
2. Click **"Add content type"**
3. Name: `Portfolio Project`
4. API Identifier: `portfolioProject`
5. Click **"Create"**

**Add these fields:**

#### Field 1: Title
- Type: **Short text**
- Name: `Title`
- Field ID: `title`
- ✅ Required
- ✅ Use as display field

#### Field 2: Slug
- Type: **Short text**
- Name: `Slug`
- Field ID: `slug`
- ✅ Required
- Help text: "URL-friendly version (e.g., coastal-cafe)"

#### Field 3: Category
- Type: **Short text**
- Name: `Category`
- Field ID: `category`
- Options: Restaurant, Hotel, Travel, Retail, E-commerce

#### Field 4: Short Description
- Type: **Short text**
- Name: `Short Description`
- Field ID: `shortDescription`
- ✅ Required
- Max length: 200 characters

#### Field 5: Full Description
- Type: **Long text**
- Name: `Full Description`
- Field ID: `fullDescription`
- Markdown enabled

#### Field 6: Featured Image
- Type: **Media (single)**
- Name: `Featured Image`
- Field ID: `featuredImage`
- ✅ Required
- Validation: Only images

#### Field 7: Gallery
- Type: **Media (multiple)**
- Name: `Gallery`
- Field ID: `gallery`
- Validation: Only images

#### Field 8: Client Name
- Type: **Short text**
- Name: `Client Name`
- Field ID: `clientName`
- ✅ Required

#### Field 9: Project Date
- Type: **Date**
- Name: `Project Date`
- Field ID: `projectDate`

#### Field 10: Results
- Type: **JSON Object**
- Name: `Results`
- Field ID: `results`
- Example value:
```json
[
  {
    "metric": "Increased Bookings",
    "value": "+45%"
  },
  {
    "metric": "Development Time",
    "value": "2 weeks"
  }
]
```

#### Field 11: Technologies
- Type: **Short text (list)**
- Name: `Technologies`
- Field ID: `technologies`
- Example: Next.js, Tailwind CSS, PostgreSQL

#### Field 12: Live URL
- Type: **Short text**
- Name: `Live URL`
- Field ID: `liveUrl`
- Validation: URL format

#### Field 13: Featured
- Type: **Boolean**
- Name: `Featured`
- Field ID: `featured`
- Default: false

**✓ Checkpoint:** Save content type

---

### Content Type 2: Testimonial

**Purpose:** Store client testimonials

1. Go to **Content model**
2. Click **"Add content type"**
3. Name: `Testimonial`
4. API Identifier: `testimonial`
5. Click **"Create"**

**Add these fields:**

#### Field 1: Client Name
- Type: **Short text**
- Name: `Client Name`
- Field ID: `clientName`
- ✅ Required
- ✅ Use as display field

#### Field 2: Client Role
- Type: **Short text**
- Name: `Client Role`
- Field ID: `clientRole`
- Example: "Owner", "CEO", "Manager"

#### Field 3: Client Company
- Type: **Short text**
- Name: `Client Company`
- Field ID: `clientCompany`
- ✅ Required

#### Field 4: Testimonial Text
- Type: **Long text**
- Name: `Testimonial Text`
- Field ID: `testimonialText`
- ✅ Required
- Max length: 500 characters

#### Field 5: Rating
- Type: **Integer**
- Name: `Rating`
- Field ID: `rating`
- ✅ Required
- Min: 1, Max: 5
- Default: 5

#### Field 6: Client Photo
- Type: **Media (single)**
- Name: `Client Photo`
- Field ID: `clientPhoto`
- Validation: Only images

#### Field 7: Featured
- Type: **Boolean**
- Name: `Featured`
- Field ID: `featured`
- Default: false

**✓ Checkpoint:** Save content type

---

## 📝 Creating Content

### Add Portfolio Projects

1. Go to **Content** in sidebar
2. Click **"Add entry"** → **"Portfolio Project"**
3. Fill in all fields:

**Example Project 1: Coastal Café**
```
Title: Coastal Café Website
Slug: coastal-cafe
Category: Restaurant
Short Description: Modern restaurant website with online reservations and dynamic menu system.
Full Description: [Detailed project description]
Featured Image: [Upload restaurant image]
Client Name: Coastal Café
Project Date: 2025-10-15
Results:
[
  {"metric": "Increased Bookings", "value": "+45%"},
  {"metric": "Development Time", "value": "2 weeks"}
]
Technologies: Next.js, Tailwind CSS, Supabase
Live URL: https://coastalcafe.example.com
Featured: true
```

4. Click **"Publish"**
5. Repeat for 2-3 more projects

**Example Project 2: Adventure Tours**
```
Title: Adventure Tours Platform
Slug: adventure-tours
Category: Travel
Short Description: Comprehensive tour operator website with booking system.
[Continue filling fields...]
```

---

### Add Testimonials

1. Go to **Content**
2. Click **"Add entry"** → **"Testimonial"**
3. Fill in fields:

**Example Testimonial 1:**
```
Client Name: Priya Reddy
Client Role: Owner
Client Company: Spice Garden Restaurant
Testimonial Text: "Working with SerWebz was a game-changer for our restaurant. Our online bookings increased by 40% within the first month. The website is beautiful, fast, and exactly what we needed!"
Rating: 5
Featured: true
```

4. Click **"Publish"**
5. Add 2-3 more testimonials

---

## 🔌 API Integration

### Step 1: Get API Keys

1. Go to **Settings** → **API keys**
2. Click **"Add API key"**
3. Name it: `SerWebz Frontend`
4. Copy these values:
   - **Space ID**: `xxxxxxxxxxxxx`
   - **Content Delivery API - access token**: `yyyyyyyyyyyyyyyy`

### Step 2: Add to Environment Variables

**File:** `frontend/.env.local`
```env
NEXT_PUBLIC_CONTENTFUL_SPACE_ID=your_space_id_here
NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=your_access_token_here
NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN=your_preview_token_here
```

### Step 3: Test Connection

**File:** `frontend/lib/contentful.ts`

Already created! Just verify it works:
```bash
cd frontend
pnpm dev
# Visit http://localhost:3000
# Portfolio and testimonials should load from Contentful
```

---

## 🧪 Testing

### Test 1: Fetch Projects
```bash
curl -X GET \
  "https://cdn.contentful.com/spaces/YOUR_SPACE_ID/entries?access_token=YOUR_TOKEN&content_type=portfolioProject"
```

**Expected:** JSON response with your projects

### Test 2: Fetch Testimonials
```bash
curl -X GET \
  "https://cdn.contentful.com/spaces/YOUR_SPACE_ID/entries?access_token=YOUR_TOKEN&content_type=testimonial"
```

**Expected:** JSON response with your testimonials

### Test 3: Frontend Integration

1. Start frontend: `pnpm dev`
2. Visit: http://localhost:3000
3. Scroll to Portfolio section
4. **Expected:** See 3 projects from Contentful
5. Scroll to Testimonials
6. **Expected:** See 3 testimonials from Contentful

---

## 🐛 Troubleshooting

### Projects Not Showing

**Problem:** Portfolio section shows mock data instead of Contentful data

**Solution:**
1. Check environment variables are set correctly
2. Restart dev server
3. Check Space ID and Access Token are correct
4. Ensure projects are **Published** in Contentful (not just saved)

### "Unauthorized" Error

**Problem:** API returns 401 Unauthorized

**Solution:**
- Verify Access Token is for **Content Delivery API** (not Preview API)
- Check token hasn't expired
- Regenerate token if needed

### Images Not Loading

**Problem:** Project images show broken

**Solution:**
1. In `next.config.js`, add Contentful domains:
```javascript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'images.ctfassets.net',
    },
    {
      protocol: 'https',
      hostname: 'downloads.ctfassets.net',
    },
  ],
}
```
2. Restart dev server

### Slow API Responses

**Problem:** Content loads slowly

**Solution:**
- Enable ISR (Incremental Static Regeneration)
- Set revalidation time to 3600 seconds (1 hour)
- Already configured in `app/page.tsx`

---

## 🎯 Best Practices

### Content Entry

✅ **DO:**
- Use descriptive slugs (e.g., `coastal-cafe`, not `project1`)
- Optimize images before upload (< 500KB)
- Write clear, concise descriptions
- Mark best projects as "Featured"
- Keep testimonials under 150 words

❌ **DON'T:**
- Use spaces in slugs
- Upload huge images (> 2MB)
- Leave required fields empty
- Publish unfinished content

### Content Organization

- **Tags:** Use tags to categorize projects (e.g., #hospitality, #ecommerce)
- **Folders:** Create folders for different content types
- **Versions:** Use versions to track changes
- **Workflow:** Use workflow states (Draft → Review → Published)

---

## 📊 Content Model Diagram
```
┌─────────────────────────────────────┐
│      Portfolio Project              │
├─────────────────────────────────────┤
│ • Title (text)                      │
│ • Slug (text)                       │
│ • Category (text)                   │
│ • Short Description (text)          │
│ • Full Description (markdown)       │
│ • Featured Image (media)            │
│ • Gallery (media[])                 │
│ • Client Name (text)                │
│ • Project Date (date)               │
│ • Results (json)                    │
│ • Technologies (text[])             │
│ • Live URL (text)                   │
│ • Featured (boolean)                │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│         Testimonial                 │
├─────────────────────────────────────┤
│ • Client Name (text)                │
│ • Client Role (text)                │
│ • Client Company (text)             │
│ • Testimonial Text (text)           │
│ • Rating (integer: 1-5)             │
│ • Client Photo (media)              │
│ • Featured (boolean)                │
└─────────────────────────────────────┘
```

---

## 🔄 Updating Content

### To Update a Project

1. Go to **Content**
2. Find the project
3. Click to edit
4. Make changes
5. Click **"Publish changes"**
6. Frontend updates automatically (within 1 hour due to ISR)

### To Add New Project

1. Click **"Add entry"** → **"Portfolio Project"**
2. Fill all required fields
3. Upload images
4. Click **"Publish"**

---

## 📞 Support

**Need help?**
- Contentful Documentation: [contentful.com/developers/docs](https://www.contentful.com/developers/docs/)
- SerWebz Support: leofrancis6988@gmail.com

---

<div align="center">

**Contentful Setup Complete! 🎉**

Next: [Deploy to Production](DEPLOYMENT.md)

[Back to Main README](../README.md)

</div>