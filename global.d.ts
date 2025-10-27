declare module "bootstrap/dist/js/bootstrap.bundle.min";

// Google Analytics gtag types
interface Window {
  gtag: (
    command: 'config' | 'event' | 'js' | 'set',
    targetId: string | Date,
    config?: Record<string, any>
  ) => void;
  dataLayer: any[];
}