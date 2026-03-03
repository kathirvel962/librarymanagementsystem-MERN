# Vercel Deployment - Quick Fix Reference

## The 3 Critical Fixes

### 1. index.html - Script Path
```html
<!-- ❌ WRONG (absolute path) -->
<script type="module" src="/src/main.jsx"></script>

<!-- ✅ CORRECT (relative path) -->
<script type="module" src="./src/main.jsx"></script>
```

### 2. vercel.json - Asset Protection
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    { "source": "/assets/:path*", "destination": "/assets/:path*" },
    { "source": "/:path*", "destination": "/" }
  ]
}
```

**Why the first rule matters:** 
- Without it, requests to `/assets/index-abc123.js` get rewritten to `/`
- Vercel then serves `index.html` instead of the JavaScript file
- Browser gets HTML with MIME type `text/html` instead of JavaScript
- Result: MIME type error!

### 3. vite.config.js - Build Settings
```javascript
build: {
  outDir: 'dist',
  emptyOutDir: true,        // Clear before build
  minify: 'esbuild',        // Fast production build
  rollupOptions: {
    output: {
      // Separate vendor code for better caching
      manualChunks: {
        'react-vendor': ['react', 'react-dom'],
        'router': ['react-router-dom'],
        'axios': ['axios'],
        'toast': ['react-toastify'],
      },
      // Consistent file naming
      entryFileNames: 'assets/[name]-[hash].js',
      chunkFileNames: 'assets/[name]-[hash].js',
      assetFileNames: 'assets/[name]-[hash][extname]',
    },
  },
}
```

---

## Pre-Deployment Checklist

- [ ] Update `index.html` script to use relative path: `src="./src/main.jsx"`
- [ ] Verify `vercel.json` has TWO rewrite rules (assets + SPA fallback)
- [ ] Test build locally: `npm run build`
- [ ] Preview production: `npm run preview`
- [ ] Check `/dist` folder exists with `/assets` subfolder
- [ ] Set `VITE_API_URL` environment variable in Vercel dashboard

---

## Debugging Checklist (If MIME Error Still Appears)

### Step 1: Check Browser DevTools
1. Press **F12** → **Network** tab
2. Reload page
3. Find failing request (show with red X)
4. Click it and check:
   - **Status:** Should be `200 OK`, not `404` or `301`
   - **Type:** Should be `fetch` or `xhr` for API, `script` for JS
   - **Headers → Content-Type:** Should be `application/javascript` (NOT `text/html`)

### Step 2: Clear Vercel Cache
1. Go to Vercel dashboard
2. Select your project
3. Settings → Git → Deployments
4. Delete all deployments
5. Redeploy (forces full rebuild)

### Step 3: Verify vercel.json
```bash
# Check file is in root of frontend directory:
frontend/vite-project/vercel.json  ← Should be here!
```

### Step 4: Check dist/ Structure
```bash
npm run build

# Should see:
# dist/
# ├── index.html
# ├── assets/
# │   ├── *.js files
# │   └── *.css files
# └── vite.svg
```

### Step 5: Hard Refresh Browser
- Windows/Linux: **Ctrl + Shift + R**
- Mac: **Cmd + Shift + R**
- Or open DevTools → Settings → disable cache during sessions

---

## What Each File Does

| File | Purpose | Location |
|------|---------|----------|
| `index.html` | Entry point - tells browser where main JS is | `frontend/vite-project/` |
| `vite.config.js` | Build rules and how to bundle code | `frontend/vite-project/` |
| `vercel.json` | Vercel deployment settings & routing rules | `frontend/vite-project/` |
| `package.json` | Dependencies and build command | `frontend/vite-project/` |
| `dist/` | **Production build folder** (created by `npm run build`) | `frontend/vite-project/` |

---

## Asset Loading Flow

### What SHOULD Happen:
```
Browser requests: https://yoursite.vercel.app/assets/index-abc123.js
         ↓
Vercel checks vercel.json rewrites
         ↓
First rule matches: "/assets/:path*" → "/assets/:path*"
         ↓
Vercel serves: dist/assets/index-abc123.js
         ↓
Browser receives: JavaScript file (MIME: application/javascript)
         ↓
Script loads successfully ✅
```

### What WRONG Rewrite Does:
```
Browser requests: https://yoursite.vercel.app/assets/index-abc123.js
         ↓
Vercel checks vercel.json rewrites
         ↓
Only rule is "/(.*)" → "/" (catches EVERYTHING)
         ↓
Vercel rewrites to: / (root path)
         ↓
Vercel serves: dist/index.html
         ↓
Browser receives: HTML file (MIME: text/html)
         ↓
Browser error: Expected JavaScript, got HTML ❌
```

---

## Environment Variables for Vercel

### In Vercel Dashboard:
1. Project Settings → Environment Variables
2. Add:
   - **Name:** `VITE_API_URL`
   - **Value:** `https://your-backend-api.com`
   - Apply to: All (Production, Preview, Development)

### In Frontend Code:
```javascript
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Use it:
axios.get(`${API_URL}/api/auth/login`)
```

---

## Commands Reference

```bash
# Development
npm run dev              # Start dev server on localhost:5173

# Build for production
npm run build            # Creates dist/ folder

# Test production build locally
npm run preview          # Simulates production on localhost:5173

# Lint code
npm run lint             # Check code quality
```

---

## After Fixing

1. ✅ Push changes to GitHub
2. ✅ Vercel auto-deploys (wait 2-3 minutes)
3. ✅ Open your Vercel URL
4. ✅ Open DevTools (F12)
5. ✅ Check Network tab - all JS should load with Status 200
6. ✅ Content-Type should be `application/javascript` (NOT `text/html`)
7. ✅ No MIME type errors in Console
8. ✅ SPA routing should work (click links, no full page reload)

If everything looks good → **Deployment successful!** 🎉

