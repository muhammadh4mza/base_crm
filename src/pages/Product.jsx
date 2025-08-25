import { Sidebar } from "../components/Sidebar";
import { DashboardHeader } from "../components/DashboardHeader";
import ProductsPage from "../components/ProductsPage";


const Orders = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-1 ">
  <DashboardHeader title="Products" />

        <ProductsPage />
        
      </main>
    </div>
  );
};

export default Orders;