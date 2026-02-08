# Environment Variables

## Frontend (.env)

Create a `.env` file in the `frontend` directory:

```env
# API Backend URL
VITE_API_URL=http://localhost:3000
```

**For production (Vercel):**
Set this in Vercel dashboard → Environment Variables:
```env
VITE_API_URL=https://your-backend.up.railway.app
```

---

## Backend (.env)

The `backend/.env` file already exists with:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/todo_db"
PORT=3000
```

**For production (Railway):**
Railway will automatically set `DATABASE_URL` when you add PostgreSQL.
Add these manually in Railway dashboard → Variables:

```env
DATABASE_URL=<automatically set by Railway PostgreSQL>
PORT=3000
NODE_ENV=production
```

---

## Important Notes

> [!WARNING]
> Never commit `.env` files to Git! They are already in `.gitignore`.

> [!TIP]
> For Vite, environment variables must be prefixed with `VITE_` to be exposed to the client.

> [!IMPORTANT]
> After changing environment variables in Vercel or Railway, you must redeploy for changes to take effect.
