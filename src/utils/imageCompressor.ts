/**
 * High-performance client-side image compressor.
 * Downscales large camera photos (3MB - 20MB) to optimized WebP format (~60KB - 120KB)
 * using HTML5 Canvas. This prevents localStorage quota overflow and ensures instant
 * cloud synchronization across all devices.
 */
export async function compressImageFile(
  file: File | Blob,
  maxWidth = 1400,
  maxHeight = 1400,
  quality = 0.82
): Promise<string> {
  return new Promise((resolve, reject) => {
    // If not an image, reject
    if (file.type && !file.type.startsWith('image/')) {
      return reject(new Error('Invalid image file'));
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.onload = (e) => {
      const src = e.target?.result as string;
      if (!src) {
        return reject(new Error('Empty image result'));
      }

      const img = new Image();
      img.onerror = () => reject(new Error('Failed to load image for compression'));
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Proportional resize if larger than maximum dimension
        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = Math.max(width, 1);
        canvas.height = Math.max(height, 1);
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          // Fallback to original data URL if canvas context unavailable
          resolve(src);
          return;
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Try WebP first (modern, highly compressed)
        try {
          const webpData = canvas.toDataURL('image/webp', quality);
          if (webpData.startsWith('data:image/webp')) {
            resolve(webpData);
            return;
          }
        } catch {
          // Ignore and fallback
        }

        // Fallback to JPEG if WebP encoding unsupported
        try {
          const jpegData = canvas.toDataURL('image/jpeg', quality);
          resolve(jpegData);
        } catch (err) {
          resolve(src);
        }
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Generate a valid RFC4122 v4 UUID that is safe for Postgres UUID primary keys.
 */
export function generateSafeUUID(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    try {
      return crypto.randomUUID();
    } catch {}
  }
  // Math.random fallback implementing RFC4122 v4 UUID format
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
