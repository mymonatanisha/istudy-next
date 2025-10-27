import Script from 'next/script';
import { GA_ID } from '@/utils/gtag';

export default function GoogleAnalytics() {
  if (!GA_ID) {
    return null;
  }

  const isProduction = process.env.NODE_ENV === 'production';

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              page_path: window.location.pathname,
              debug_mode: ${!isProduction}
            });
          `,
        }}
      />
    </>
  );
}
