// pages/api/campaigns/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { Campaign } from '../../../types';

let campaigns: Campaign[] = []; // Mock database

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;

    if (req.method === 'GET') {
      const campaign = campaigns.find(c => c.id === id);
      if (!campaign) {
        return res.status(404).json({ error: 'Campaign not found' });
      }
      return res.status(200).json(campaign);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}