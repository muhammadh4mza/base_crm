import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';
import { Calendar, Filter, Download, TrendingUp } from "lucide-react";

const generateData = (days = 9) => {
  const data = [];
  const today = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    
    data.push({
      name: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      fullDate: date.toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric' }),
      sales: Math.floor(Math.random() * 100) + 20,
      previous: Math.floor(Math.random() * 90) + 10,
    });
  }
  
  return data;
};

export const SalesChart = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    setIsLoading(true);
    const timer = setTimeout(() => {
      let days;
      switch(timeRange) {
        case 'week': days = 7; break;
        case 'month': days = 30; break;
        case 'quarter': days = 90; break;
        default: days = 7;
      }
      setData(generateData(days));
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [timeRange]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const dataPoint = data.find(item => item.name === label);
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="text-gray-500 text-sm">{dataPoint.fullDate}</p>
          <p className="font-bold text-gray-800 mt-1">
            ${payload[0].value}k
          </p>
          <p className="text-gray-500 text-sm mt-1">
            Previous: ${dataPoint.previous}k
          </p>
          <p className={`text-sm mt-1 ${
            payload[0].value > dataPoint.previous ? 'text-green-600' : 'text-red-600'
          }`}>
            {payload[0].value > dataPoint.previous ? '↑' : '↓'} 
            {Math.abs(Math.round(((payload[0].value - dataPoint.previous) / dataPoint.previous) * 100))}%
          </p>
        </div>
      );
    }
    return null;
  };

  const timeRangeOptions = [
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
  ];

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Total Sales</h3>
          <p className="text-sm text-gray-500 mt-1">Revenue performance over time</p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex bg-gray-100 rounded-lg p-1">
            {timeRangeOptions.map(option => (
              <button
                key={option.value}
                onClick={() => setTimeRange(option.value)}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  timeRange === option.value
                    ? 'bg-white text-gray-800 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          
          <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
            <Download size={16} className="text-gray-600" />
          </button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="h-80 flex items-center justify-center">
          <div className="animate-pulse text-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
            <p className="text-gray-500">Loading chart data...</p>
          </div>
        </div>
      ) : (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
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
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="sales" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4, stroke: '#fff' }}
                activeDot={{ r: 6, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="previous" 
                stroke="#9ca3af" 
                strokeWidth={2}
                strokeDasharray="4 4"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
      
      <div className="flex flex-wrap items-center justify-between mt-6 pt-6 border-t border-gray-100 gap-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-0.5 bg-blue-500"></div>
          <span className="text-sm text-gray-600">Current Period</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-0.5 bg-gray-400 border border-dashed"></div>
          <span className="text-sm text-gray-600">Previous Period</span>
        </div>
        
        <div className="flex items-center gap-2 text-green-600">
          <TrendingUp size={16} />
          <span className="text-sm font-medium">
            +12.4% from previous period
          </span>
        </div>
      </div>
    </div>
  );
};