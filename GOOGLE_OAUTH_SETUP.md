# Google OAuth Setup Guide

## Step 1: Google Cloud Console Configuration

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing project
3. Enable **Google+ API**
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Configure OAuth consent screen:
   - User Type: External
   - App name: iStudy Next
   - User support email: your email
   - Developer contact: your email
6. Create OAuth Client ID:
   - Application type: Web application
   - Name: iStudy OAuth Client
   - Authorized JavaScript origins: `http://localhost:3000`
   - Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
7. Copy **Client ID** and **Client Secret**

## Step 2: Add Environment Variables

Add to `.env`:
```env
GOOGLE_CLIENT_ID=your_client_id_from_step_1
GOOGLE_CLIENT_SECRET=your_client_secret_from_step_1
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=run_this_command_to_generate: openssl rand -base64 32
```

## Step 3: Run Database Migration

```bash
npm run db:migrate:dev
npm run db:generate
```

## Step 4: Test

1. Start dev server: `npm run dev`
2. Go to `/sign-in`
3. Click "Google" button
4. Sign in with Google account
5. You should be redirected to dashboard

## Production Setup

For production:
1. Update authorized origins to your production domain
2. Update redirect URIs to your production domain
3. Set NEXTAUTH_URL to production URL
4. Generate new NEXTAUTH_SECRET for production

## Troubleshooting

### Common Issues

1. **"redirect_uri_mismatch" error**
   - Ensure the redirect URI in Google Cloud Console exactly matches: `http://localhost:3000/api/auth/callback/google`
   - For production, update to your production domain

2. **"Access blocked: This app's request is invalid"**
   - Make sure the OAuth consent screen is configured
   - Verify the app is not in testing mode with restricted users

3. **User not created in database**
   - Check database connection
   - Verify Prisma migrations have been run
   - Check server logs for errors

### Testing OAuth Flow Locally

To test the OAuth flow without a real Google account:
- Set up a test Google account
- Add the test account email to the OAuth consent screen's test users list (if in testing mode)

## Security Notes

- Never commit `.env` file to version control
- Use different credentials for development and production
- Rotate secrets regularly in production
- Enable 2FA for your Google Cloud Console account
