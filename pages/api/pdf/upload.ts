/**
 * pages/api/pdf/upload.ts
 * ========================
 * API route: PDF upload handler.
 * Receives PDF, validates, stores temporarily, returns metadata.
 * In production, connect to S3 or Cloudinary for storage.
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm, type File } from 'formidable';
import path from 'path';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false, // Required for file uploads
  },
};

interface UploadResponse {
  success: boolean;
  message: string;
  file?: {
    name: string;
    size: number;
    path: string;
    mimetype: string;
  };
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UploadResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  // Ensure upload temp dir exists
  const uploadDir = path.join(process.cwd(), 'tmp', 'uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const form = new IncomingForm({
    uploadDir,
    keepExtensions: true,
    maxFileSize: 100 * 1024 * 1024, // 100 MB
    filter: ({ mimetype }) => mimetype === 'application/pdf',
  });

  form.parse(req, (err, _fields, files) => {
    if (err) {
      console.error('[PDF Upload API] Parse error:', err);
      return res.status(500).json({ success: false, message: 'Upload failed', error: err.message });
    }

    const file = Array.isArray(files.pdf) ? files.pdf[0] : files.pdf as File | undefined;

    if (!file) {
      return res.status(400).json({ success: false, message: 'No PDF file provided' });
    }

    return res.status(200).json({
      success: true,
      message: 'PDF uploaded successfully',
      file: {
        name: file.originalFilename || 'unknown.pdf',
        size: file.size,
        path: file.filepath,
        mimetype: file.mimetype || 'application/pdf',
      },
    });
  });
}
