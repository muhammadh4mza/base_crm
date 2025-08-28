import React, { useState } from "react";
import { Package, Calendar, PlusCircle, Search } from "lucide-react";

export function OrderTabs() {
  const [activeTab, setActiveTab] = useState("products");
  const [searchTerm, setSearchTerm] = useState("");

  const products = [
    { id: 1, name: "Running Shoes", price: 89.99, category: "Footwear" },
    { id: 2, name: "Yoga Mat", price: 24.99, category: "Fitness" },
    { id: 3, name: "Water Bottle", price: 19.99, category: "Accessories" },
  ];

  const reserveItems = [
    { id: 1, name: "Limited Edition Jacket", price: 129.99, availableDate: "2023-12-15" },
    { id: 2, name: "New Collection Sneakers", price: 149.99, availableDate: "2023-12-20" },
  ];

  return (
    <div className="w-full space-y-5">
      {/* Tabs */}
      <div className="grid grid-cols-3 bg-gray-100 p-1 rounded-lg text-sm">
        <button
          className={`flex items-center justify-center gap-2 py-2 rounded-md transition ${{
            true: "bg-white text-[#005660] font-medium", 
            false: "text-gray-600 hover:bg-gray-200"
          }[activeTab === "products"]}`}
          onClick={() => setActiveTab("products")}
        >
          <Package className="h-4 w-4" /> Products
        </button>
        <button
          className={`flex items-center justify-center gap-2 py-2 rounded-md transition ${{
            true: "bg-white text-[#005660] font-medium", 
            false: "text-gray-600 hover:bg-gray-200"
          }[activeTab === "reserve"]}`}
          onClick={() => setActiveTab("reserve")}
        >
          <Calendar className="h-4 w-4" /> Reserve
        </button>
        <button
          className={`flex items-center justify-center gap-2 py-2 rounded-md transition ${{
            true: "bg-white text-[#005660] font-medium", 
            false: "text-gray-600 hover:bg-gray-200"
          }[activeTab === "custom"]}`}
          onClick={() => setActiveTab("custom")}
        >
          <PlusCircle className="h-4 w-4" /> Custom
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder={`Search ${activeTab}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-[#005660] focus:border-[#005660]"
        />
      </div>

      {/* Products */}
      {activeTab === "products" && (
        <div className="space-y-3">
          {products.map((p) => (
            <div key={p.id} className="p-3 border rounded-md bg-white flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-800">{p.name}</p>
                <p className="text-xs text-gray-500">{p.category}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-[#005660] text-sm">${p.price.toFixed(2)}</p>
                <button className="mt-1 text-xs bg-[#005660] text-white px-2 py-1 rounded-md">Add</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reserve */}
      {activeTab === "reserve" && (
        <div className="space-y-3">
          {reserveItems.map((i) => (
            <div key={i.id} className="p-3 border rounded-md bg-white flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-800">{i.name}</p>
                <p className="text-xs text-gray-500">Available: {i.availableDate}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-[#005660] text-sm">${i.price.toFixed(2)}</p>
                <button className="mt-1 text-xs bg-amber-500 text-white px-2 py-1 rounded-md">Reserve</button>
              </div>
            </div>
          ))}
          <div className="p-3 border border-dashed text-center text-gray-500 rounded-md text-sm cursor-pointer">
            <Calendar className="h-4 w-4 mx-auto mb-1" />
            View all upcoming
          </div>
        </div>
      )}

      {/* Custom */}
      {activeTab === "custom" && (
        <div className="p-4 border rounded-md bg-white space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
            <input className="w-full px-3 py-2 border rounded-md text-sm focus:ring-1 focus:ring-[#005660] focus:border-[#005660]" placeholder="Enter item name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea className="w-full px-3 py-2 border rounded-md text-sm focus:ring-1 focus:ring-[#005660] focus:border-[#005660]" rows={2} placeholder="Enter description" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
              <input type="number" className="w-full px-3 py-2 border rounded-md text-sm focus:ring-1 focus:ring-[#005660] focus:border-[#005660]" placeholder="0.00" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
              <input type="number" min="1" className="w-full px-3 py-2 border rounded-md text-sm focus:ring-1 focus:ring-[#005660] focus:border-[#005660]" placeholder="1" />
            </div>
          </div>
          <button className="w-full bg-[#005660] text-white py-2 rounded-md flex items-center justify-center gap-2 text-sm">
            <PlusCircle className="h-4 w-4" /> Add Custom Item
          </button>
        </div>
      )}
    </div>
  );
}