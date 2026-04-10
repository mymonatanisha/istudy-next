//import { Roboto, Big_Shoulders_Display } from "next/font/google";
import "./globals.scss";
import "swiper/css/bundle";
import "react-photo-view/dist/react-photo-view.css";
import "nouislider/dist/nouislider.css";
import "react-circular-progressbar/dist/styles.css";
import AppProvider from "@/contextApi/AppProvider";
// import { Toaster } from "sonner";
import ReduxProvider from "@/redux/provider";
import { VideoProvider } from "@/contextApi/VideoProvider";
import GlobalVideoModal from "@/components/common/popup/GlobalVideoModal";
import { Metadata } from "next";
import React from 'react';
import Script from 'next/script';
import Analytics from '@/components/common/Analytics';
import NextAuthProvider from '@/components/providers/NextAuthProvider';

// Load Roboto font
//const roboto = Roboto({
 // variable: "--font-roboto",
//  subsets: ["latin"],
//  weight: ["100", "300", "400", "500", "700", "900"],
// });

// Load Big Shoulders Display font
//const bigShoulders = Big_Shoulders_Display({
//  variable: "--font-big-shoulders",
//  subsets: ["latin"],
//  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
//});

export const metadata: Metadata = {
  title: "Project base App Development Course",
  description: "Master app development with hands-on projects! Enroll in our Project-Based App Development Course to build real-world iOS, Android, and cross-platform apps. Gain practical coding skills, create portfolio-ready projects, and learn from industry experts. Perfect for beginners and intermediates—launch your career in tech today!",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const GA_ID = 'G-19ZERJVF8D';
  const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  return (
    <html lang="en">
      <head>
        <meta name="robots" content="index" />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
        {META_PIXEL_ID ? (
          <>
            <Script id="meta-pixel-init" strategy="afterInteractive">
              {`
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${META_PIXEL_ID}');
                fbq('track', 'PageView');
              `}
            </Script>
          </>
        ) : null}
        <Script
          src="https://scripts.simpleanalyticscdn.com/latest.js"
          strategy="afterInteractive"
          async
        />

      </head>
      <body suppressHydrationWarning>
        {META_PIXEL_ID ? (
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        ) : null}
        <NextAuthProvider>
          <VideoProvider>
            <ReduxProvider>
              <AppProvider>
                <Analytics />
                {children}
              </AppProvider>
              <GlobalVideoModal />
            </ReduxProvider>
          </VideoProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
