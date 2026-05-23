/**
 * pages/api/health.ts
 * ====================
 * Health check endpoint for Vercel / monitoring.
 * GET /api/health → { status: 'ok', ... }
 */

import type { NextApiRequest, NextApiResponse } from 'next';

interface HealthResponse {
  status: 'ok' | 'error';
  app: string;
  version: string;
  env: string;
  timestamp: string;
  uptime: number;
  features: Record<string, boolean>;
}

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<HealthResponse>
) {
  res.status(200).json({
    status: 'ok',
    app: 'Cheers Magazine',
    version: '1.0.0',
    env: process.env.NEXT_PUBLIC_APP_ENV || 'development',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    features: {
      sounds:     process.env.NEXT_PUBLIC_FEATURE_SOUNDS !== 'false',
      animations: process.env.NEXT_PUBLIC_FEATURE_ANIMATIONS !== 'false',
      antiPiracy: process.env.NEXT_PUBLIC_FEATURE_ANTI_PIRACY === 'true',
      watermark:  process.env.NEXT_PUBLIC_FEATURE_WATERMARK !== 'false',
      payments:   process.env.NEXT_PUBLIC_FEATURE_PAYMENTS === 'true',
      debugMode:  process.env.NEXT_PUBLIC_FEATURE_DEBUG_MODE === 'true',
    },
  });
}
