import { Sidebar } from "../components/Sidebar";
import { DashboardHeader } from "../components/DashboardHeader";
import { MetricCard } from "../components/MetricCard";
import { SalesChart } from "../components/SalesChart";
import { ShoppingCart, Package, DollarSign } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-1 p-8">
        <DashboardHeader bg-gray-100/>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <MetricCard
            title="Total Sales"
            value="08"
            icon={<ShoppingCart className="w-6 h-6" />}
            variant="primary"
          />
          <MetricCard
            title="Orders"
            value="19"
            icon={<Package className="w-6 h-6" />}
          />
          <MetricCard
            title="Revenue"
            value="$1900.00"
            icon={<DollarSign className="w-6 h-6" />}
          />
        </div>
        
        <SalesChart />
      </main>
    </div>
  );
};

export default Dashboard;