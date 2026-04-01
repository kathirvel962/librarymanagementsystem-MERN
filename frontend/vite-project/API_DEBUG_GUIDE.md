# MERN Frontend-Backend Connection Debugging Guide

## Problem
The frontend shows: **"Cannot connect to server. Please make sure the backend is running."**

## Solution Steps

### 1. Verify Environment Variable in Vercel Dashboard

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add or update the environment variable:
   - **Name**: `VITE_API_URL`
   - **Value**: Your Render backend URL (e.g., `https://library-backend-xyz.onrender.com`)
   - **Environments**: Select `Production`, `Preview`, and `Development`

4. Redeploy your frontend on Vercel

### 2. Check Browser Console Logs

1. Open your frontend application in the browser
2. Press **F12** or **Ctrl+Shift+I** to open Developer Tools
3. Go to the **Console** tab
4. You should see logs similar to:
   ```
   API URL Configuration Debug:
   VITE_API_URL: https://your-render-backend-url.onrender.com
   Environment Mode: production
   Frontend URL: https://library-management-system.vercel.app
   
   Login Component - API URL: https://your-render-backend-url.onrender.com
   Attempting login with URL: https://your-render-backend-url.onrender.com/api/auth/student/login
   ```

5. **Verify the URL is correct** - it should point to your Render backend, NOT `localhost:5000`

### 3. Inspect Network Requests

1. In Developer Tools, go to the **Network** tab
2. Try logging in to trigger an API request
3. Look for the login API request (e.g., `student/login` or `admin/login`)
4. Click on the request and check:
   - **Request URL**: Should be `https://your-render-backend-url.onrender.com/api/auth/...`
   - **Status**: Should be 200 (or relevant response code)
   - **Headers**: Should show `Authorization: Bearer token` if authenticated

5. If you see errors:
   - **ERR_NETWORK**: Backend is not responding (check if Render backend is running)
   - **CORS error**: Backend CORS configuration issue
   - **404**: Incorrect API URL path

### 4. Verify Backend Configuration

On your Render backend (server.js):

```javascript
app.use(cors({
  origin: "https://library-management-system.vercel.app",
  credentials: true
}));
```

Make sure:
- The frontend URL is correct in the CORS configuration
- The backend is running on Render
- Cross-origin requests are allowed

### 5. Common Issues and Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| `VITE_API_URL = http://localhost:5000` in production | Missing environment variable in Vercel | Add `VITE_API_URL` to Vercel Environment Variables |
| Console shows `undefined` for API URL | Environment variable not set | Ensure `VITE_API_URL` is defined in Vercel |
| CORS error in Network tab | Backend CORS not configured for frontend URL | Update backend CORS origin to match Vercel frontend URL |
| Backend unreachable | Render backend shut down or not deployed | Redeploy backend on Render or check if it's awake |
| Wrong API URL in logs | Environment variable typo | Verify the exact Render URL (copy-paste to avoid mistakes) |

### 6. Environment Variable Naming Convention

- **Local Development** (`.env.local`): `VITE_API_URL=http://localhost:5000`
- **Production** (`.env.production` or Vercel): `VITE_API_URL=https://your-render-backend-url.onrender.com`

### 7. Testing the Connection

Once everything is configured:

1. Check Console logs show the correct (non-localhost) URL
2. Network requests in DevTools should target the Render backend URL
3. Login should succeed if credentials are correct and backend is responding

## Render Backend Wake-Up

Render free tier services go to sleep after 15 minutes of inactivity. Your first API request will be slow but will wake up the backend.

---

**For more help**, check the detailed logs in the browser console and Vercel deployment logs.
