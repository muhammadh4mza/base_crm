import { Sidebar } from "../components/Sidebar";
import { DashboardHeader } from "../components/DashboardHeader";
import { ProductForm } from "../components/ProductForm";

const AddProduct = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1">
        <DashboardHeader title="Add Product" />
        <ProductForm  />
      </main>
    </div>
  );
};

export default AddProduct;
