# Calitop Web Application

A dual-business web application for **Calitop** & **Topservice** - equipment rental and topographic services.

## Tech Stack

- **Framework:** Next.js 15 (App Router, TypeScript)
- **Database & Auth:** Supabase (PostgreSQL + Auth)
- **Object Storage:** S3 Compatible (Cloudflare R2 / Backblaze B2)
- **Deployment:** Vercel

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp .env.example .env.local
```

3. Configure your `.env.local` with your credentials

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (admin)/           # Admin routes (products CRUD)
│   └── (public)/          # Public routes
├── components/
│   ├── admin/             # Admin panel components
│   └── ui/                # Shared UI components
├── lib/                   # Utility libraries
│   ├── supabase/          # Supabase client config
│   └── s3-client.ts       # S3 client for R2/B2
└── actions/               # Server Actions
    ├── products.ts        # Product CRUD
    └── storage.ts         # Presigned URL generation
```

## Environment Variables

See `.env.example` for required environment variables.
