import { useState } from "react";
import { Download, MoreHorizontal } from "lucide-react";

const customersData = [
  {
    id: "1",
    name: "Jordan",
    lastActive: "26 July 2025",
    dateRegistered: "26 July 2025",
    brand: "BBDAZZ",
    orders: 8,
    totalSpend: "$116.00",
    country: "USA",
    region: "New York"
  },
  {
    id: "2", 
    name: "Robinson",
    lastActive: "26 July 2025",
    dateRegistered: "26 July 2025",
    brand: "CWC",
    orders: 12,
    totalSpend: "$208.00",
    country: "USA",
    region: "New York"
  },
  {
    id: "3",
    name: "Warner",
    lastActive: "26 July 2025",
    dateRegistered: "26 July 2025", 
    brand: "CWC",
    orders: 1,
    totalSpend: "$45.00",
    country: "USA",
    region: "New York"
  },
  {
    id: "4",
    name: "Ellis",
    lastActive: "26 July 2025",
    dateRegistered: "26 July 2025",
    brand: "BBDAZZ", 
    orders: 5,
    totalSpend: "$96.00",
    country: "USA",
    region: "New York"
  }
];

export function CustomersTable() {
  const [filter, setFilter] = useState("All Customers");

  return (
    <div className="bg-white rounded-lg border p-6 space-y-6">
      {/* Controls Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium">Show :</span>
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="w-48 border border-gray-300 rounded px-3 py-2 text-sm bg-white"
          >
            <option value="All Customers">All Customers</option>
            <option value="Active">Active Customers</option>
            <option value="Inactive">Inactive Customers</option>
          </select>
        </div>

        <button className="bg-[#005660] hover:bg-[#00444d] text-white px-4 py-2 rounded font-medium transition">
          Add Customer
        </button>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-lg border overflow-hidden">
        {/* Table Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold text-lg">Customers</h3>
          <div className="flex items-center space-x-2">
            <button className="flex items-center border border-gray-300 rounded px-3 py-1.5 text-sm hover:bg-gray-100">
              <Download className="w-4 h-4 mr-2" />
              Download
            </button>
            <button className="p-2 rounded hover:bg-gray-100">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left font-medium text-gray-700">Name</th>
                <th className="p-3 text-left font-medium text-gray-700">Last active</th>
                <th className="p-3 text-left font-medium text-gray-700">Date Registered</th>
                <th className="p-3 text-left font-medium text-gray-700">Brand</th>
                <th className="p-3 text-left font-medium text-gray-700">Orders</th>
                <th className="p-3 text-left font-medium text-gray-700">Total Spend</th>
                <th className="p-3 text-left font-medium text-gray-700">Country</th>
                <th className="p-3 text-left font-medium text-gray-700">Region</th>
              </tr>
            </thead>
            <tbody>
              {customersData.map((customer, index) => (
                <tr
                  key={customer.id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="p-3 font-medium">{customer.name}</td>
                  <td className="p-3">{customer.lastActive}</td>
                  <td className="p-3">{customer.dateRegistered}</td>
                  <td className="p-3 font-medium">{customer.brand}</td>
                  <td className="p-3">
                    <span className="px-2 py-1 bg-gray-200 rounded text-xs font-medium">
                      {customer.orders.toString().padStart(2, '0')}
                    </span>
                  </td>
                  <td className="p-3 font-medium">{customer.totalSpend}</td>
                  <td className="p-3">{customer.country}</td>
                  <td className="p-3">{customer.region}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
