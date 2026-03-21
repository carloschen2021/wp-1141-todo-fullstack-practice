# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Full-stack TypeScript todo application with a React frontend, Express backend, and PostgreSQL database via Prisma ORM.

## Development Commands

### Backend (`/backend`)
```bash
npm run dev          # Start with hot reload (nodemon + ts-node)
npm run build        # Compile TypeScript to dist/
npm start            # Run compiled output
npm test             # Run Jest tests
npm run prisma:generate  # Regenerate Prisma client after schema changes
npm run prisma:migrate   # Run migrations (dev)
npm run prisma:seed      # Seed the database
```

### Frontend (`/frontend`)
```bash
npm run dev     # Start Vite dev server at http://localhost:5173
npm run build   # Production build
npm run lint    # ESLint check
npm run preview # Preview production build
```

### Run a single backend test
Jest doesn't have a built-in single-test flag in this config, but you can use:
```bash
cd backend && npm test -- --testNamePattern="<test name>"
```

## Architecture

### Stack
- **Frontend**: React 19 + TypeScript + Vite, Axios for HTTP
- **Backend**: Express 5 + TypeScript + Zod (request validation)
- **Database**: PostgreSQL with Prisma ORM
- **Testing**: Jest + Supertest (backend only)

### Project Layout
```
frontend/src/
  App.tsx              # Root component, global state (todos, search, filter)
  services/api.ts      # Axios client (base URL from VITE_API_URL env var)
  types/todo.ts        # Shared TypeScript interfaces
  contexts/            # React context (ToastContext for notifications)
  hooks/               # Custom hooks (useAddTodoForm)
  components/          # UI components (AddTodo, TodoList, TodoItem, SearchFilter)

backend/src/
  index.ts             # Express app entry, CORS setup, route mounting
  routes/todos.ts      # Route definitions under /api/todos
  controllers/todoController.ts  # CRUD handlers with Zod validation
  tests/todos.test.ts  # Supertest integration tests
  prisma/
    schema.prisma      # Todo model definition
    seed.ts            # Database seeding
```

### API Endpoints
All routes are under `/api/todos`:

| Method | Path  | Action        |
|--------|-------|---------------|
| GET    | `/`   | List all todos |
| POST   | `/`   | Create todo   |
| PUT    | `/:id`| Update todo   |
| DELETE | `/:id`| Delete todo   |

### Frontend–Backend Connection
- Frontend calls `VITE_API_URL` (defaults to `http://localhost:3000` if unset)
- Backend CORS allows `http://localhost:5173` in development
- Production: Frontend on Vercel, Backend + DB on Railway (see `DEPLOYMENT.md`)

### Backend Tests
Tests run against compiled JS in `dist/`. Run `npm run build` before `npm test`, or the test runner will use stale output. The jest config targets `**/dist/**/?(*.)+(spec|test).js`.

## Environment Variables

**Backend** (`.env` in `backend/`):
```
DATABASE_URL=postgresql://postgres:password@localhost:5432/todo_app
PORT=3000
```

**Frontend** (`.env` in `frontend/`):
```
VITE_API_URL=http://localhost:3000
```

See `ENV_SETUP.md` for full production configuration details.
