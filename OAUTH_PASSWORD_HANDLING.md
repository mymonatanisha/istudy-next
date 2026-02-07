# OAuth User Implementation - Password Field Handling

## Overview

This document explains how OAuth users (e.g., Google sign-in) are handled in the istudy-next application, particularly regarding the password field.

## Problem Statement

OAuth users authenticate through their OAuth provider (Google, Facebook, etc.) and don't need a password stored in our database. However, the initial database migration created the `passwordHash` field as `NOT NULL`, which prevented OAuth users from being created.

## Solution

### Database Migration

A new migration has been created: `20260207162805_make_password_hash_nullable`

This migration alters the User table to make the `passwordHash` column nullable:

```sql
ALTER TABLE "User" ALTER COLUMN "passwordHash" DROP NOT NULL;
```

### Prisma Schema

The Prisma schema already correctly defines `passwordHash` as optional:

```prisma
model User {
  id           Int    @id @default(autoincrement())
  name         String
  email        String @unique
  passwordHash String?  // Optional field for OAuth users
  // ... other fields
}
```

## How It Works

### OAuth Sign-In Flow

When a user signs in with OAuth (see `src/lib/auth-options.ts`):

1. The system checks if a user with the email exists
2. If not, it creates a new user with only:
   - `name`
   - `email`
   - `avatarUrl` (from OAuth provider)
3. **No password is set** - `passwordHash` remains `null`

### Password-Based Sign-In

Regular login (see `src/app/api/auth/login/route.ts`):

1. Checks if user exists
2. Checks if `passwordHash` is not null
3. Only then attempts password comparison
4. OAuth users cannot log in with password - they must use OAuth

### Change Password

The change password endpoint (see `src/app/api/user/change-password/route.ts`):

1. Checks if the user has a `passwordHash`
2. If `passwordHash` is null (OAuth user), returns error:
   > "This account uses OAuth authentication and cannot change password"
3. Regular users can change their password normally

### Password Reset

The password reset flow (see `src/app/api/auth/reset/route.ts`):

- Allows setting a password even if one didn't exist before
- This means OAuth users could potentially add a password to their account if they request a reset token
- This is intentional to allow users flexibility in authentication methods

## User Types

### OAuth-Only Users
- `passwordHash` is `null`
- Must sign in through OAuth provider
- Cannot use regular login form
- Cannot change password

### Regular Users
- `passwordHash` contains hashed password
- Can sign in with email/password
- Can change password
- Could potentially link OAuth accounts later

### Hybrid Users
- Started with OAuth but added a password (via reset)
- Can sign in with either method
- Can change password

## Security Considerations

1. **Password validation is skipped for OAuth users** - this is intentional and secure because:
   - OAuth providers handle authentication
   - No password to validate = no password to compromise

2. **Login endpoint checks for passwordHash** - prevents unauthorized access:
   - OAuth users cannot be accessed via password login
   - Forces proper OAuth authentication flow

3. **Change password requires current password** - for regular users:
   - Prevents unauthorized password changes
   - OAuth users are properly rejected

## Testing

To test OAuth functionality:

1. **Create OAuth User**:
   - Sign in with Google OAuth
   - Verify user is created without passwordHash
   - Check database: `passwordHash` should be `null`

2. **Attempt Password Login**:
   - Try to log in with OAuth user's email and any password
   - Should fail with "Invalid credentials"

3. **Attempt Password Change**:
   - OAuth user tries to change password
   - Should fail with "This account uses OAuth authentication and cannot change password"

4. **Regular User Flow**:
   - Create user via registration (with password)
   - Verify passwordHash is set
   - Test password login works
   - Test password change works

## Migration Instructions

For existing databases, run:

```bash
npm run db:migrate
```

This will apply the migration to make `passwordHash` nullable.

For new installations, the schema is already correct and migrations will apply in order.

## Rollback

If you need to rollback this change (not recommended), you would need to:

1. Ensure all OAuth users have been migrated or deleted
2. Create a new migration that adds back the NOT NULL constraint
3. This is not recommended as it breaks OAuth functionality

## Related Files

- Migration: `/prisma/migrations/20260207162805_make_password_hash_nullable/migration.sql`
- Schema: `/prisma/schema.prisma`
- OAuth Config: `/src/lib/auth-options.ts`
- Login API: `/src/app/api/auth/login/route.ts`
- Change Password API: `/src/app/api/user/change-password/route.ts`
- Reset Password API: `/src/app/api/auth/reset/route.ts`
- Register API: `/src/app/api/auth/register/route.ts`
