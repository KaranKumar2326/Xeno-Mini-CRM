import {
  BarChart3, Users, MessageSquare, PieChart, Mail, 
  TrendingUp, Settings, Bell, Search, LogOut, 
  ChevronRight, Plus, Filter, Menu, X
} from 'lucide-react';
import { motion } from 'framer-motion';




const TemplatesPage = () => (
  <div className="bg-white rounded-xl border border-gray-200 p-6">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold text-gray-900">Templates</h2>
      <button className="flex items-center text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
        <Plus size={16} className="mr-1" /> New Template
      </button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {['Welcome', 'Promotion', 'Newsletter'].map((template, i) => (
        <div key={i} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
          <div className="h-40 bg-gray-100 flex items-center justify-center text-gray-400">
            Template Preview
          </div>
          <div className="p-4">
            <h3 className="font-medium">{template} Template</h3>
            <p className="text-sm text-gray-500 mt-1">Last used: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default TemplatesPage;