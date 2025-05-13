import {
  BarChart3, Users, MessageSquare, PieChart, Mail, 
  TrendingUp, Settings, Bell, Search, LogOut, 
  ChevronRight, Plus, Filter, Menu, X
} from 'lucide-react';
import { motion } from 'framer-motion';



const SegmentsPage = () => (
  <div className="bg-white rounded-xl border border-gray-200 p-6">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold text-gray-900">Segments</h2>
      <button className="flex items-center text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
        <Plus size={16} className="mr-1" /> New Segment
      </button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {['Premium', 'Active', 'Inactive'].map((segment, i) => (
        <div key={i} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
          <div className="flex justify-between">
            <h3 className="font-medium">{segment} Users</h3>
            <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
              {Math.floor(Math.random() * 1000)} users
            </span>
          </div>
          <div className="mt-3 h-32 bg-gray-50 rounded flex items-center justify-center text-gray-400">
            Segment Chart
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default SegmentsPage;