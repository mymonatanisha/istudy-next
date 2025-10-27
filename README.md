This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

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

## Google Analytics 4 Setup

This project includes Google Analytics 4 (GA4) tracking for monitoring user behavior and site performance.

### Configuration

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Add your GA4 Measurement ID to `.env.local`:
   ```
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```
   
   Get your GA4 Measurement ID from [Google Analytics](https://analytics.google.com/):
   - Navigate to Admin → Data Streams
   - Select your web data stream
   - Copy the Measurement ID (format: G-XXXXXXXXXX)

3. The `.env.local` file is already in `.gitignore` and will not be committed to version control.

### Features

- **Automatic Pageview Tracking**: Page views are automatically tracked on route changes
- **Search Parameter Tracking**: URL search parameters are included in pageviews
- **Debug Mode**: Enabled automatically in development for testing (check browser console)
- **Production Ready**: Optimized with `afterInteractive` script loading strategy

### Verification

#### During Development:

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser's Developer Console (F12)

3. Navigate between pages - you should see GA debug messages like:
   ```
   [GA4] Page view: /path?query=param
   ```

4. Check the Network tab for requests to `google-analytics.com`

#### In Google Analytics:

1. **Real-time Reporting**:
   - Go to [Google Analytics](https://analytics.google.com/)
   - Navigate to Reports → Realtime
   - Visit your site and verify that your visits appear in real-time

2. **DebugView** (recommended for development):
   - Navigate to Configure → DebugView
   - Open your site in development mode
   - You should see debug events appearing in real-time
   - Verify that `page_view` events include the correct `page_path`

3. **Event Verification**:
   - Navigate between different pages on your site
   - Check that each navigation triggers a new `page_view` event
   - Verify that URL parameters are correctly captured

### Implementation Details

The GA4 implementation consists of:

- `src/utils/gtag.ts`: Core GA4 utility functions
- `src/components/GoogleAnalytics.tsx`: Script loader component
- `src/components/AnalyticsListener.tsx`: Client component for route change tracking
- `global.d.ts`: TypeScript definitions for `window.gtag`

### Troubleshooting

- **No events showing up**: Verify that `NEXT_PUBLIC_GA_ID` is set correctly in `.env.local`
- **Build errors**: Ensure all environment variables are properly prefixed with `NEXT_PUBLIC_`
- **TypeScript errors**: Check that `global.d.ts` is included in your `tsconfig.json`

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
