This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Prerequisites

- Node.js 20.x
- PostgreSQL database
- npm or yarn package manager

### Environment Setup

1. Copy the `.env.example` file to `.env.local` (recommended) or `.env`:
   ```bash
   cp .env.example .env.local
   ```
   
   > **Note:** `.env.local` is preferred for local development as it's automatically git-ignored and won't be accidentally committed.

2. Update the environment variables in `.env.local` with your actual values:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `JWT_SECRET`: A secure random string for JWT token signing
   - `NEXT_PUBLIC_BASE_URL`: Your application URL (usually `http://localhost:3000` for local dev)
   - `YT_API_KEY` (optional): YouTube Data API v3 key for enhanced playlist features

3. **YouTube Playlist Feature** (Optional):
   - Without a YouTube API key, the playlist will show in basic iframe mode
   - To enable the full interactive player with thumbnails and search:
     1. Get an API key from [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
     2. Enable the YouTube Data API v3 for your project
     3. Add the key to `YT_API_KEY` in your `.env.local` file
     4. **Security:** Consider restricting the API key to YouTube Data API v3 only
   - **Important:** Restart your dev server after adding/changing environment variables

### Local Development

First, install dependencies:

```bash
npm install
```

Then, run the Prisma migrations to set up your database:

```bash
npx prisma migrate dev
```

Finally, run the development server:

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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Deployment to Heroku

### Prerequisites

- Heroku CLI installed
- Git repository connected to Heroku

### Setup Steps

1. **Create a Heroku app:**
   ```bash
   heroku create your-app-name
   ```

2. **Add PostgreSQL database:**
   ```bash
   heroku addons:create heroku-postgresql:essential-0 -a your-app-name
   ```
   This automatically sets the `DATABASE_URL` environment variable.

3. **Set required environment variables:**
   ```bash
   # Generate a secure JWT secret
   heroku config:set JWT_SECRET="$(openssl rand -base64 32)" -a your-app-name
   
   # Set Node environment
   heroku config:set NODE_ENV="production" -a your-app-name
   ```

4. **Deploy the app:**
   ```bash
   git push heroku main
   ```

5. **Verify deployment:**
   ```bash
   heroku logs --tail -a your-app-name
   ```

### Database Management

**Run migrations manually (if needed):**
```bash
heroku run npx prisma migrate deploy -a your-app-name
```

**Access PostgreSQL console:**
```bash
heroku pg:psql -a your-app-name
```

**View database data:**
```sql
SELECT * FROM "User";
```

### Environment Variables

View all config vars:
```bash
heroku config -a your-app-name
```

Required variables:
- `DATABASE_URL` - PostgreSQL connection string (auto-set by addon)
- `JWT_SECRET` - Secret key for JWT token signing (must set manually)
- `NODE_ENV` - Set to "production" for secure cookies

### Heroku Configuration

The app uses the following Heroku configuration files:

- **Procfile**: Defines the web process and release command
  - `web`: Starts the Next.js production server
  - `release`: Runs database migrations before each deployment

- **package.json engines**: Specifies Node.js version
  ```json
  {
    "engines": {
      "node": "20.x"
    }
  }
  ```

- **heroku-postbuild script**: Runs after dependencies are installed
  - Generates Prisma Client
  - Deploys database migrations
  - Builds the Next.js application

### Troubleshooting

**Database Connection Issues:**
- Verify DATABASE_URL is set: `heroku config:get DATABASE_URL`
- Check Heroku logs: `heroku logs --tail`

**Build Failures:**
- Ensure all dependencies are in `dependencies` (not `devDependencies`)
- TypeScript and Prisma CLI are in `devDependencies` (correct for this setup)

**Migration Issues:**
- Check migration status: `heroku run npx prisma migrate status`
- View database: `heroku pg:psql`

**Environment Variables:**
- List all config vars: `heroku config`
- Update a variable: `heroku config:set VAR_NAME=value`

### Important Notes

- The app uses Node.js 20.x (specified in package.json engines)
- Database migrations run automatically during deployment via the Procfile release phase
- Next.js config is now in JavaScript (next.config.js) to avoid TypeScript compilation issues in production
