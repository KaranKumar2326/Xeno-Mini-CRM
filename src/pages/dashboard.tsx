'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  BarChart3, Users, MessageSquare, PieChart, Mail, 
  TrendingUp, Settings, Bell, Search, LogOut, 
  ChevronRight, Plus, Menu, X
} from 'lucide-react';

// Components (these would be in separate files)
const Customers = () => <div>Customers Component</div>;
const Campaigns = () => <div>Campaigns Component</div>;
const Segments = () => <div>Segments Component</div>;
const Templates = () => <div>Templates Component</div>;
const Analytics = () => <div>Analytics Component</div>;
const SettingsPage = () => <div>Settings Component</div>;

type User = {
  name: string;
  email: string;
  photo?: string;
  role: string;
};

type Campaign = {
  id: number;
  name: string;
  date: string;
  audience: number;
  status: 'Completed' | 'Scheduled' | 'Draft';
  openRate?: string;
};

const StatCard = ({ title, value, icon, trend }: { 
  title: string; 
  value: string | number; 
  icon: React.ReactNode;
  trend?: 'up' | 'down';
}) => (
  <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-xs">
    <div className="flex justify-between">
      <div>
        <p className="text-xs font-medium text-gray-500">{title}</p>
        <p className="text-xl font-semibold text-gray-900 mt-1">{value}</p>
      </div>
      <div className={`p-2 rounded-lg ${trend === 'up' ? 'bg-green-50' : trend === 'down' ? 'bg-red-50' : 'bg-gray-50'}`}>
        {icon}
      </div>
    </div>
  </div>
);

const CampaignItem = ({ campaign }: { campaign: Campaign }) => (
  <div className="flex justify-between items-center p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
    <div>
      <h4 className="text-sm font-medium text-gray-900">{campaign.name}</h4>
      <p className="text-xs text-gray-500 mt-1">Audience: {campaign.audience.toLocaleString()}</p>
    </div>
    <div className="text-right">
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        campaign.status === 'Completed' ? 'bg-green-100 text-green-800' :
        campaign.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
        'bg-gray-100 text-gray-800'
      }`}>
        {campaign.status}
      </span>
      <p className="text-xs text-gray-500 mt-1">{new Date(campaign.date).toLocaleDateString()}</p>
      {campaign.openRate && (
        <p className="text-xs font-medium mt-1 text-gray-700">
          Open: <span className="text-green-600">{campaign.openRate}</span>
        </p>
      )}
    </div>
  </div>
);

const QuickAction = ({ title, description, icon, onClick }: {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}) => (
  <button 
    onClick={onClick}
    className="flex items-start p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left w-full group"
  >
    <div className="mr-4 p-2 rounded-lg bg-gray-50 group-hover:bg-indigo-50 transition-colors">
      {icon}
    </div>
    <div>
      <h4 className="text-sm font-medium text-gray-900">{title}</h4>
      <p className="text-xs text-gray-500 mt-1">{description}</p>
    </div>
  </button>
);

const Dashboard = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [user, setUser] = useState<User>({
    name: '',
    email: '',
    photo: '',
    role: 'User'
  });

  const stats = {
    totalCustomers: 12458,
    activeSegments: 24,
    campaignsSent: 142,
    openRate: '72%',
    growthRate: 12.5
  };

  const recentCampaigns = [
    { id: 1, name: 'Summer Sale 2023', date: '2023-07-15', audience: 12458, status: 'Completed' as const, openRate: '74%' },
    { id: 2, name: 'New Product Launch', date: '2023-07-10', audience: 9872, status: 'Completed' as const, openRate: '68%' },
    { id: 3, name: 'Customer Survey', date: '2023-07-05', audience: 15600, status: 'Completed' as const, openRate: '62%' }
  ];

  const upcomingCampaigns = [
    { id: 4, name: 'Back to School', date: '2023-08-20', audience: 18200, status: 'Scheduled' as const },
    { id: 5, name: 'Fall Collection', date: '2023-09-05', audience: 21500, status: 'Draft' as const }
  ];

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUser({
        name: payload.displayName || 'User',
        email: payload.email || '',
        photo: payload.photo,
        role: payload.role || 'Marketing Manager'
      });
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error decoding token:', error);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  const menuItems = [
    { icon: <BarChart3 size={18} />, label: 'Dashboard', id: 'dashboard' },
    { icon: <Users size={18} />, label: 'Customers', id: 'customers' },
    { icon: <PieChart size={18} />, label: 'Segments', id: 'segments' },
    { icon: <MessageSquare size={18} />, label: 'Campaigns', id: 'campaigns' },
    { icon: <Mail size={18} />, label: 'Templates', id: 'templates' },
    { icon: <TrendingUp size={18} />, label: 'Analytics', id: 'analytics' },
    { icon: <Settings size={18} />, label: 'Settings', id: 'settings' }
  ];

  const renderContent = () => {
    switch (activeMenu) {
      case 'customers': return <Customers />;
      case 'segments': return <Segments />;
      case 'campaigns': return <Campaigns />;
      case 'templates': return <Templates />;
      case 'analytics': return <Analytics />;
      case 'settings': return <SettingsPage />;
      default:
        return (
          <>
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-shrink-0 relative">
                  {user.photo ? (
                    <Image 
                      src={user.photo} 
                      alt={user.name}
                      width={96}
                      height={96}
                      className="h-24 w-24 rounded-full object-cover border-4 border-indigo-100"
                    />
                  ) : (
                    <div className="h-24 w-24 rounded-full bg-gray-200 border-4 border-indigo-100 flex items-center justify-center">
                      <span className="text-gray-500 text-2xl">{user.name.charAt(0)}</span>
                    </div>
                  )}
                </div>
                <div className="text-center md:text-left">
                  <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                  <p className="text-gray-600 mt-1">{user.email}</p>
                  <p className="text-sm text-indigo-600 mt-2 bg-indigo-50 px-3 py-1 rounded-full inline-block">
                    {user.role}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
              <StatCard 
                title="Total Customers" 
                value={stats.totalCustomers.toLocaleString()} 
                icon={<Users size={18} className="text-indigo-500" />} 
                trend="up"
              />
              <StatCard 
                title="Active Segments" 
                value={stats.activeSegments} 
                icon={<PieChart size={18} className="text-green-500" />}
              />
              <StatCard 
                title="Campaigns Sent" 
                value={stats.campaignsSent} 
                icon={<MessageSquare size={18} className="text-blue-500" />}
              />
              <StatCard 
                title="Avg. Open Rate" 
                value={stats.openRate} 
                icon={<TrendingUp size={18} className="text-amber-500" />}
                trend="up"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
                  <h3 className="font-medium text-gray-900">Recent Campaigns</h3>
                  <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center">
                    View all <ChevronRight size={16} className="ml-1" />
                  </button>
                </div>
                <div className="p-4 space-y-3">
                  {recentCampaigns.map(campaign => (
                    <CampaignItem key={campaign.id} campaign={campaign} />
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
                  <h3 className="font-medium text-gray-900">Upcoming Campaigns</h3>
                  <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center">
                    Create new <Plus size={16} className="ml-1" />
                  </button>
                </div>
                <div className="p-4 space-y-3">
                  {upcomingCampaigns.map(campaign => (
                    <CampaignItem key={campaign.id} campaign={campaign} />
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="font-medium text-gray-900">Quick Actions</h3>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <QuickAction
                  title="Create Segment"
                  description="Define your audience with custom rules"
                  icon={<Users size={18} className="text-indigo-500" />}
                  onClick={() => setActiveMenu('segments')}
                />
                <QuickAction
                  title="New Campaign"
                  description="Start a new marketing campaign"
                  icon={<MessageSquare size={18} className="text-blue-500" />}
                  onClick={() => setActiveMenu('campaigns')}
                />
                <QuickAction
                  title="View Analytics"
                  description="Check performance metrics"
                  icon={<TrendingUp size={18} className="text-green-500" />}
                  onClick={() => setActiveMenu('analytics')}
                />
              </div>
            </div>
          </>
        );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="flex h-screen bg-gray-50">
      <button 
        onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-md"
      >
        {mobileSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <div className={`${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:relative z-40 w-72 bg-gray-900 h-full shadow-lg transition-transform duration-200 ease-in-out`}>
        <div className="p-6 flex items-center space-x-2">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg" />
          <h1 className="text-2xl font-bold text-white">Xeno CRM</h1>
        </div>
        
        <nav className="mt-8 px-3 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`flex items-center justify-between w-full px-4 py-2.5 text-sm rounded-lg ${
                activeMenu === item.id ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:bg-gray-800'
              }`}
              onClick={() => {
                setActiveMenu(item.id);
                setMobileSidebarOpen(false);
              }}
            >
              <div className="flex items-center space-x-3">
                {item.icon}
                <span>{item.label}</span>
              </div>
              <ChevronRight size={16} />
            </button>
          ))}
          
          <div className="mt-8 pt-4 border-t border-gray-800 px-4">
            <button 
              onClick={handleLogout}
              className="flex items-center space-x-3 w-full px-4 py-2.5 rounded-lg text-gray-300 hover:bg-gray-800"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </div>

      <div className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-lg font-semibold text-gray-900 capitalize">
              {activeMenu === 'dashboard' ? 'Overview' : activeMenu}
            </h1>
            
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={16} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  className="block w-64 pl-10 pr-3 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                />
              </div>
              
              <button className="p-2 rounded-lg hover:bg-gray-100 relative">
                <Bell size={20} className="text-gray-600" />
                <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

        <main className="p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;