/**
 * pages/dev-testing/pdf-upload.tsx
 * ==================================
 * 📄 PDF Upload Test — Drag & drop PDF, extract pages,
 * view conversion logs, and generate page previews.
 */

import Head from 'next/head';
import Link from 'next/link';
import { useState, useCallback } from 'react';

interface ConversionLog {
  time: string;
  level: 'info' | 'success' | 'error' | 'warn';
  message: string;
}

interface ExtractedPage {
  pageNumber: number;
  width: number;
  height: number;
  dataUrl: string;
}

function timestamp(): string {
  return new Date().toLocaleTimeString('en-US', { hour12: false });
}

export default function PDFUploadTestPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<string | null>(null);
  const [pages, setPages] = useState<ExtractedPage[]>([]);
  const [logs, setLogs] = useState<ConversionLog[]>([]);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const addLog = useCallback((level: ConversionLog['level'], message: string) => {
    setLogs(prev => [{ time: timestamp(), level, message }, ...prev]);
  }, []);

  const processFile = useCallback(async (file: File) => {
    if (file.type !== 'application/pdf') {
      addLog('error', `Invalid file type: ${file.type}. Only PDF accepted.`);
      return;
    }

    setPages([]);
    setProcessing(true);
    setProgress(0);
    setFileName(file.name);
    setFileSize(`${(file.size / 1024).toFixed(1)} KB`);

    addLog('info', `Loading file: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`);
    addLog('info', 'Initializing PDF.js worker...');

    try {
      // Dynamic import to avoid SSR issues
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

      addLog('info', `PDF.js version: ${pdfjsLib.version}`);

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

      addLog('success', `PDF loaded. Total pages: ${pdf.numPages}`);
      setProgress(10);

      const extractedPages: ExtractedPage[] = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        addLog('info', `Rendering page ${i}/${pdf.numPages}...`);
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 1.5 });

        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext('2d')!;

        await page.render({ canvasContext: ctx, viewport }).promise;
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);

        extractedPages.push({
          pageNumber: i,
          width: Math.round(viewport.width),
          height: Math.round(viewport.height),
          dataUrl,
        });

        setProgress(10 + Math.round((i / pdf.numPages) * 85));
        setPages([...extractedPages]);
        addLog('success', `Page ${i} rendered: ${Math.round(viewport.width)}×${Math.round(viewport.height)}px`);
      }

      setProgress(100);
      addLog('success', `✅ All ${pdf.numPages} pages extracted successfully!`);
      addLog('info', `Original size: ${(file.size / 1024).toFixed(1)} KB`);

      // Estimate compression
      const totalDataUrlSize = extractedPages.reduce((sum, p) => sum + p.dataUrl.length * 0.75, 0);
      addLog('info', `Estimated image data: ${(totalDataUrlSize / 1024).toFixed(1)} KB`);
    } catch (err: any) {
      addLog('error', `PDF extraction failed: ${err?.message || 'Unknown error'}`);
      console.error('PDF error:', err);
    } finally {
      setProcessing(false);
    }
  }, [addLog]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }, [processFile]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  }, [processFile]);

  return (
    <>
      <Head><title>📄 PDF Upload Test — Cheers Dev Testing</title></Head>
      <div style={{ minHeight: '100vh', background: '#0A0A0A', color: '#F5F5F0', fontFamily: "'Barlow Condensed', sans-serif" }}>

        <div style={{ background: '#111', borderBottom: '1px solid #C8102E', padding: '1rem 2rem', display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link href="/dev-testing" style={{ color: 'rgba(245,245,240,0.5)', textDecoration: 'none', fontSize: '0.8rem' }}>← Dev Hub</Link>
          <span style={{ color: '#2D2D2D' }}>|</span>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 700 }}>📄 PDF Upload Test</h1>
        </div>

        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>

          {/* LEFT COLUMN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* Drop Zone */}
            <div
              onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              style={{
                border: `2px dashed ${isDragging ? '#C8102E' : '#2D2D2D'}`,
                borderRadius: 8,
                padding: '3rem 2rem',
                textAlign: 'center',
                background: isDragging ? 'rgba(200,16,46,0.05)' : '#1A1A1A',
                transition: 'all 0.2s',
                cursor: 'pointer',
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📄</div>
              <p style={{ fontSize: '1rem', letterSpacing: '0.05em', marginBottom: 6 }}>Drag & drop a PDF here</p>
              <p style={{ fontSize: '0.8rem', opacity: 0.4, marginBottom: '1.2rem' }}>or click to browse</p>
              <label style={{
                display: 'inline-block',
                padding: '0.6rem 1.5rem',
                background: '#C8102E',
                color: 'white',
                borderRadius: 4,
                cursor: 'pointer',
                fontSize: '0.85rem',
                letterSpacing: '0.1em',
              }}>
                Browse PDF
                <input type="file" accept=".pdf" onChange={handleFileInput} style={{ display: 'none' }} />
              </label>
            </div>

            {/* File Info */}
            {fileName && (
              <div style={{ background: '#1A1A1A', border: '1px solid #2D2D2D', borderRadius: 6, padding: '1rem' }}>
                <p style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: '#C8102E', marginBottom: 8 }}>FILE INFO</p>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.85rem', marginBottom: 4 }}>{fileName}</p>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', opacity: 0.5 }}>{fileSize}</p>
              </div>
            )}

            {/* Progress */}
            {processing && (
              <div style={{ background: '#1A1A1A', border: '1px solid #2D2D2D', borderRadius: 6, padding: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: '0.8rem', letterSpacing: '0.1em' }}>Processing...</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem', color: '#C8102E' }}>{progress}%</span>
                </div>
                <div style={{ height: 4, background: '#2D2D2D', borderRadius: 2 }}>
                  <div style={{ height: '100%', width: `${progress}%`, background: '#C8102E', borderRadius: 2, transition: 'width 0.3s' }} />
                </div>
              </div>
            )}

            {/* Conversion Logs */}
            <div style={{ background: '#0A0A0A', border: '1px solid #2D2D2D', borderRadius: 6, overflow: 'hidden' }}>
              <div style={{ padding: '0.8rem 1rem', borderBottom: '1px solid #2D2D2D', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: '#C8102E' }}>CONVERSION LOGS</span>
                {logs.length > 0 && (
                  <button onClick={() => setLogs([])} style={{ background: 'none', border: 'none', color: 'rgba(245,245,240,0.3)', cursor: 'pointer', fontSize: '0.7rem' }}>Clear</button>
                )}
              </div>
              <div style={{ padding: '0.8rem', maxHeight: 240, overflowY: 'auto', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem' }}>
                {logs.length === 0 ? (
                  <p style={{ opacity: 0.3, textAlign: 'center', padding: '1rem' }}>No logs yet. Upload a PDF.</p>
                ) : logs.map((log, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
                    <span style={{ opacity: 0.4, flexShrink: 0 }}>{log.time}</span>
                    <span style={{ color: log.level === 'error' ? '#C8102E' : log.level === 'success' ? '#4CAF50' : log.level === 'warn' ? '#FF9800' : 'rgba(245,245,240,0.7)' }}>
                      [{log.level.toUpperCase()}]
                    </span>
                    <span style={{ opacity: 0.8 }}>{log.message}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — Page Previews */}
          <div>
            <p style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: '#C8102E', marginBottom: '1rem' }}>
              EXTRACTED PAGES ({pages.length})
            </p>
            {pages.length === 0 ? (
              <div style={{ background: '#1A1A1A', border: '1px dashed #2D2D2D', borderRadius: 6, padding: '3rem', textAlign: 'center', opacity: 0.4 }}>
                <p style={{ fontSize: '0.9rem' }}>Pages will appear here after upload</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.8rem', maxHeight: '70vh', overflowY: 'auto' }}>
                {pages.map(page => (
                  <div key={page.pageNumber} style={{ background: '#1A1A1A', border: '1px solid #2D2D2D', borderRadius: 4, overflow: 'hidden' }}>
                    <img
                      src={page.dataUrl}
                      alt={`Page ${page.pageNumber}`}
                      style={{ width: '100%', display: 'block' }}
                    />
                    <div style={{ padding: '6px 8px', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', opacity: 0.5 }}>
                      Page {page.pageNumber} · {page.width}×{page.height}px
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
