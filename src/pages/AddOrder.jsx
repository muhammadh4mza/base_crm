import React, { useState } from "react";
import { DashboardHeader } from "../components/DashboardHeader";
import { Sidebar } from "../components/Sidebar";
import { OrderTabs } from "../components/OrderTabs";
// import  ProductSearch  from "../components/ProductSearch";
import { CustomerSection } from "../components/CustomerSection";
import AddDiscountModal from "../components/AddDiscountModal";

const AddOrder = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [selectedBrand, setSelectedBrand] = useState("cwc");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [isDiscountOpen, setIsDiscountOpen] = useState(false);
  const [discount, setDiscount] = useState(null);

  return (
    <>
      <div className="min-h-screen bg-background flex">
        <Sidebar />
        <div className="flex-1">
          <DashboardHeader />
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div />
              <div>
                {discount ? (
                  <div className="flex items-center gap-3 bg-white border rounded px-3 py-2">
                    <div>
                      <div className="text-sm font-medium">Discount</div>
                      <div className="text-xs text-gray-600">
                        {discount.type === "Amount"
                          ? `$${Number(discount.value).toFixed(2)}`
                          : `${discount.value}%`}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsDiscountOpen(true)}
                        className="px-2 py-1 text-xs text-[#005660] border rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDiscount(null)}
                        className="px-2 py-1 text-xs text-red-500 border rounded"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsDiscountOpen(true)}
                    className="px-3 py-2 text-sm bg-[#005660] hover:bg-[#003c42] text-white rounded-md"
                  >
                    Add discount
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-3 space-y-6">
                <OrderTabs activeTab={activeTab} setActiveTab={setActiveTab} discount={discount} />
                {/* <ProductSearch search={search} setSearch={setSearch} /> */}
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

      <AddDiscountModal
        isOpen={isDiscountOpen}
        onClose={() => setIsDiscountOpen(false)}
        onApply={(d) => setDiscount(d)}
        initialDiscount={discount}
      />
    </>
  );
};

export default AddOrder;
