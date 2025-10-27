// Google Analytics utility functions
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (!GA_ID) return;
  
  window.gtag('config', GA_ID, {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = (
  action: string,
  { event_category, event_label, value }: {
    event_category?: string;
    event_label?: string;
    value?: number;
  }
) => {
  if (!GA_ID) return;
  
  window.gtag('event', action, {
    event_category,
    event_label,
    value,
  });
};
