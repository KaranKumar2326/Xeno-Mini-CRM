import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCampaigns } from '../../lib/api';
import { Campaign } from '../../types';

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadCampaigns = async () => {
      try {
        const data = await getCampaigns();
        setCampaigns(data);
      } catch (err) {
        setError('Failed to load campaigns');
      } finally {
        setIsLoading(false);
      }
    };
    loadCampaigns();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Campaigns</h1>
        <Link href="/campaigns/new" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          New Campaign
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {isLoading ? (
        <p>Loading campaigns...</p>
      ) : (
        <div className="space-y-4">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-semibold">{campaign.name}</h2>
                  <p className="text-sm text-gray-500">
                    Created: {new Date(campaign.createdAt).toLocaleString()}
                  </p>
                  <p className="text-sm mt-1">
                    Audience: {campaign.audienceSize} customers
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
              <div className="mt-3 flex justify-between text-sm">
                {campaign.sentCount && (
                  <span>Sent: {campaign.sentCount}</span>
                )}
                {campaign.failedCount && (
                  <span>Failed: {campaign.failedCount}</span>
                )}
                <Link href={`/campaigns/${campaign.id}`} className="text-blue-600 hover:text-blue-800">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}