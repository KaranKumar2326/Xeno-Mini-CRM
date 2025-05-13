import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { 
  Users, 
  BarChart3, 
  MessageSquare, 
  Settings, 
  Bell, 
  Search, 
  PieChart,
  Calendar,
  TrendingUp,
  Mail,
  LogOut,
  Menu,
  X
} from 'lucide-react';

const Dashboard = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Marketing Manager',
    avatar: '/api/placeholder/150/150'
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [stats, setStats] = useState({
    totalCustomers: 2458,
    activeSegments: 12,
    campaignsSent: 38,
    openRate: '68%'
  });
  const [recentCampaigns, setRecentCampaigns] = useState([
    { id: 1, name: 'Summer Sale Promotion', date: '2025-05-10', audience: 1245, status: 'Completed', openRate: '72%' },
    { id: 2, name: 'New Product Launch', date: '2025-05-05', audience: 876, status: 'Completed', openRate: '65%' },
    { id: 3, name: 'Customer Feedback Survey', date: '2025-04-28', audience: 1890, status: 'Completed', openRate: '58%' },
    { id: 4, name: 'Loyalty Program Update', date: '2025-04-15', audience: 945, status: 'Completed', openRate: '77%' }
  ]);
  const [upcomingCampaigns, setUpcomingCampaigns] = useState([
    { id: 5, name: 'Memorial Day Special', date: '2025-05-25', audience: 2100, status: 'Scheduled' },
    { id: 6, name: 'Summer Collection Preview', date: '2025-05-20', audience: 1560, status: 'Draft' }
  ]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login'); // Redirect to login if no token is found
    } else {
      // Here you would typically fetch user data from your API
      setIsAuthenticated(true);
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const menuItems = [
    { icon: <BarChart3 size={20} />, label: 'Dashboard', id: 'dashboard' },
    { icon: <Users size={20} />, label: 'Customers', id: 'customers' },
    { icon: <PieChart size={20} />, label: 'Segments', id: 'segments' },
    { icon: <MessageSquare size={20} />, label: 'Campaigns', id: 'campaigns' },
    { icon: <Mail size={20} />, label: 'Templates', id: 'templates' },
    { icon: <TrendingUp size={20} />, label: 'Analytics', id: 'analytics' },
    { icon: <Settings size={20} />, label: 'Settings', id: 'settings' }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-md bg-white shadow-md"
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transform transition-transform duration-300 ease-in-out fixed lg:relative z-40 w-64 bg-white h-full shadow-lg overflow-y-auto`}>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-blue-600">Mini CRM</h2>
        </div>
        
        <div className="px-6 py-4 border-t border-gray-100">
          <div className="flex items-center space-x-3">
            <img src={user.avatar} alt="Profile" className="h-12 w-12 rounded-full object-cover" />
            <div>
              <p className="font-medium text-gray-800">{user.name}</p>
              <p className="text-xs text-gray-500">{user.role}</p>
            </div>
          </div>
        </div>
        
        <nav className="mt-6">
          <div className="px-4">
            {menuItems.map((item) => (
              <button
                key={item.id}
                className={`flex items-center space-x-3 px-4 py-3 w-full rounded-lg mb-1 ${
                  activeMenu === item.id 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                onClick={() => setActiveMenu(item.id)}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
          
          <div className="px-4 mt-8 pt-6 border-t border-gray-100">
            <button 
              onClick={handleLogout}
              className="flex items-center space-x-3 px-4 py-3 w-full rounded-lg text-gray-600 hover:bg-gray-50"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
              
              <div className="flex items-center space-x-4">
                {/* Search */}
                <div className="relative hidden md:block">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search..."
                    className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
                
                {/* Notifications */}
                <button className="p-2 rounded-full hover:bg-gray-100 relative">
                  <Bell size={20} className="text-gray-600" />
                  <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>
                
                {/* Settings */}
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <Settings size={20} className="text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Message */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Welcome back, {user.name}!
            </h2>
            <p className="text-gray-600 mt-1">
              Here's what's happening with your campaigns today.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard title="Total Customers" value={stats.totalCustomers} icon={<Users className="text-blue-500" />} />
            <StatCard title="Active Segments" value={stats.activeSegments} icon={<PieChart className="text-green-500" />} />
            <StatCard title="Campaigns Sent" value={stats.campaignsSent} icon={<MessageSquare className="text-purple-500" />} />
            <StatCard title="Avg. Open Rate" value={stats.openRate} icon={<TrendingUp className="text-yellow-500" />} />
          </div>

          {/* Recent and Upcoming Campaigns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Recent Campaigns</h3>
                <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-2">Name</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-2">Date</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-2">Audience</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-2">Open Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentCampaigns.map((campaign) => (
                      <tr key={campaign.id} className="hover:bg-gray-50">
                        <td className="py-3 text-sm text-gray-800">{campaign.name}</td>
                        <td className="py-3 text-sm text-gray-600">{campaign.date}</td>
                        <td className="py-3 text-sm text-gray-600">{campaign.audience}</td>
                        <td className="py-3 text-sm text-gray-600">{campaign.openRate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Upcoming Campaigns</h3>
                <button className="text-sm text-blue-600 hover:text-blue-800">Create New</button>
              </div>
              {upcomingCampaigns.map((campaign) => (
                <div key={campaign.id} className="mb-4 p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-medium text-gray-800">{campaign.name}</h4>
                      <p className="text-sm text-gray-600">Audience: {campaign.audience} customers</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                        campaign.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {campaign.status}
                      </span>
                      <p className="text-sm text-gray-600 mt-1">{campaign.date}</p>
                    </div>
                  </div>
                </div>
              ))}
              {upcomingCampaigns.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No upcoming campaigns</p>
                  <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
                    Schedule Campaign
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <QuickActionCard 
                title="Create Segment" 
                description="Define your audience with custom rules" 
                icon={<Users className="text-blue-500" size={24} />} 
                action={() => router.push('/segments/create')}
              />
              <QuickActionCard 
                title="New Campaign" 
                description="Start a new marketing campaign" 
                icon={<MessageSquare className="text-green-500" size={24} />} 
                action={() => router.push('/campaigns/create')}
              />
              <QuickActionCard 
                title="View Analytics" 
                description="Check performance metrics" 
                icon={<BarChart3 className="text-purple-500" size={24} />} 
                action={() => router.push('/analytics')}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-semibold text-gray-900 mt-1">{value}</p>
        </div>
        <div className="p-3 rounded-full bg-gray-50">
          {icon}
        </div>
      </div>
    </div>
  );
};

// Quick Action Card Component
const QuickActionCard = ({ title, description, icon, action }) => {
  return (
    <button 
      onClick={action}
      className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
    >
      <div className="mr-4">
        {icon}
      </div>
      <div className="text-left">
        <h4 className="font-medium text-gray-800">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </button>
  );
};

export default Dashboard;