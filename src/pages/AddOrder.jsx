
import React, { useState } from "react";
import { DashboardHeader } from "../components/DashboardHeader";
import { Sidebar } from "../components/Sidebar";
import { OrderTabs } from "../components/OrderTabs";
// import  ProductSearch  from "../components/ProductSearch";
import { CustomerSection } from "../components/CustomerSection";
// import ProductList from "../components/ProductList";



const initialProducts = [
  { id: 1, name: "Track Suit : Active Wear", price: 45.0, quantity: 1 },
  { id: 2, name: "Track Suit : Active Wear", price: 52.0, quantity: 1 },
  { id: 3, name: "Track Suit : Active Wear", price: 20.0, quantity: 1 },
];

const AddOrder = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [search, ] = useState("");
  const [products, setProducts] = useState(initialProducts);
  const [selectedBrand, setSelectedBrand] = useState("cwc");
  const [selectedCustomer, setSelectedCustomer] = useState("");

  // Filter products by search
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // Handlers for ProductList
  const handleQuantityChange = (id, delta) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? { ...product, quantity: Math.max(1, product.quantity + delta) }
          : product
      )
    );
  };
  const handleRemove = (id) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <div className="flex-1">
        <DashboardHeader />
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              <OrderTabs activeTab={activeTab} setActiveTab={setActiveTab} />
              {/* <ProductSearch search={search} setSearch={setSearch} /> */}
              {/* <ProductList
                products={filteredProducts}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemove}
                activeTab={activeTab}
              /> */}
            </div>
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <CustomerSection
                selectedBrand={selectedBrand}
                setSelectedBrand={setSelectedBrand}
                selectedCustomer={selectedCustomer}
                setSelectedCustomer={setSelectedCustomer}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddOrder;