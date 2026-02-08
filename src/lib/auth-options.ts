import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";

/* eslint-disable @typescript-eslint/no-explicit-any */

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || 'placeholder-client-id';
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || 'placeholder-client-secret';

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }: any) {
      if (account?.provider === "google") {
        // Runtime validation
        if (GOOGLE_CLIENT_ID === 'placeholder-client-id' || GOOGLE_CLIENT_SECRET === 'placeholder-client-secret') {
          console.error('Google OAuth is not properly configured. Please set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment variables.');
          return false;
        }
        
        // Check if user exists
        let existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });

        if (!existingUser) {
          // Create new user with profile picture in avatar field
          existingUser = await prisma.user.create({
            data: {
              name: user.name || "",
              email: user.email!,
              avatar: user.image,
            },
          });
        } else {
          // Migrate existing OAuth users: update avatar field with OAuth profile picture
          // Only do this if avatar is empty or is an OAuth URL (not a base64 image)
          // Base64 images start with "data:image/" while OAuth URLs start with "http"
          const hasManuallyUploadedAvatar = existingUser.avatar?.startsWith('data:image/');
          const shouldMigrateAvatar = user.image && !hasManuallyUploadedAvatar;
          
          // Only update if migration is needed AND the value differs (prevents redundant writes)
          if (shouldMigrateAvatar && existingUser.avatar !== user.image) {
            await prisma.user.update({
              where: { id: existingUser.id },
              data: {
                avatar: user.image,
              },
            });
          }
        }

        // Create or update account
        await prisma.account.upsert({
          where: {
            provider_providerAccountId: {
              provider: account.provider,
              providerAccountId: account.providerAccountId,
            },
          },
          create: {
            userId: existingUser.id,
            type: account.type,
            provider: account.provider,
            providerAccountId: account.providerAccountId,
            access_token: account.access_token,
            refresh_token: account.refresh_token,
            expires_at: account.expires_at,
            token_type: account.token_type,
            scope: account.scope,
            id_token: account.id_token,
          },
          update: {
            access_token: account.access_token,
            refresh_token: account.refresh_token,
            expires_at: account.expires_at,
          },
        });

        return true;
      }
      return true;
    },
    async jwt({ token, user, account }: any) {
      // When user signs in for the first time (user object is available)
      if (user) {
        token.id = user.id;
      }
      
      // For OAuth sign-ins, if we don't have an ID yet, fetch from database
      // This ensures user ID is cached in the session token
      if (!token.id && token.email && account?.provider) {
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email },
          select: { id: true }
        });
        if (dbUser) {
          token.id = dbUser.id;
        }
      }
      
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.id as number;
      }
      return session;
    },
  },
  pages: {
    signIn: '/sign-in',
    error: '/sign-in',
  },
  session: {
    strategy: "jwt" as const,
  },
};
