/**
 * pages/api/issues/index.ts
 * ==========================
 * Returns all available magazine issues.
 * In production, connect to a CMS or database.
 */

import type { NextApiRequest, NextApiResponse } from 'next';

export interface MagazineIssue {
  id: string;
  number: string;
  title: string;
  date: string;
  description: string;
  available: boolean;
  coverImageUrl?: string;
  pageCount?: number;
  tags?: string[];
}

const ISSUES_DATA: MagazineIssue[] = [
  {
    id: 'issue-001',
    number: '001',
    title: 'Premier Issue',
    date: 'May 2026',
    description: 'The inaugural edition — lifestyle, culture, and entertainment.',
    available: true,
    pageCount: 64,
    tags: ['lifestyle', 'culture', 'debut'],
  },
  {
    id: 'issue-002',
    number: '002',
    title: 'Summer Edition',
    date: 'June 2026',
    description: 'Summer special — travel, fashion, and outdoor living.',
    available: false,
    pageCount: 72,
    tags: ['summer', 'travel', 'fashion'],
  },
  {
    id: 'issue-003',
    number: '003',
    title: 'Culture & Arts',
    date: 'July 2026',
    description: 'Deep dive into Cameroonian art, music, and cultural heritage.',
    available: false,
    pageCount: 80,
    tags: ['culture', 'arts', 'music'],
  },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { available } = req.query;
    let issues = ISSUES_DATA;
    if (available === 'true') {
      issues = issues.filter(i => i.available);
    }
    return res.status(200).json({ success: true, count: issues.length, issues });
  }
  res.status(405).json({ success: false, message: 'Method not allowed' });
}
