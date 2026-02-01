This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### 1. Set up the database

Copy the environment template and configure your database:

```bash
cp .env.example .env
# Edit .env and set your DATABASE_URL
```

Generate Prisma client and run migrations:

```bash
npm install
npm run db:generate
npm run db:migrate
```

### 2. Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Database Management

This project uses [Prisma](https://www.prisma.io/) as the ORM with PostgreSQL.

### Available Database Commands

```bash
# Generate Prisma Client
npm run db:generate

# Apply migrations to database
npm run db:migrate

# Create new migration (development)
npm run db:migrate:dev

# Check migration status
npm run db:status

# Open Prisma Studio (database GUI)
npm run db:studio

# Verify database state
npm run verify-db
```

### Deploying to Production

**Important**: Before deploying migrations to production, always:

1. **Backup your database**
2. **Test migrations on a staging environment** 
3. **Verify database state**: `npm run verify-db`
4. **Check migration status**: `npm run db:status`

For detailed migration debugging and deployment instructions, see [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md).

### Quick Production Deploy

```bash
# Set your production DATABASE_URL in environment
export DATABASE_URL="postgresql://user:pass@host:5432/db"

# Apply migrations
npm run db:migrate

# Verify success
npm run verify-db
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
