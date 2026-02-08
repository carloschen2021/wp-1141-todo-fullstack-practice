# Database Setup Guide

## Overview
This project uses **PostgreSQL** as the database and **Prisma** as the ORM.

## Database Configuration

### Connection Details
- **Database**: PostgreSQL
- **Host**: localhost
- **Port**: 5432
- **Database Name**: todo_app
- **Schema**: public

### Environment Variables
Located in `backend/.env`:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/todo_app?schema=public"
PORT=3000
```

## Database Schema

### Todo Table
```sql
CREATE TABLE "Todo" (
    "id" SERIAL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);
```

## Available Commands

### Generate Prisma Client
```bash
cd backend
npm run prisma:generate
```

### Run Migrations
```bash
cd backend
npm run prisma:migrate
```

### Seed Database
Populate the database with sample data:
```bash
cd backend
npm run prisma:seed
```

This will create 5 sample todos:
- Welcome to your Todo App! 🎉
- Learn React and TypeScript ✅
- Build a fullstack application ✅
- Master Prisma ORM
- Deploy to production

### Open Prisma Studio
Visual database browser:
```bash
cd backend
npx prisma studio
```
Opens at: http://localhost:5555

### Check Migration Status
```bash
cd backend
npx prisma migrate status
```

### Reset Database (⚠️ Destructive)
```bash
cd backend
npx prisma migrate reset
```
This will:
1. Drop the database
2. Create a new database
3. Apply all migrations
4. Run seed script (if configured)

## Migration History

### 20260205131223_init
Initial migration creating the Todo table with all required fields.

## Troubleshooting

### Connection Issues
1. Ensure PostgreSQL is running
2. Verify credentials in `.env`
3. Check if database `todo_app` exists
4. Verify port 5432 is not blocked

### Permission Errors During Migration
If you get "EPERM: operation not permitted" errors:
- Stop the dev server (`npm run dev`)
- Run the migration
- Restart the dev server

### Schema Out of Sync
```bash
cd backend
npx prisma db push
```
This syncs the database with your schema without creating a migration.
