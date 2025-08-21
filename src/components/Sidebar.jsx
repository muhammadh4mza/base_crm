import { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  FileText, 
  Settings,
  Layers3,
  ChevronDown,
  ChevronRight,
  LogOut,
  User,
  Bell,
  Search
} from "lucide-react";

const NavItem = ({ icon, label, isActive = false, hasChildren = false, isExpanded = false, onClick }) => (
  <div 
    className={`
      flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 group
      ${isActive 
        ? 'bg-blue-100 text-blue-700' 
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
      }
    `}
    onClick={onClick}
  >
    <div className="flex items-center gap-3">
      <div className="w-5 h-5">{icon}</div>
      <span className="font-medium">{label}</span>
    </div>
    {hasChildren && (
      <div className={`transform transition-transform ${isExpanded ? 'rotate-0' : '-rotate-90'}`}>
        <ChevronRight size={16} />
      </div>
    )}
  </div>
);

const SubNavItem = ({ label, isActive = false }) => (
  <div 
    className={`
      flex items-center gap-3 pl-12 pr-4 py-2 rounded-lg cursor-pointer transition-all duration-200 text-sm
      ${isActive 
        ? 'bg-blue-50 text-blue-700 font-medium' 
        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
      }
    `}
  >
    <span>{label}</span>
  </div>
);

export const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('Dashboards');
  const [expandedItems, setExpandedItems] = useState({});
  
  const navItems = [
    { id: 'dashboards', icon: <LayoutDashboard />, label: 'Dashboards' },
    { id: 'orders', icon: <Layers3 />, label: 'Orders', hasChildren: true },
    { id: 'products', icon: <Package />, label: 'Products', hasChildren: true },
    { id: 'customers', icon: <Users />, label: 'Customers' },
    { id: 'invoice', icon: <FileText />, label: 'Invoice' },
    { id: 'settings', icon: <Settings />, label: 'Setting', hasChildren: true },
  ];
  
  const handleItemClick = (itemId) => {
    setActiveItem(itemId);
    
    if (navItems.find(item => item.id === itemId)?.hasChildren) {
      setExpandedItems(prev => ({
        ...prev,
        [itemId]: !prev[itemId]
      }));
    }
  };
  
  const getSubItems = (itemId) => {
    switch (itemId) {
      case 'orders':
        return ['All Orders', 'Pending', 'Completed', 'Cancelled'];
      case 'products':
        return ['All Products', 'Categories', 'Inventory', 'Reviews'];
      case 'settings':
        return ['Account', 'Preferences', 'Security', 'Notifications'];
      default:
        return [];
    }
  };

  return (
    <div className="w-64 bg-white h-screen flex flex-col border-r border-gray-200 shadow-sm">
      {/* Logo and Header */}
      <div className="p-5 border-b border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            BASE
          </h1>
          <div className="p-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200">
            <Bell size={18} className="text-gray-600" />
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
          />
        </div>
      </div>
      
      {/* User Profile */}
      <div className="p-4 border-b border-gray-200 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
          <User size={20} className="text-blue-600" />
        </div>
        <div className="flex-1">
          <p className="font-medium text-gray-800">John Doe</p>
          <p className="text-sm text-gray-500">Admin</p>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <div key={item.id}>
            <NavItem 
              icon={item.icon} 
              label={item.label} 
              isActive={activeItem === item.id}
              hasChildren={item.hasChildren}
              isExpanded={expandedItems[item.id]}
              onClick={() => handleItemClick(item.id)}
            />
            
            {expandedItems[item.id] && getSubItems(item.id).map((subItem, index) => (
              <SubNavItem 
                key={index} 
                label={subItem} 
                isActive={activeItem === `${item.id}-${subItem.toLowerCase().replace(' ', '-')}`}
              />
            ))}
          </div>
        ))}
      </nav>
      
      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 p-3 rounded-lg cursor-pointer text-gray-600 hover:bg-gray-100 hover:text-gray-800">
          <LogOut size={18} />
          <span className="font-medium">Logout</span>
        </div>
        <div className="mt-2 text-xs text-center text-gray-400">
          v1.2.0 • © 2023 BASE
        </div>
      </div>
    </div>
  );
};