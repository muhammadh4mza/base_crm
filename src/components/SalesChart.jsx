import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend, Area, CartesianGrid, AreaChart } from "recharts";

const data = [
  { name: 'Jan', sales: 60 },
  { name: 'Feb', sales: 80 },
  { name: 'Mar', sales: 55 },
  { name: 'Apr', sales: 78 },
  { name: 'May', sales: 58 },
  { name: 'Jun', sales: 82 },
  { name: 'Jul', sales: 75 },
  { name: 'Aug', sales: 60 },
  { name: 'Sep', sales: 85 },
];

export const SalesChart = () => {
  // Calculate percentage change from first to last month
  const percentChange = ((data[data.length - 1].sales - data[0].sales) / data[0].sales) * 100;
  const percentChangeDisplay = percentChange >= 0 ? `+${percentChange.toFixed(1)}%` : `${percentChange.toFixed(1)}%`;
  const percentChangeColor = percentChange >= 0 ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50';

  // Dummy export handler
  const handleExport = () => {
    alert('Exporting chart data... (demo only)');
  };

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            Total Sales
            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${percentChangeColor}`}>
              {percentChangeDisplay}
            </span>
          </h3>
          <p className="text-xs text-gray-400 mt-1">Jan - Sep, 2025</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExport}
            className="flex items-center gap-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg text-sm text-gray-700 transition-colors"
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="inline-block">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Export
          </button>
          <div className="relative">
            <select className="appearance-none bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#005660] pr-6">
              <option>Sort By Date</option>
              <option>Sort By Sales</option>
            </select>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <path d="M6 9L10 5L14 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#005660" stopOpacity={0.25}/>
                <stop offset="95%" stopColor="#005660" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 12 }}
              tickFormatter={(value) => `$${value}k`}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }}
              formatter={(value) => [`$${value}k`, 'Sales']}
            />
            {/* <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: 13, color: '#374151' }} />
            <Area
              type="monotone"
              dataKey="sales"
              stroke={false}
              fill="url(#colorSales)"
              fillOpacity={1}
              isAnimationActive={true}
            /> */}
            <Line 
              type="monotone" 
              dataKey="sales" 
              stroke="#005660" 
              strokeWidth={3}
              dot={{ fill: '#fff', stroke: '#005660', strokeWidth: 2, r: 5 }}
              activeDot={{ r: 7, fill: '#005660', stroke: '#fff', strokeWidth: 2 }}
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};