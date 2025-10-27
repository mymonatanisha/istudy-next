import { Roboto, Big_Shoulders_Display } from "next/font/google";
import "./globals.scss";
import "swiper/css/bundle";
import "react-photo-view/dist/react-photo-view.css";
import "nouislider/dist/nouislider.css";
import "react-circular-progressbar/dist/styles.css";
import AppProvider from "@/contextApi/AppProvider";
import { Toaster } from "sonner";
import ReduxProvider from "@/redux/provider";
import { VideoProvider } from "@/contextApi/VideoProvider";
import GlobalVideoModal from "@/components/common/popup/GlobalVideoModal";
import { Metadata } from "next";
import React from 'react';
import Script from 'next/script';
import Analytics from '@/components/common/Analytics';

// Load Roboto font
const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

// Load Big Shoulders Display font
const bigShoulders = Big_Shoulders_Display({
  variable: "--font-big-shoulders",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Project base App Development Course",
  description: "Master app development with hands-on projects! Enroll in our Project-Based App Development Course to build real-world iOS, Android, and cross-platform apps. Gain practical coding skills, create portfolio-ready projects, and learn from industry experts. Perfect for beginners and intermediates—launch your career in tech today!",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en">
      <head>
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { page_path: window.location.pathname });
              `}
            </Script>
          </>
        )}
        <meta name="robots" content="index" />
      </head>
      <body suppressHydrationWarning>
        <VideoProvider>
          <ReduxProvider>
            <AppProvider>
              {GA_ID && <Analytics />}
              {children}
            </AppProvider>
            <GlobalVideoModal />
          </ReduxProvider>
        </VideoProvider>
      </body>
    </html>
  );
}