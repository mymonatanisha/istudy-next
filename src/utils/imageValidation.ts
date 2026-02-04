/**
 * Image URL validation utility
 * Validates that a URL is a proper image URL with valid protocol and format
 */

/**
 * Validates if a given URL is a valid image URL
 * @param url - The URL to validate
 * @returns true if the URL is valid and appears to be an image, false otherwise
 */
export const validateImageUrl = (url: string | null | undefined): boolean => {
  if (!url || url.trim() === '') return false;
  
  try {
    const urlObj = new URL(url);
    
    // Only allow http and https protocols for security
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return false;
    }
    
    // Check if URL ends with common image extensions
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp', '.ico'];
    const pathname = urlObj.pathname.toLowerCase();
    const hasImageExtension = imageExtensions.some(ext => pathname.endsWith(ext));
    
    // Only accept URLs with explicit image extensions for security
    // This prevents overly permissive matching and potential false positives
    return hasImageExtension;
  } catch {
    // Invalid URL format
    return false;
  }
};

/**
 * Sanitizes an image URL by ensuring it's a valid format
 * @param url - The URL to sanitize
 * @returns The sanitized URL or null if invalid
 */
export const sanitizeImageUrl = (url: string | null | undefined): string | null => {
  if (!validateImageUrl(url)) {
    return null;
  }
  return url!.trim();
};
