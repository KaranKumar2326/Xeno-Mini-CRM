import { Segment } from '../../types';

interface SegmentPreviewProps {
  segment: Segment;
}

export default function SegmentPreview({ segment }: SegmentPreviewProps) {
  return (
    <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-medium text-blue-800">Segment Preview</h3>
          <p className="text-blue-600">
            {segment.customerCount} customers match these rules
          </p>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm ${
          segment.customerCount > 0 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {segment.customerCount > 0 ? 'Valid' : 'Empty'}
        </div>
      </div>
    </div>
  );
}