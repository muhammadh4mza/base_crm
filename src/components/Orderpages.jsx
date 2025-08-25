import { useState, useRef, useEffect } from "react";

const initialFilters = [
  { name: "All", count: 42 },
  { name: "Unfulfilled", count: 12 },
  { name: "Unpaid", count: 7 },
  { name: "Open", count: 23 },
  { name: "Archived", count: 15 },
  { name: "Local Delivery", count: 9 },
];

function FilterTabs({ filters, activeTab, setActiveTab }) {
  const tabRefs = useRef([]);
  const highlightRef = useRef(null);
  const [highlightStyle, setHighlightStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    if (tabRefs.current[activeTab]) {
      const tab = tabRefs.current[activeTab];
      setHighlightStyle({
        left: tab.offsetLeft,
        width: tab.offsetWidth,
      });
    }
  }, [activeTab, filters]);

  return (
    <div className="relative w-full overflow-x-auto bg-black">
      <div className="flex gap-2 bg-black p-2 rounded-xl shadow-lg relative min-w-max">
        {/* Highlight background */}
        <span
          ref={highlightRef}
          className="absolute top-2 bottom-2 rounded-lg bg-gradient-to-r from-[#005660] to-[#005660] blur-md transition-all duration-300 z-0"
          style={{ left: highlightStyle.left, width: highlightStyle.width }}
        ></span>
        {filters.map((filter, index) => (
          <button
            key={filter.name}
            ref={el => (tabRefs.current[index] = el)}
            onClick={() => setActiveTab(index)}
            className={`relative px-4 py-2 text-sm font-medium rounded-lg flex items-center gap-2 whitespace-nowrap transition-all duration-300 z-10
              ${
                activeTab === index
                  ? "bg-gradient-to-r from-[#005660] to-[#005660] text-white shadow-md"
                  : "text-gray-400 hover:text-gray-200 hover:bg-gray-800"
              }
            `}
          >
            <span>{filter.name}</span>
            <span
              className={`px-2 py-0.5 text-xs rounded-full transition-all duration-300 
                ${
                  activeTab === index
                    ? "bg-black/20 text-white"
                    : "bg-gray-700/60 text-gray-400 group-hover:bg-gray-700 group-hover:text-gray-200"
                }`}
            >
              {filter.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

const allOrders = [
  {
    id: "1008",
    date: "Today at 3:43 AM",
    customer: "No Customer",
    channel: "Online Store",
    total: "$80.00",
    status: "Paid",
    fulfillment: "Unfulfilled",
    payment: "Paid",
    items: 3,
    deliveryStatus: "Pending",
    deliveryMethod: "Standard Shipping",
    tag: "Regular"
  },
  {
    id: "997",
    date: "Today at 7:21 AM",
    customer: "John Doe",
    channel: "POS",
    total: "$45.00",
    status: "Unpaid",
    fulfillment: "Fulfilled",
    payment: "Unpaid",
    items: 1,
    deliveryStatus: "Processing",
    deliveryMethod: "In-Store Pickup",
    tag: "VIP"
  },
  {
    id: "991",
    date: "Yesterday at 3:43 AM",
    customer: "Jane Smith",
    channel: "Online Store",
    total: "$52.00",
    status: "Open",
    fulfillment: "Fulfilled",
    payment: "Paid",
    items: 2,
    deliveryStatus: "Shipped",
    deliveryMethod: "Express Shipping",
    tag: "New"
  },
  {
    id: "988",
    date: "Yesterday at 7:21 AM",
    customer: "No Customer",
    channel: "Local Delivery",
    total: "$25.00",
    status: "Archived",
    fulfillment: "Fulfilled",
    payment: "Paid",
    items: 1,
    deliveryStatus: "Delivered",
    deliveryMethod: "Local Courier",
    tag: "Sale"
  },
  {
    id: "985",
    date: "2 days ago at 2:15 PM",
    customer: "Mike Johnson",
    channel: "Online Store",
    total: "$120.00",
    status: "Paid",
    fulfillment: "Unfulfilled",
    payment: "Paid",
    items: 5,
    deliveryStatus: "Pending",
    deliveryMethod: "Standard Shipping",
    tag: "Bulk"
  },
  {
    id: "982",
    date: "2 days ago at 5:30 PM",
    customer: "Sarah Wilson",
    channel: "Local Delivery",
    total: "$65.00",
    status: "Open",
    fulfillment: "Fulfilled",
    payment: "Paid",
    items: 2,
    deliveryStatus: "Out for Delivery",
    deliveryMethod: "Local Delivery",
    tag: "Regular"
  }
];


export function OrdersPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 2; // Number of orders per page

  // Filter orders based on active tab and search term
  const filteredOrders = allOrders.filter(order => {
    const filterName = initialFilters[activeTab].name;
    // If 'All' tab, show all orders (with search and status filter)
    let matchesTab = true;
    if (filterName !== "All") {
      if (filterName === "Unfulfilled") {
        matchesTab = order.fulfillment === "Unfulfilled";
      } else if (filterName === "Unpaid") {
        matchesTab = order.payment === "Unpaid";
      } else if (filterName === "Open") {
        matchesTab = order.status === "Open";
      } else if (filterName === "Archived") {
        matchesTab = order.status === "Archived";
      } else if (filterName === "Local Delivery") {
        matchesTab = order.channel === "Local Delivery";
      }
    }
    // Apply search filter
    const matchesSearch = searchTerm === "" || 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.total.toLowerCase().includes(searchTerm.toLowerCase());
    // Apply status filter
    const matchesStatus = statusFilter === "All" || order.status === statusFilter || order.payment === statusFilter || order.fulfillment === statusFilter;
    return matchesTab && matchesSearch && matchesStatus;
  });

  // Pagination logic
  const totalOrders = filteredOrders.length;
  const totalPages = Math.ceil(totalOrders / pageSize);
  const startIdx = (currentPage - 1) * pageSize;
  const endIdx = Math.min(startIdx + pageSize, totalOrders);
  const paginatedOrders = filteredOrders.slice(startIdx, endIdx);

  // Reset to first page if filters/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchTerm, statusFilter]);

  return (
    <div className="flex-1 overflow-auto bg-gray-50 p-4">
      {/* Filter Tabs + Search/Filters */}
      <div className="mb-6 bg-black rounded-xl p-4">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <FilterTabs 
              filters={initialFilters} 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
            />
          </div>
          <div className="flex flex-1 gap-2">
            <input
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-4 pr-4 py-2.5 w-full rounded-lg border border-gray-700 bg-black text-white focus:outline-none focus:ring-2 focus:ring-[#005660] focus:border-[#005660] placeholder-gray-400"
            />
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-700 px-3 py-2.5 rounded-lg text-white bg-black hover:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#005660] focus:border-[#005660]"
            >
              <option value="All">All Statuses</option>
              <option value="Paid">Paid</option>
              <option value="Unpaid">Unpaid</option>
              <option value="Fulfilled">Fulfilled</option>
              <option value="Unfulfilled">Unfulfilled</option>
            </select>
            <button className="flex items-center space-x-2 border border-gray-700 px-3 py-2.5 rounded-lg text-white bg-black hover:bg-gray-900 text-sm">
              <span>Customer</span>
            </button>
            <button className="flex items-center space-x-2 border border-gray-700 px-3 py-2.5 rounded-lg text-white bg-black hover:bg-gray-900 text-sm">
              <span>Date</span>
            </button>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <OrdersTable orders={paginatedOrders} />

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6 px-2">
        <div className="text-sm text-gray-700">
          {totalOrders === 0 ? (
            <>No results</>
          ) : (
            <>
              Showing <span className="font-medium">{startIdx + 1}</span> to <span className="font-medium">{endIdx}</span> of{' '}
              <span className="font-medium">{totalOrders}</span> results
            </>
          )}
        </div>
        <div className="flex space-x-2">
          <button
            className="px-3 py-1.5 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`px-3 py-1.5 rounded-md border border-gray-300 text-sm font-medium ${
                currentPage === i + 1
                  ? "bg-[#005660] text-white border-[#005660]"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="px-3 py-1.5 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages || totalOrders === 0}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export function OrdersTable({ orders }) {
  const getDeliveryStatusColor = (status) => {
    switch(status) {
      case "Delivered": return "bg-green-100 text-green-800";
      case "Shipped": return "bg-blue-100 text-blue-800";
      case "Out for Delivery": return "bg-purple-100 text-purple-800";
      case "Processing": return "bg-yellow-100 text-yellow-800";
      case "Pending": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTagColor = (tag) => {
    switch(tag) {
      case "VIP": return "bg-purple-100 text-purple-800";
      case "New": return "bg-blue-100 text-blue-800";
      case "Sale": return "bg-red-100 text-red-800";
      case "Bulk": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="w-12 p-4 text-left">
              <input type="checkbox" className="rounded border-gray-300 text-[#005660] focus:ring-[#005660]" />
            </th>
            <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
            <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
            <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Channel</th>
            <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
            <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
            <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Status</th>
            <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery Status</th>
            <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery Method</th>
            <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tag</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50/50 border-b border-gray-100">
              <td className="p-4">
                <input type="checkbox" className="rounded border-gray-300 text-[#005660] focus:ring-[#005660]" />
              </td>
              <td className="p-4 font-medium text-gray-900">#{order.id}</td>
              <td className="p-4 text-gray-500">{order.date}</td>
              <td className="p-4 text-gray-500">{order.customer}</td>
              <td className="p-4 text-gray-500">{order.channel}</td>
              <td className="p-4 text-gray-500">{order.items}</td>
              <td className="p-4 font-medium text-gray-900">{order.total}</td>
              <td className="p-4">
                <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                  order.payment === "Paid" 
                    ? "bg-green-100 text-green-800" 
                    : "bg-red-100 text-red-800"
                }`}>
                  {order.payment}
                </span>
              </td>
              <td className="p-4">
                <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${getDeliveryStatusColor(order.deliveryStatus)}`}>
                  {order.deliveryStatus}
                </span>
              </td>
              <td className="p-4 text-gray-500">{order.deliveryMethod}</td>
              <td className="p-4">
                <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${getTagColor(order.tag)}`}>
                  {order.tag}
                </span>
              </td>
            </tr>
          ))}
          {orders.length === 0 && (
            <tr>
              <td colSpan="11" className="p-8 text-center text-gray-500">
                No orders found matching your criteria.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export { FilterTabs };
export default OrdersPage;