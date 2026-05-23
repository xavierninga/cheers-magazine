/**
 * src/lib/pdf-processor.ts
 * ==========================
 * PDF → image page extractor using PDF.js.
 * Used for converting uploaded PDFs into magazine pages.
 */

export interface ExtractedPage {
  pageNumber: number;
  dataUrl: string;
  width: number;
  height: number;
  fileSizeBytes: number;
}

export interface PDFExtractionOptions {
  scale?: number;        // Render scale (1.5 = good quality, 2 = high quality)
  quality?: number;      // JPEG quality 0–1
  format?: 'jpeg' | 'png';
  maxPages?: number;     // Limit extraction to N pages
  onProgress?: (page: number, total: number) => void;
  onLog?: (level: 'info' | 'success' | 'error', msg: string) => void;
}

export interface PDFExtractionResult {
  success: boolean;
  pages: ExtractedPage[];
  totalPages: number;
  originalSizeBytes: number;
  processingTimeMs: number;
  error?: string;
}

/**
 * Extract all pages from a PDF file as images.
 * Runs in the browser using PDF.js.
 */
export async function extractPDFPages(
  file: File,
  options: PDFExtractionOptions = {}
): Promise<PDFExtractionResult> {
  const {
    scale = 1.5,
    quality = 0.85,
    format = 'jpeg',
    maxPages,
    onProgress,
    onLog,
  } = options;

  const log = (level: 'info' | 'success' | 'error', msg: string) => onLog?.(level, msg);
  const startTime = Date.now();

  try {
    log('info', `Loading PDF: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`);

    const pdfjsLib = await import('pdfjs-dist');
    pdfjsLib.GlobalWorkerOptions.workerSrc =
      `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    const total = maxPages ? Math.min(maxPages, pdf.numPages) : pdf.numPages;
    log('success', `PDF loaded. Pages: ${pdf.numPages}${maxPages ? ` (extracting ${total})` : ''}`);

    const pages: ExtractedPage[] = [];

    for (let i = 1; i <= total; i++) {
      log('info', `Rendering page ${i}/${total}...`);
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale });

      const canvas = document.createElement('canvas');
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const ctx = canvas.getContext('2d')!;

      await page.render({ canvasContext: ctx, viewport }).promise;

      const mimeType = format === 'png' ? 'image/png' : 'image/jpeg';
      const dataUrl = canvas.toDataURL(mimeType, quality);
      const fileSizeBytes = Math.round(dataUrl.length * 0.75); // approx base64 decode

      pages.push({
        pageNumber: i,
        dataUrl,
        width: Math.round(viewport.width),
        height: Math.round(viewport.height),
        fileSizeBytes,
      });

      onProgress?.(i, total);
      log('success', `Page ${i} ✓ — ${Math.round(viewport.width)}×${Math.round(viewport.height)}px (${(fileSizeBytes / 1024).toFixed(1)} KB)`);
    }

    const processingTimeMs = Date.now() - startTime;
    log('success', `✅ Done! ${pages.length} pages in ${(processingTimeMs / 1000).toFixed(1)}s`);

    return {
      success: true,
      pages,
      totalPages: pdf.numPages,
      originalSizeBytes: file.size,
      processingTimeMs,
    };
  } catch (err: any) {
    const msg = err?.message || 'Unknown error';
    log('error', `Failed: ${msg}`);
    return {
      success: false,
      pages: [],
      totalPages: 0,
      originalSizeBytes: file.size,
      processingTimeMs: Date.now() - startTime,
      error: msg,
    };
  }
}
