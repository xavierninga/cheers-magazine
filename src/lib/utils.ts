/**
 * src/lib/utils.ts
 * =================
 * Shared utility functions for Cheers Magazine.
 */

/** Combine CSS class names (like clsx but tiny) */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/** Format a file size in bytes to a human-readable string */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Clamp a number between min and max */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/** Sleep for a given number of milliseconds */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/** Debounce a function */
export function debounce<T extends (...args: any[]) => void>(fn: T, delay: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return ((...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  }) as T;
}

/** Generate a unique ID */
export function generateId(prefix = 'id'): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}

/** Check if running in browser */
export const isBrowser = typeof window !== 'undefined';

/** Check if device is mobile */
export function isMobile(): boolean {
  if (!isBrowser) return false;
  return window.matchMedia('(max-width: 768px)').matches;
}

/** Check if device supports touch */
export function isTouchDevice(): boolean {
  if (!isBrowser) return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/** Convert base64 to Blob */
export function base64ToBlob(base64: string, mimeType = 'image/jpeg'): Blob {
  const byteString = atob(base64.split(',')[1]);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const intArray = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) {
    intArray[i] = byteString.charCodeAt(i);
  }
  return new Blob([arrayBuffer], { type: mimeType });
}

/** Calculate reading progress percentage */
export function calculateReadingProgress(currentPage: number, totalPages: number): number {
  if (totalPages <= 0) return 0;
  return clamp(Math.round(((currentPage + 1) / totalPages) * 100), 0, 100);
}

/** Format a date string nicely */
export function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
    });
  } catch {
    return dateStr;
  }
}
