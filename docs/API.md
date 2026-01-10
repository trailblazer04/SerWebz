# 🔌 SerWebz API Documentation

Complete API reference for the SerWebz backend services.

**Base URL (Development):** `http://localhost:3001`  
**Base URL (Production):** `https://api.serwebz.com`

**Version:** 1.0.0  
**Last Updated:** January 2026

---

## 📋 Table of Contents

- [Authentication](#authentication)
- [Contact Endpoints](#contact-endpoints)
- [Newsletter Endpoints](#newsletter-endpoints)
- [Error Handling](#error-handling)
- [Rate Limiting](#rate-limiting)
- [Response Format](#response-format)

---

## 🔐 Authentication

Currently, the API does not require authentication for public endpoints (contact form, newsletter). Future versions will include API key authentication for admin endpoints.

---

## 📮 Contact Endpoints

### Submit Contact Form

Submit a new contact inquiry from the website.

**Endpoint:** `POST /api/contact`

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 98765 43210",
  "projectType": "business",
  "message": "I need a website for my restaurant business."
}
```

**Field Validation:**

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `name` | string | Yes | 2-100 characters |
| `email` | string | Yes | Valid email format |
| `phone` | string | Yes | Valid phone number |
| `projectType` | string | Yes | One of: `basic`, `business`, `ecommerce`, `maintenance`, `other` |
| `message` | string | Yes | 10-1000 characters |

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Thank you! We'll get back to you within 24 hours.",
  "data": {
    "id": "uuid-here",
    "submittedAt": "2026-01-11T10:30:00Z"
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "error": "Validation failed",
  "details": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

**Rate Limit:** 5 requests per hour per IP

**Example Request (JavaScript):**
```javascript
const response = await fetch('http://localhost:3001/api/contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+91 98765 43210',
    projectType: 'business',
    message: 'I need a website for my restaurant.'
  })
});

const data = await response.json();
console.log(data);
```

**Example Request (cURL):**
```bash
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+91 98765 43210",
    "projectType": "business",
    "message": "I need a website for my restaurant."
  }'
```

---

### Get Contact Submissions (Admin Only - Future)

Retrieve all contact form submissions.

**Endpoint:** `GET /api/contact/submissions`

**Status:** 🚧 Coming Soon

**Authentication:** Required (API Key)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid-1",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+91 98765 43210",
      "projectType": "business",
      "message": "I need a website...",
      "status": "new",
      "createdAt": "2026-01-11T10:30:00Z"
    }
  ],
  "total": 15,
  "page": 1,
  "limit": 10
}
```

---

## 📧 Newsletter Endpoints

### Subscribe to Newsletter

Add an email to the newsletter mailing list.

**Endpoint:** `POST /api/newsletter/subscribe`

**Request Body:**
```json
{
  "email": "subscriber@example.com"
}
```

**Field Validation:**

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `email` | string | Yes | Valid email format |

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Successfully subscribed to newsletter!",
  "data": {
    "email": "subscriber@example.com",
    "subscribedAt": "2026-01-11T10:30:00Z"
  }
}
```

**Error Response (409 Conflict):**
```json
{
  "success": false,
  "error": "This email is already subscribed"
}
```

**Rate Limit:** 3 requests per hour per IP

**Example Request:**
```javascript
const response = await fetch('http://localhost:3001/api/newsletter/subscribe', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'subscriber@example.com'
  })
});

const data = await response.json();
```

---

### Unsubscribe from Newsletter

Remove an email from the newsletter mailing list.

**Endpoint:** `POST /api/newsletter/unsubscribe`

**Request Body:**
```json
{
  "email": "subscriber@example.com"
}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Successfully unsubscribed from newsletter"
}
```

---

## ⚠️ Error Handling

### Error Response Format

All errors follow this format:
```json
{
  "success": false,
  "error": "Error message",
  "details": [] // Optional array of validation errors
}
```

### HTTP Status Codes

| Code | Meaning | Description |
|------|---------|-------------|
| 200 | OK | Request successful |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Invalid request data |
| 401 | Unauthorized | Authentication required |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource not found |
| 409 | Conflict | Resource already exists |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server error |

### Common Error Examples

**Validation Error (400):**
```json
{
  "success": false,
  "error": "Validation failed",
  "details": [
    {
      "field": "email",
      "message": "Invalid email format"
    },
    {
      "field": "message",
      "message": "Message must be at least 10 characters"
    }
  ]
}
```

**Rate Limit Error (429):**
```json
{
  "success": false,
  "error": "Too many requests. Please try again in 1 hour.",
  "retryAfter": 3600
}
```

**Server Error (500):**
```json
{
  "success": false,
  "error": "Internal server error. Please try again later."
}
```

---

## 🚦 Rate Limiting

To prevent abuse, API endpoints are rate limited:

| Endpoint | Limit | Window |
|----------|-------|--------|
| `/api/contact` | 5 requests | 1 hour |
| `/api/newsletter/subscribe` | 3 requests | 1 hour |
| `/api/newsletter/unsubscribe` | 5 requests | 1 hour |

**Rate Limit Headers:**
```
X-RateLimit-Limit: 5
X-RateLimit-Remaining: 3
X-RateLimit-Reset: 1704974400
```

**When rate limit is exceeded:**
- Returns `429 Too Many Requests`
- Includes `Retry-After` header with seconds to wait

---

## 📦 Response Format

### Success Response

All successful responses follow this format:
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    // Response data here
  }
}
```

### Error Response

All error responses follow this format:
```json
{
  "success": false,
  "error": "Error message",
  "details": [] // Optional
}
```

---

## 🧪 Testing the API

### Using Postman

1. Download [Postman](https://www.postman.com/)
2. Import collection: `docs/postman/SerWebz-API.json`
3. Set environment variable: `BASE_URL = http://localhost:3001`
4. Test endpoints

### Using cURL

**Test Contact Form:**
```bash
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+91 98765 43210",
    "projectType": "basic",
    "message": "This is a test message."
  }'
```

**Test Newsletter Subscribe:**
```bash
curl -X POST http://localhost:3001/api/newsletter/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'
```

### Using JavaScript (Fetch API)
```javascript
// Test contact form submission
async function testContactForm() {
  try {
    const response = await fetch('http://localhost:3001/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        phone: '+91 98765 43210',
        projectType: 'basic',
        message: 'This is a test message.'
      })
    });

    const data = await response.json();
    
    if (data.success) {
      console.log('✓ Success:', data.message);
    } else {
      console.error('✗ Error:', data.error);
    }
  } catch (error) {
    console.error('✗ Network error:', error);
  }
}

testContactForm();
```

---

## 🔒 Security

### CORS

CORS is configured to allow requests from:
- `http://localhost:3000` (development)
- `https://serwebz.com` (production)
- `https://www.serwebz.com` (production)

### Input Validation

All inputs are validated using Zod schemas:
- SQL injection prevention
- XSS prevention
- Type checking
- Length limits

### Email Security

- Emails are sent using verified SMTP server
- Rate limiting prevents spam
- No email addresses exposed in responses

---

## 📞 Support

**Issues?** Contact us:
- Email: leofrancis6988@gmail.com
- Phone: +91 7499216988

**Found a bug?** Report it on GitHub Issues

---

## 📝 Changelog

### Version 1.0.0 (January 2026)
- ✅ Contact form endpoint
- ✅ Newsletter subscription
- ✅ Rate limiting
- ✅ Error handling
- ✅ Validation with Zod

### Upcoming Features
- 🚧 Admin authentication
- 🚧 Get submissions endpoint
- 🚧 Analytics endpoint
- 🚧 Webhook support

---

<div align="center">

**SerWebz API Documentation**

*Last updated: January 11, 2026*

[Back to Main README](../README.md)

</div>