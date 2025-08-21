import { useState, useEffect } from 'react';
import { Sidebar } from "../components/Sidebar";
import { DashboardHeader } from "../components/DashboardHeader";
import { MetricCard } from "../components/MetricCard";
import { SalesChart } from "../components/SalesChart";
import { 
  ShoppingCart, 
  Package, 
  DollarSign, 
  Users,
  TrendingUp,
  AlertCircle
} from "lucide-react";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [metrics, setMetrics] = useState({
    sales: 0,
    orders: 0,
    revenue: 0,
    customers: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  // Check screen size and adjust sidebar
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Simulate data loading
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setMetrics({
        sales: 42,
        orders: 127,
        revenue: 12560,
        customers: 843
      });
      
      setIsLoading(false);
    };

    loadData();
  }, []);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar with toggle for mobile */}
      <div className={`
        fixed md:relative z-30 transition-all duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        ${isSidebarOpen ? 'w-64' : 'w-0'}
      `}>
        <Sidebar />
      </div>
      
      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
      
      <main className="flex-1 p-4 md:p-6 lg:p-8 min-w-0">
        <DashboardHeader />
        
        {/* Quick Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <MetricCard
            title="Total Sales"
            value={isLoading ? "..." : metrics.sales.toString()}
            icon={<ShoppingCart className="w-5 h-5" />}
            change={12.4}
            description="+8 from yesterday"
            loading={isLoading}
          />
          <MetricCard
            title="Orders"
            value={isLoading ? "..." : metrics.orders.toString()}
            icon={<Package className="w-5 h-5" />}
            change={8.2}
            description="+12 this week"
            loading={isLoading}
          />
          <MetricCard
            title="Revenue"
            value={isLoading ? "..." : `$${metrics.revenue.toLocaleString()}`}
            icon={<DollarSign className="w-5 h-5" />}
            change={18.7}
            description="+$2,400 from last week"
            loading={isLoading}
          />
          <MetricCard
            title="Customers"
            value={isLoading ? "..." : metrics.customers.toString()}
            icon={<Users className="w-5 h-5" />}
            change={5.3}
            description="+42 this month"
            loading={isLoading}
            variant="primary"
          />
        </div>
        
        {/* Charts and Additional Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <SalesChart />
          </div>
          
          {/* Recent Activity Panel */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
            
            <div className="space-y-4">
              {isLoading ? (
                Array(5).fill(0).map((_, i) => (
                  <div key={i} className="flex items-center gap-3 animate-pulse">
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <ShoppingCart size={16} className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">New order #3245</p>
                      <p className="text-xs text-gray-500">2 minutes ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users size={16} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">New customer registered</p>
                      <p className="text-xs text-gray-500">15 minutes ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                      <DollarSign size={16} className="text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Payment received</p>
                      <p className="text-xs text-gray-500">1 hour ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <AlertCircle size={16} className="text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Order #3210 cancelled</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                </>
              )}
            </div>
            
            <button className="w-full mt-6 py-2 text-sm text-blue-600 hover:text-blue-800 font-medium">
              View all activity
            </button>
          </div>
        </div>
        
        {/* Performance Summary */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Performance Summary</h3>
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              View report
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp size={20} className="text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-800">24%</p>
              <p className="text-sm text-gray-600">Conversion Rate</p>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <ShoppingCart size={20} className="text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-800">2.4%</p>
              <p className="text-sm text-gray-600">Return Rate</p>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <DollarSign size={20} className="text-amber-600" />
              </div>
              <p className="text-2xl font-bold text-gray-800">$124.50</p>
              <p className="text-sm text-gray-600">Average Order Value</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;