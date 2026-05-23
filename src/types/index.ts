/**
 * src/types/index.ts
 * ====================
 * Shared TypeScript types for Cheers Magazine.
 */

// ---- Magazine ----
export interface MagazineIssue {
  id: string;
  number: string;
  title: string;
  date: string;
  description: string;
  available: boolean;
  coverImageUrl?: string;
  pageCount?: number;
  pdfUrl?: string;
  tags?: string[];
}

export interface MagazinePage {
  id: number;
  issueId: string;
  pageNumber: number;
  imageUrl: string;
  thumbnailUrl?: string;
  alt?: string;
  width?: number;
  height?: number;
}

// ---- Reader State ----
export interface ReaderState {
  currentPage: number;
  totalPages: number;
  isFlipping: boolean;
  flipDirection: 'next' | 'prev';
  zoom: number;
  isFullscreen: boolean;
  isMuted: boolean;
  showThumbnails: boolean;
  isLoading: boolean;
}

// ---- User / Auth ----
export interface User {
  id: string;
  email: string;
  name?: string;
  subscriptionStatus: 'active' | 'inactive' | 'trial' | 'expired';
  subscriptionPlan?: 'monthly' | 'annual' | 'single';
  createdAt: string;
}

// ---- Subscription Plans ----
export type SubscriptionPlanId = 'monthly' | 'annual' | 'single';

export interface SubscriptionPlan {
  id: SubscriptionPlanId;
  label: string;
  price: number;
  currency: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
}

// ---- Sound ----
export type SoundId =
  | 'page-flip-soft'
  | 'page-flip-hard'
  | 'page-flip-quick'
  | 'luxury-hover'
  | 'nav-hover'
  | 'premium-click'
  | 'nav-click'
  | 'cinematic-transition'
  | 'smooth-transition'
  | 'success-notification'
  | 'error-notification'
  | 'magazine-open'
  | 'reader-ambient';

// ---- API Responses ----
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

// ---- PDF Processing ----
export interface PDFProcessingResult {
  success: boolean;
  fileName: string;
  pageCount: number;
  pages: MagazinePage[];
  originalSizeKB: number;
  processedSizeKB: number;
  compressionRatio: number;
  processingTimeMs: number;
  error?: string;
}

// ---- Feature Flags ----
export type FeatureFlagKey =
  | 'sounds'
  | 'animations'
  | 'antiPiracy'
  | 'watermark'
  | 'fullscreen'
  | 'debugMode'
  | 'payments';

// ---- Analytics Events ----
export type AnalyticsEventName =
  | 'page_view'
  | 'reader_open'
  | 'reader_close'
  | 'page_flip'
  | 'zoom_change'
  | 'fullscreen_enter'
  | 'fullscreen_exit'
  | 'sound_toggle'
  | 'subscription_start'
  | 'subscription_complete'
  | 'pdf_upload'
  | 'pdf_processed';

export interface AnalyticsEvent {
  name: AnalyticsEventName;
  properties?: Record<string, string | number | boolean>;
  timestamp?: string;
}
