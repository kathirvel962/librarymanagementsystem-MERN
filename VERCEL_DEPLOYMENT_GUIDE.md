# Vercel Deployment Guide - MIME Type Error Fix

## Problem Summary
When deploying a Vite/React app to Vercel, JavaScript files were returning as HTML (MIME type `text/html` instead of `text/javascript`), causing the error:
```
Failed to load module script: Expected a JavaScript-or-Wasm module script but the server responded with a MIME type of 'text/html'
```

## Root Causes
1. **index.html script path** - Used absolute path `/src/main.jsx` instead of relative path
2. **vercel.json rewrites** - Rewrite rule `/(.*) -> /` was catching static assets (`/assets/*`)
3. **Missing asset exclusion** - Static files weren't excluded from the SPA rewrite rule

## Fixes Applied

### 1. index.html - Changed Script Path
**Before:**
```html
<script type="module" src="/src/main.jsx"></script>
```

**After:**
```html
<script type="module" src="./src/main.jsx"></script>
```

**Why:** Relative paths allow Vite to properly resolve and bundle the file during build. The absolute path breaks in production.

---

### 2. vercel.json - Fixed Rewrite Rules
**Before:**
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

**After:**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "env": {
    "VITE_API_URL": "@vite_api_url"
  },
  "rewrites": [
    { "source": "/assets/:path*", "destination": "/assets/:path*" },
    { "source": "/:path*", "destination": "/" }
  ]
}
```

**Why:** 
- First rule: Explicitly preserve static assets from `/assets/` directory
- Second rule: Route all other requests to `/` for SPA routing
- This prevents Vercel from rewriting asset requests to index.html

---

### 3. vite.config.js - Enhanced Production Configuration
**Key additions:**
```javascript
build: {
  outDir: 'dist',
  emptyOutDir: true,           // Clear dist before build
  sourcemap: false,             // Smaller production files
  minify: 'esbuild',           // Fast minification
  target: 'esnext',            // Modern browser targets
  chunkSizeWarningLimit: 1000, // Suppress warnings (if needed)
  rollupOptions: {
    output: {
      manualChunks: {
        // Separate vendor libraries for better caching
        'react-vendor': ['react', 'react-dom'],
        'router': ['react-router-dom'],
        'axios': ['axios'],
        'toast': ['react-toastify'],
      },
      // Consistent naming for assets
      entryFileNames: 'assets/[name]-[hash].js',
      chunkFileNames: 'assets/[name]-[hash].js',
      assetFileNames: 'assets/[name]-[hash][extname]',
    },
  },
}
```

---

## Deployment Checklist

### Before Deploying to Vercel:
```bash
# 1. Build locally to test
npm run build

# 2. Preview production build
npm run preview

# 3. Check dist folder structure
dist/
├── index.html
├── assets/
│   ├── react-vendor-xxx.js
│   ├── router-xxx.js
│   ├── main-xxx.js
│   └── index-xxx.css
└── vite.svg
```

### Vercel Project Settings:
1. **Build Command:** `npm run build`
2. **Output Directory:** `dist`
3. **Install Command:** `npm install` (optional, Vercel auto-detects)

### Environment Variables on Vercel:
```
VITE_API_URL = https://your-backend-url.com
```

---

## Browser DevTools Debugging

### Step 1: Open Network Tab
1. In Chrome/Firefox, open DevTools (F12)
2. Go to **Network** tab
3. Reload the page

### Step 2: Check Failed Requests
Look for requests with **red X** or warning icons:
- Click on the request (e.g., `index-xxx.js`)
- In **Headers** tab, check:
  - **Status:** Should be `200 OK`
  - **Content-Type:** Should be `application/javascript` or `text/javascript`
  - **NOT** `text/html`

### Step 3: Check Request URL
- Should show: `https://your-site.vercel.app/assets/index-xxx.js`
- In **Response** tab, actual JavaScript code should appear (not HTML)

### Step 4: Check Console Tab
- If you see 404 errors, URLs are wrong
- If you see MIME type errors, check the above headers

---

## Verification Steps

### Local Testing:
```bash
# Test production build locally
npm run build
npm run preview

# Visit http://localhost:5173
# Check Network tab - all JS files should load successfully
```

### After Vercel Deployment:
1. Visit your Vercel URL
2. Open DevTools (F12)
3. Go to Network tab
4. Reload page
5. All `.js` files should:
   - Return **Status 200**
   - Have **Content-Type: application/javascript**
   - Actually contain JavaScript code (not HTML)

---

## Common Issues & Solutions

### Issue: Still getting MIME type error
**Solution:**
1. Check vercel.json rewrites - ensure `/assets/` is excluded
2. Clear Vercel cache: In Vercel dashboard → Settings → Git → Deployments → Redeploy (with "Use cache" unchecked)
3. Rebuild and redeploy

### Issue: SPA routing not working (routes returning 404)
**Solution:**
- Vercel rewrites should send all non-asset routes to `/`
- Confirm second rewrite rule exists: `{ "source": "/:path*", "destination": "/" }`

### Issue: Assets returning 404
**Solution:**
1. Check `vite.config.js` build output settings
2. Verify `/assets/` folder exists in `dist/`
3. Check that `entryFileNames` and `chunkFileNames` match expected pattern

### Issue: Old cached version showing
**Solution:**
1. Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
2. Clear browser cache
3. Incognito/Private window
4. Vercel → Deployments → Redeploy with cache cleared

---

## File Structure After Build
```
dist/
├── index.html                    (Entry point - ~1KB)
├── assets/
│   ├── react-vendor-a1b2c3.js   (React libraries - ~300KB)
│   ├── router-d4e5f6.js         (Router library - ~50KB)
│   ├── main-g7h8i9.js           (App code - ~50KB)
│   ├── index-j0k1l2.js          (Other chunks)
│   └── index-m3n4o5.css         (Styles)
└── vite.svg                      (Static asset)
```

---

## API Configuration

### Development (vite.config.js):
```javascript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:5000',
      changeOrigin: true,
    },
  },
}
```

### Production (set in Vercel):
```
VITE_API_URL = https://your-backend-api.com
```

### Update axios calls:
```javascript
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const response = await axios.get(`${API_URL}/api/auth/login`);
```

---

## Final Verification
After deployment, visit your site and verify:
- ✅ Home page loads without errors
- ✅ DevTools Network tab shows all `.js` files with `Content-Type: application/javascript`
- ✅ No MIME type errors in Console
- ✅ SPA routing works (navigate between pages)
- ✅ API calls work correctly (check Network tab for API requests)

