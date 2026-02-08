# Deployment Guide: Vercel + Railway

This guide will walk you through deploying your full-stack todo application to production.

**Stack:**
- Frontend: Vercel (React + Vite)
- Backend: Railway (Express + Node.js)
- Database: Railway PostgreSQL

---

## Prerequisites

- [ ] Git repository (GitHub, GitLab, or Bitbucket)
- [ ] Vercel account (free): https://vercel.com
- [ ] Railway account (free): https://railway.app
- [ ] Code committed and pushed to Git

---

## Part 1: Deploy Backend to Railway

### Step 1: Create Railway Project

1. Go to https://railway.app and sign in
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Authorize Railway to access your GitHub
5. Select your repository: `wp-1141-todo-fullstack-practice`
6. Railway will detect your project

### Step 2: Add PostgreSQL Database

1. In your Railway project, click **"+ New"**
2. Select **"Database"** → **"PostgreSQL"**
3. Railway will provision a PostgreSQL database
4. Click on the PostgreSQL service
5. Go to **"Variables"** tab
6. Copy the `DATABASE_URL` (you'll need this)

### Step 3: Configure Backend Service

1. Click on your backend service (the one from GitHub)
2. Go to **"Settings"** tab
3. Set **Root Directory**: `backend`
4. Set **Build Command**: `npm install && npx prisma generate && npm run build`
5. Set **Start Command**: `npm start`

### Step 4: Add Environment Variables

1. Go to **"Variables"** tab in your backend service
2. Add the following variables:

```
DATABASE_URL=<paste from PostgreSQL service>
PORT=3000
NODE_ENV=production
```

> [!IMPORTANT]
> The `DATABASE_URL` should be automatically linked if you added PostgreSQL to the same project. If not, copy it from the PostgreSQL service.

### Step 5: Run Database Migrations

1. In Railway, go to your backend service
2. Click **"Deployments"** tab
3. Once deployed, click on the latest deployment
4. Click **"View Logs"**
5. You should see Prisma migrations running automatically

**If migrations don't run automatically:**
1. Go to **"Settings"** → **"Deploy"**
2. Add to Build Command: `npm install && npx prisma generate && npx prisma migrate deploy && npm run build`

### Step 6: Get Backend URL

1. Go to **"Settings"** tab
2. Under **"Domains"**, you'll see a URL like: `https://your-app.up.railway.app`
3. Copy this URL - you'll need it for the frontend

---

## Part 2: Deploy Frontend to Vercel

### Step 1: Create Vercel Project

1. Go to https://vercel.com and sign in
2. Click **"Add New..."** → **"Project"**
3. Import your Git repository
4. Vercel will detect it's a Vite project

### Step 2: Configure Build Settings

1. **Framework Preset**: Vite
2. **Root Directory**: `frontend`
3. **Build Command**: `npm run build`
4. **Output Directory**: `dist`
5. **Install Command**: `npm install`

### Step 3: Add Environment Variables

1. Before deploying, click **"Environment Variables"**
2. Add the following:

```
VITE_API_URL=<your Railway backend URL>
```

Example:
```
VITE_API_URL=https://your-app.up.railway.app
```

> [!WARNING]
> Make sure to use `VITE_` prefix for Vite environment variables!

### Step 4: Deploy

1. Click **"Deploy"**
2. Wait for build to complete (usually 1-2 minutes)
3. Vercel will provide a URL like: `https://your-app.vercel.app`

---

## Part 3: Update Frontend API Configuration

### Update API Base URL

**File**: `frontend/src/services/api.ts`

Update to use environment variable:

```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api/todos`,
});
```

**Commit and push this change** - Vercel will auto-deploy.

---

## Part 4: Configure CORS on Backend

### Update CORS Settings

**File**: `backend/src/index.ts`

Update CORS to allow your Vercel domain:

```typescript
const allowedOrigins = [
  'http://localhost:5173',
  'https://your-app.vercel.app', // Add your Vercel URL
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
}));
```

**Commit and push** - Railway will auto-deploy.

---

## Part 5: Verification

### Test Your Deployed App

1. Open your Vercel URL: `https://your-app.vercel.app`
2. Try adding a todo
3. Try editing a todo
4. Try deleting a todo
5. Try search and filter
6. Check toast notifications

### Check Backend Logs

1. Go to Railway dashboard
2. Click on backend service
3. View **"Logs"** tab
4. Look for any errors

### Check Database

1. In Railway, click on PostgreSQL service
2. Go to **"Data"** tab
3. You should see your todos in the `Todo` table

---

## Troubleshooting

### Frontend can't connect to backend

**Issue**: CORS errors or network errors

**Solution**:
1. Check `VITE_API_URL` is set correctly in Vercel
2. Verify CORS configuration includes your Vercel domain
3. Check Railway backend is running (view logs)

### Database connection errors

**Issue**: Backend can't connect to PostgreSQL

**Solution**:
1. Verify `DATABASE_URL` is set in Railway backend variables
2. Check PostgreSQL service is running
3. Ensure migrations ran successfully

### Build failures on Vercel

**Issue**: Build fails with module errors

**Solution**:
1. Check all dependencies are in `package.json`
2. Verify `Root Directory` is set to `frontend`
3. Check build logs for specific errors

### Build failures on Railway

**Issue**: Backend build fails

**Solution**:
1. Verify `Root Directory` is set to `backend`
2. Check `prisma generate` runs in build command
3. Ensure all dependencies are listed in `package.json`

---

## Environment Variables Summary

### Railway Backend

```env
DATABASE_URL=<from PostgreSQL service>
PORT=3000
NODE_ENV=production
```

### Vercel Frontend

```env
VITE_API_URL=<your Railway backend URL>
```

---

## Automatic Deployments

Both platforms support automatic deployments:

- **Vercel**: Deploys on every push to `main` branch
- **Railway**: Deploys on every push to `main` branch

To disable auto-deploy:
- **Vercel**: Settings → Git → Disable auto-deploy
- **Railway**: Settings → Deploy → Disable auto-deploy

---

## Custom Domains (Optional)

### Add Custom Domain to Vercel

1. Go to Project Settings → Domains
2. Add your domain
3. Configure DNS records as instructed

### Add Custom Domain to Railway

1. Go to Service Settings → Domains
2. Click "Add Domain"
3. Configure DNS records as instructed

---

## Monitoring & Logs

### Vercel

- **Logs**: Project → Deployments → Click deployment → View Function Logs
- **Analytics**: Project → Analytics (requires Pro plan)

### Railway

- **Logs**: Service → Logs (real-time)
- **Metrics**: Service → Metrics (CPU, Memory, Network)

---

## Cost Estimates

### Free Tier Limits

**Vercel Free:**
- 100 GB bandwidth/month
- Unlimited deployments
- Automatic HTTPS

**Railway Free Trial:**
- $5 credit/month
- Enough for small apps
- After trial: Pay as you go

**Estimated monthly cost (after free trial):**
- Small app: $5-10/month
- Medium traffic: $10-20/month

---

## Next Steps

After successful deployment:

1. [ ] Test all features in production
2. [ ] Set up custom domain (optional)
3. [ ] Configure monitoring/alerts
4. [ ] Set up CI/CD for automated testing
5. [ ] Add production error tracking (Sentry)
6. [ ] Configure database backups
7. [ ] Add rate limiting to API
8. [ ] Set up staging environment

---

## Quick Reference

| Service | URL | Purpose |
|---------|-----|---------|
| Railway Dashboard | https://railway.app/dashboard | Backend & DB management |
| Vercel Dashboard | https://vercel.com/dashboard | Frontend management |
| Production Frontend | https://your-app.vercel.app | Live app |
| Production Backend | https://your-app.up.railway.app | API endpoint |
