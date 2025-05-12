// pages/api/campaigns.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { Campaign, RuleGroup } from '../../types';

let campaigns: Campaign[] = []; // Mock database

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'POST') {
      const { name, rules, messageTemplate, audienceSize } = req.body;
      
      const newCampaign: Campaign = {
        id: Date.now().toString(),
        name,
        rules,
        messageTemplate,
        audienceSize,
        status: 'draft',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      campaigns.unshift(newCampaign); // Add to beginning (most recent first)
      return res.status(201).json(newCampaign);
    }

    if (req.method === 'GET') {
      return res.status(200).json(campaigns);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}