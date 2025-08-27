
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  FileText, 
  Settings,
  Layers3
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const NavItem = ({ icon, label, to, isActive = false }) => (
  <Link to={to} className="block">
    <div 
      className={`
        flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200
        ${isActive 
          ? 'bg-[var(--theme-color)] text-white' 
          : 'text-white hover:bg-[var(--theme-color)] hover:text-white'
        }
      `}
    >
      <div className="w-5 h-5">{icon}</div>
      <span className="font-medium">{label}</span>
    </div>
  </Link>
);

export const Sidebar = () => {
  const location = useLocation();
  return (
  <div className="w-64 h-screen top-0 left-0 z-30 flex flex-col border-r border-gray-200 shadow-sm bg-gradient-to-br from-[#000000] to-[var(--theme-color)] text-white">
      {/* Logo */}
      <div className="p-6">
        <h1 className="text-3xl font-bold text-white">
          BASE
        </h1>
      </div>
      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        <NavItem 
          icon={<LayoutDashboard />} 
          label="Dashboards" 
          to="/dashboard"
          isActive={location.pathname === "/dashboard"}
        />
        <NavItem 
          icon={<Layers3 />} 
          label="Orders" 
          to="/orders"
          isActive={location.pathname === "/orders"}
        />
        <NavItem 
          icon={<Package />} 
          label="Products" 
          to="/products"
          isActive={location.pathname === "/products"}
        />
        <NavItem 
          icon={<Users />} 
          label="Customers" 
          to="/customers"
          isActive={location.pathname === "/customers"}
        />
        <NavItem 
          icon={<FileText />} 
          label="Invoice" 
          to="/invoice"
          isActive={location.pathname === "/invoice"}
        />
        <NavItem 
          icon={<Settings />} 
          label="Setting" 
          to="/settings"
          isActive={location.pathname === "/settings"}
        />
      </nav>
    </div>
  );
};