// src/components/campaign/CampaignCard.tsx
import { Campaign } from '../../types';
import Link from 'next/link';

interface CampaignCardProps {
  campaign: Campaign;
}

export default function CampaignCard({ campaign }: CampaignCardProps) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg">{campaign.name}</h3>
          <p className="text-gray-600 text-sm">
            {new Date(campaign.createdAt).toLocaleDateString()}
          </p>
        </div>
        <span className={`px-2 py-1 text-xs rounded-full ${
          campaign.status === 'sent' ? 'bg-green-100 text-green-800' :
          campaign.status === 'failed' ? 'bg-red-100 text-red-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {campaign.status}
        </span>
      </div>
      <div className="mt-4 flex justify-end">
        <Link href={`/campaigns/${campaign.id}`} className="text-blue-600 hover:text-blue-800 text-sm">
          View Details →
        </Link>
      </div>
    </div>
  );
}