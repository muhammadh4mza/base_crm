import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: '01', sales: 60 },
  { name: '02', sales: 80 },
  { name: '03', sales: 55 },
  { name: '04', sales: 78 },
  { name: '05', sales: 58 },
  { name: '06', sales: 82 },
  { name: '07', sales: 75 },
  { name: '08', sales: 60 },
  { name: '09', sales: 85 },
];

export const SalesChart = () => {
  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Total Sales</h3>
        <div className="flex items-center gap-2 text-sm text-gray-500 border border-gray-300 rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-50">
          <span>Sort By Date</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="rotate-90">
            <path d="M6 9L10 5L14 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
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
            <Line 
              type="monotone" 
              dataKey="sales" 
              stroke="#3b82f6" 
              strokeWidth={3}
              dot={{ fill: '#3b82f6', strokeWidth: 0, r: 5 }}
              activeDot={{ r: 7, fill: '#3b82f6' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};