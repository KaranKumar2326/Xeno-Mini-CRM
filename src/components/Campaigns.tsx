import {
  BarChart3, Users, MessageSquare, PieChart, Mail, 
  TrendingUp, Settings, Bell, Search, LogOut, 
  ChevronRight, Plus, Filter, Menu, X
} from 'lucide-react';
import { motion } from 'framer-motion';





export const CampaignsPage = () => (
  <div className="bg-white rounded-xl border border-gray-200 p-6">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold text-gray-900">Campaigns</h2>
      <button className="flex items-center text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
        <Plus size={16} className="mr-1" /> New Campaign
      </button>
    </div>
    <div className="space-y-4">
      {[1, 2, 3].map(i => (
        <div key={i} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">Campaign {i}</h3>
              <p className="text-sm text-gray-500 mt-1">Last sent: {new Date().toLocaleDateString()}</p>
            </div>
            <div className="flex space-x-2">
              <button className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                Edit
              </button>
              <button className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full">
                Send
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default CampaignsPage;