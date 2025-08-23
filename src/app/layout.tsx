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

export const metadata: Metadata = {
  title: "Project base App Development Course",
  description: "Master app development with hands-on projects! Enroll in our Project-Based App Development Course to build real-world iOS, Android, and cross-platform apps. Gain practical coding skills, create portfolio-ready projects, and learn from industry experts. Perfect for beginners and intermediates—launch your career in tech today!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
           <meta name="robots" content="index" />
      </head>
      <body suppressHydrationWarning className="body-bg" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        <VideoProvider>
          <ReduxProvider>
            <AppProvider>
              {children}
            </AppProvider>
            <Toaster position="top-center" richColors />
            <GlobalVideoModal />
          </ReduxProvider>
        </VideoProvider>
      </body>
    </html>
  );
}





