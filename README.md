# DisasterGuard — MERN Monorepo

A MERN application for disaster management training and emergency response.

## Apps
- **client/** — React + Vite + Tailwind + DaisyUI frontend
- **server/** — Express + MongoDB backend (JWT auth)

## Quick Start

1) Install dependencies

```bash
cd server && npm i
cd ../client && npm i
```

2) Configure environment

```bash
# server/.env (copy from .env.sample)
MONGO_URI=mongodb://127.0.0.1:27017/disasterguard
JWT_SECRET=supersecretchangeme
PORT=5000
CLIENT_ORIGIN=http://localhost:5173
```

3) Run backend

```bash
cd server
npm run dev
```

4) Run frontend

```bash
cd client
npm run dev
```

Open http://localhost:5173

## Features Mapped to Brief

- Landing with **Home**, **Modules**, **Emergency**, **School Panel**, **About**
- **E‑Learning Hub**: modules, lessons, quizzes, progress
- **Emergency Hub**: SOS endpoint, mock real‑time alerts feed
- **School Panel**: school admin basics and student progress overview
- JWT authentication (register/login)
- Simple seeding route for demo data

> This is a working scaffold with clean patterns so your team can extend quickly.
