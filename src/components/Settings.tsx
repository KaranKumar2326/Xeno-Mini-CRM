import {
  BarChart3, Users, MessageSquare, PieChart, Mail, 
  TrendingUp, Settings, Bell, Search, LogOut, 
  ChevronRight, Plus, Filter, Menu, X
} from 'lucide-react';
import { motion } from 'framer-motion';




const SettingsPage = () => (
  <div className="bg-white rounded-xl border border-gray-200 p-6">
    <h2 className="text-xl font-semibold text-gray-900 mb-4">Settings</h2>
    <div className="space-y-4">
      <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
        <h3 className="font-medium">Account Settings</h3>
        <p className="text-sm text-gray-500 mt-1">Update your account information</p>
      </div>
      <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
        <h3 className="font-medium">Notifications</h3>
        <p className="text-sm text-gray-500 mt-1">Configure notification preferences</p>
      </div>
      <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
        <h3 className="font-medium">Integrations</h3>
        <p className="text-sm text-gray-500 mt-1">Connect with other services</p>
      </div>
    </div>
  </div>
);
export default SettingsPage;