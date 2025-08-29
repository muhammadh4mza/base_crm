import React, { useState } from "react";
import { Package, Calendar, PlusCircle, Search } from "lucide-react";
import { useProducts } from "../context/ProductsContext";

export function OrderTabs() {
  const [activeTab, setActiveTab] = useState("products");
  const [searchTerm, setSearchTerm] = useState("");
  const { products } = useProducts();
  const [orderProducts, setOrderProducts] = useState([]); // Products added to the order
  const [customItem, setCustomItem] = useState({ name: '', description: '', price: '', quantity: 1 });

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
        <>
          <div className="space-y-3">
            {products.map((p) => (
              <div key={p.id} className="p-3 border rounded-md bg-white flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-800">{p.name}</p>
                  <p className="text-xs text-gray-500">{p.category}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">Qty:</span>
                    <input
                      type="number"
                      min="1"
                      value={orderProducts.find(op => op.id === p.id)?.quantity || 1}
                      onChange={e => {
                        const qty = Math.max(1, parseInt(e.target.value) || 1);
                        setOrderProducts(prev => {
                          const exists = prev.find(op => op.id === p.id);
                          if (exists) {
                            return prev.map(op => op.id === p.id ? { ...op, quantity: qty } : op);
                          } else {
                            return [...prev, { ...p, quantity: qty }];
                          }
                        });
                      }}
                      className="w-14 px-2 py-1 border rounded text-sm"
                    />
                  </div>
                  <p className="font-semibold text-[#005660] text-sm">
                    {typeof p.price === 'string' && p.price.startsWith('$') ? p.price : `$${Number(p.price).toFixed(2)}`}
                  </p>
                  <button
                    className="mt-1 text-xs bg-[#005660] text-white px-2 py-1 rounded-md"
                    onClick={() => {
                      setOrderProducts(prev => {
                        const exists = prev.find(op => op.id === p.id);
                        if (exists) {
                          // Already added, maybe update quantity
                          return prev.map(op => op.id === p.id ? { ...op, quantity: op.quantity } : op);
                        } else {
                          return [...prev, { ...p, quantity: 1 }];
                        }
                      });
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          {orderProducts.length > 0 && (
            <div className="mt-6 border-t pt-4">
              <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
              <div className="space-y-2">
                {orderProducts.map((item) => (
                  <div key={item.id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <div>
                      <span className="font-medium text-gray-800">{item.name}</span>
                      <span className="ml-2 text-xs text-gray-500">x</span>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={e => {
                          const qty = Math.max(1, parseInt(e.target.value) || 1);
                          setOrderProducts(prev => prev.map(op => op.id === item.id ? { ...op, quantity: qty } : op));
                        }}
                        className="w-12 px-1 py-0.5 border rounded text-xs ml-2"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-700">
                        {typeof item.price === 'string' && item.price.startsWith('$') ? item.price : `$${Number(item.price).toFixed(2)}`}
                      </span>
                      <button
                        className="ml-2 text-xs text-red-500 hover:underline"
                        onClick={() => setOrderProducts(prev => prev.filter(op => op.id !== item.id))}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center mt-4 font-semibold text-gray-900">
                <span>Total</span>
                <span>
                  {(() => {
                    let total = 0;
                    orderProducts.forEach(item => {
                      let price = item.price;
                      if (typeof price === 'string' && price.startsWith('$')) price = price.slice(1);
                      total += Number(price) * item.quantity;
                    });
                    return `$${total.toFixed(2)}`;
                  })()}
                </span>
              </div>
              <button
                className="w-full mt-6 py-3 bg-[#005660] text-white rounded hover:bg-[#00444d] transition text-lg font-semibold"
                onClick={() => alert('Checkout functionality coming soon!')}
              >
                Checkout
              </button>
            </div>
          )}
        </>
      )}

      {/* Reserve */}
      {activeTab === "reserve" && (
        <>
          <div className="space-y-3">
            {reserveItems.map((i) => (
              <div key={i.id} className="p-3 border rounded-md bg-white flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-800">{i.name}</p>
                  <p className="text-xs text-gray-500">Available: {i.availableDate}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">Qty:</span>
                    <input
                      type="number"
                      min="1"
                      value={orderProducts.find(op => op.id === `reserve-${i.id}`)?.quantity || 1}
                      onChange={e => {
                        const qty = Math.max(1, parseInt(e.target.value) || 1);
                        setOrderProducts(prev => {
                          const exists = prev.find(op => op.id === `reserve-${i.id}`);
                          if (exists) {
                            return prev.map(op => op.id === `reserve-${i.id}` ? { ...op, quantity: qty } : op);
                          } else {
                            return [...prev, { ...i, id: `reserve-${i.id}`, quantity: qty }];
                          }
                        });
                      }}
                      className="w-14 px-2 py-1 border rounded text-sm"
                    />
                  </div>
                  <p className="font-semibold text-[#005660] text-sm">${i.price.toFixed(2)}</p>
                  <button
                    className="mt-1 text-xs bg-amber-500 text-white px-2 py-1 rounded-md"
                    onClick={() => {
                      setOrderProducts(prev => {
                        const exists = prev.find(op => op.id === `reserve-${i.id}`);
                        if (exists) {
                          return prev.map(op => op.id === `reserve-${i.id}` ? { ...op, quantity: op.quantity } : op);
                        } else {
                          return [...prev, { ...i, id: `reserve-${i.id}`, quantity: 1 }];
                        }
                      });
                    }}
                  >Reserve</button>
                </div>
              </div>
            ))}
            <div className="p-3 border border-dashed text-center text-gray-500 rounded-md text-sm cursor-pointer">
              <Calendar className="h-4 w-4 mx-auto mb-1" />
              View all upcoming
            </div>
          </div>

          {/* Order Summary for Reserve */}
          {orderProducts.filter(item => String(item.id).startsWith('reserve-')).length > 0 && (
            <div className="mt-6 border-t pt-4">
              <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
              <div className="space-y-2">
                {orderProducts.filter(item => String(item.id).startsWith('reserve-')).map((item) => (
                  <div key={item.id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <div>
                      <span className="font-medium text-gray-800">{item.name}</span>
                      <span className="ml-2 text-xs text-gray-500">x</span>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={e => {
                          const qty = Math.max(1, parseInt(e.target.value) || 1);
                          setOrderProducts(prev => prev.map(op => op.id === item.id ? { ...op, quantity: qty } : op));
                        }}
                        className="w-12 px-1 py-0.5 border rounded text-xs ml-2"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-700">
                        {typeof item.price === 'string' && item.price.startsWith('$') ? item.price : `$${Number(item.price).toFixed(2)}`}
                      </span>
                      <button
                        className="ml-2 text-xs text-red-500 hover:underline"
                        onClick={() => setOrderProducts(prev => prev.filter(op => op.id !== item.id))}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center mt-4 font-semibold text-gray-900">
                <span>Total</span>
                <span>
                  {(() => {
                    let total = 0;
                    orderProducts.filter(item => String(item.id).startsWith('reserve-')).forEach(item => {
                      let price = item.price;
                      if (typeof price === 'string' && price.startsWith('$')) price = price.slice(1);
                      total += Number(price) * item.quantity;
                    });
                    return `$${total.toFixed(2)}`;
                  })()}
                </span>
              </div>
              <button
                className="w-full mt-6 py-3 bg-[#005660] text-white rounded hover:bg-[#00444d] transition text-lg font-semibold"
                onClick={() => alert('Checkout functionality coming soon!')}
              >
                Checkout
              </button>
            </div>
          )}
        </>
      )}

      {/* Custom */}
      {activeTab === "custom" && (
        <>
          <div className="p-4 border rounded-md bg-white space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
              <input
                className="w-full px-3 py-2 border rounded-md text-sm focus:ring-1 focus:ring-[#005660] focus:border-[#005660]"
                placeholder="Enter item name"
                value={customItem.name}
                onChange={e => setCustomItem(ci => ({ ...ci, name: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                className="w-full px-3 py-2 border rounded-md text-sm focus:ring-1 focus:ring-[#005660] focus:border-[#005660]"
                rows={2}
                placeholder="Enter description"
                value={customItem.description}
                onChange={e => setCustomItem(ci => ({ ...ci, description: e.target.value }))}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border rounded-md text-sm focus:ring-1 focus:ring-[#005660] focus:border-[#005660]"
                  placeholder="0.00"
                  value={customItem.price}
                  onChange={e => setCustomItem(ci => ({ ...ci, price: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                <input
                  type="number"
                  min="1"
                  className="w-full px-3 py-2 border rounded-md text-sm focus:ring-1 focus:ring-[#005660] focus:border-[#005660]"
                  placeholder="1"
                  value={customItem.quantity}
                  onChange={e => setCustomItem(ci => ({ ...ci, quantity: Math.max(1, parseInt(e.target.value) || 1) }))}
                />
              </div>
            </div>
            <button
              className="w-full bg-[#005660] text-white py-2 rounded-md flex items-center justify-center gap-2 text-sm"
              onClick={() => {
                if (!customItem.name || !customItem.price) return;
                setOrderProducts(prev => [
                  ...prev,
                  {
                    id: `custom-${Date.now()}`,
                    name: customItem.name,
                    description: customItem.description,
                    price: customItem.price,
                    quantity: customItem.quantity,
                    isCustom: true
                  }
                ]);
                setCustomItem({ name: '', description: '', price: '', quantity: 1 });
              }}
            >
              <PlusCircle className="h-4 w-4" /> Add Custom Item
            </button>
          </div>

          {/* Order Summary for Custom */}
          {orderProducts.filter(item => String(item.id).startsWith('custom-')).length > 0 && (
            <div className="mt-6 border-t pt-4">
              <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
              <div className="space-y-2">
                {orderProducts.filter(item => String(item.id).startsWith('custom-')).map((item) => (
                  <div key={item.id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <div>
                      <span className="font-medium text-gray-800">{item.name}</span>
                      <span className="ml-2 text-xs text-gray-500">x</span>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={e => {
                          const qty = Math.max(1, parseInt(e.target.value) || 1);
                          setOrderProducts(prev => prev.map(op => op.id === item.id ? { ...op, quantity: qty } : op));
                        }}
                        className="w-12 px-1 py-0.5 border rounded text-xs ml-2"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-700">
                        {typeof item.price === 'string' && item.price.startsWith('$') ? item.price : `$${Number(item.price).toFixed(2)}`}
                      </span>
                      <button
                        className="ml-2 text-xs text-red-500 hover:underline"
                        onClick={() => setOrderProducts(prev => prev.filter(op => op.id !== item.id))}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center mt-4 font-semibold text-gray-900">
                <span>Total</span>
                <span>
                  {(() => {
                    let total = 0;
                    orderProducts.filter(item => String(item.id).startsWith('custom-')).forEach(item => {
                      let price = item.price;
                      if (typeof price === 'string' && price.startsWith('$')) price = price.slice(1);
                      total += Number(price) * item.quantity;
                    });
                    return `$${total.toFixed(2)}`;
                  })()}
                </span>
              </div>
              <button
                className="w-full mt-6 py-3 bg-[#005660] text-white rounded hover:bg-[#00444d] transition text-lg font-semibold"
                onClick={() => alert('Checkout functionality coming soon!')}
              >
                Checkout
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}