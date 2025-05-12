import { useState } from 'react';
import { RuleGroup, Segment } from '../../types'; // Adjust the path to where RuleGroup and Segment are defined
import { useRouter } from 'next/router';
import RuleBuilder from '../../components/campaign/RuleBuilder';
import SegmentPreview from '../../components/campaign/SegmentPreview';
import { createCampaign, evaluateSegment } from '../../lib/api';

export default function NewCampaignPage() {
  const router = useRouter();
  const [campaignName, setCampaignName] = useState('');
  const [messageTemplate, setMessageTemplate] = useState('Hi {name}, here\'s 10% off your next order!');
  const [rules, setRules] = useState<RuleGroup>({
    condition: 'AND',
    rules: []
  });
  const [segment, setSegment] = useState<Segment | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEvaluate = async () => {
    try {
      setIsLoading(true);
      const result = await evaluateSegment(rules);
      setSegment({
        id: 'temp',
        name: 'Preview Segment',
        rules,
        customerCount: result.count
      });
      setError('');
    } catch (err) {
      setError('Failed to evaluate segment');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!segment || segment.customerCount === 0) {
      setError('Segment must include at least one customer');
      return;
    }

    setIsLoading(true);
    try {
      const newCampaign = await createCampaign({
        name: campaignName,
        rules,
        messageTemplate,
        audienceSize: segment.customerCount
      });
      router.push(`/campaigns/${newCampaign.id}`);
    } catch (err) {
      setError('Failed to create campaign');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create New Campaign</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Campaign Name</label>
          <input
            type="text"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Summer Sale 2023"
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Target Segment</h2>
          <RuleBuilder rules={rules} onChange={setRules} />
          
          <div className="mt-4 flex items-center gap-4">
            <button
              onClick={handleEvaluate}
              disabled={rules.rules.length === 0 || isLoading}
              className={`px-4 py-2 rounded ${
                rules.rules.length === 0 ? 'bg-gray-200' : 'bg-blue-500 text-white'
              }`}
            >
              {isLoading ? 'Evaluating...' : 'Preview Segment Size'}
            </button>
          </div>
          
          {segment && <SegmentPreview segment={segment} />}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Message Template</label>
          <textarea
            value={messageTemplate}
            onChange={(e) => setMessageTemplate(e.target.value)}
            className="w-full border p-2 rounded h-32"
            placeholder="Personalized message for customers"
          />
          <p className="text-sm text-gray-500 mt-1">
            Use {'{name}'} to include customer's name
          </p>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={!segment || segment.customerCount === 0 || isLoading}
            className={`px-4 py-2 rounded text-white ${
              !segment || segment.customerCount === 0 ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {isLoading ? 'Creating...' : 'Create Campaign'}
          </button>
        </div>
      </div>
    </div>
  );
}