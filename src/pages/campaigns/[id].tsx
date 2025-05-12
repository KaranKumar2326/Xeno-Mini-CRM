// src/pages/campaigns/[id].tsx
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { getCampaignDetails } from '../../lib/api';

export default function CampaignDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;

    const fetchCampaign = async () => {
      try {
        const data = await getCampaignDetails(id as string);
        setCampaign(data);
      } catch (err) {
        setError('Failed to load campaign details');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCampaign();
  }, [id]);

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <p>Loading campaign details...</p>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <p>Campaign not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{campaign.name}</h1>
        <span className={`px-3 py-1 rounded-full text-sm ${
          campaign.status === 'sent' ? 'bg-green-100 text-green-800' :
          campaign.status === 'failed' ? 'bg-red-100 text-red-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {campaign.status}
        </span>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Message Template</h2>
        <div className="bg-gray-50 p-4 rounded">
          <p className="whitespace-pre-line">{campaign.messageTemplate}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Delivery Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded">
            <h3 className="text-sm font-medium text-blue-800">Total Sent</h3>
            <p className="text-2xl font-bold">{campaign.totalCount}</p>
          </div>
          <div className="bg-green-50 p-4 rounded">
            <h3 className="text-sm font-medium text-green-800">Successful</h3>
            <p className="text-2xl font-bold">{campaign.sentCount}</p>
          </div>
          <div className="bg-red-50 p-4 rounded">
            <h3 className="text-sm font-medium text-red-800">Failed</h3>
            <p className="text-2xl font-bold">{campaign.failedCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}