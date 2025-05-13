const AnalyticsPage = () => (
  <div className="bg-white rounded-xl border border-gray-200 p-6">
    <h2 className="text-xl font-semibold text-gray-900 mb-4">Analytics</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="border border-gray-200 rounded-lg p-4">
        <h3 className="font-medium text-gray-900 mb-3">Engagement</h3>
        <div className="h-64 bg-gray-50 rounded flex items-center justify-center text-gray-400">
          Engagement Chart
        </div>
      </div>
      <div className="border border-gray-200 rounded-lg p-4">
        <h3 className="font-medium text-gray-900 mb-3">Performance</h3>
        <div className="h-64 bg-gray-50 rounded flex items-center justify-center text-gray-400">
          Performance Chart
        </div>
      </div>
    </div>
  </div>
);
export default AnalyticsPage;