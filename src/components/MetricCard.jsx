import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from "lucide-react";

export const MetricCard = ({ 
  title, 
  value, 
  icon, 
  variant = 'secondary',
  trend,
  change,
  description,
  loading = false
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);
  
  const isPositiveTrend = change >= 0;
  
  const cardClasses = `
    p-6 rounded-xl border shadow-sm transition-all duration-300 transform
    ${variant === 'primary' 
      ? 'bg-blue-600 text-white border-blue-700 shadow-blue-100' 
      : 'bg-white text-gray-800 border-gray-200 hover:shadow-md'
    }
    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
  `;
    
  const iconClasses = `
    w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-200
    ${variant === 'primary'
      ? 'bg-blue-700/30 text-white' 
      : 'bg-blue-100 text-blue-600'
    }
  `;

  const trendClasses = `
    flex items-center text-sm font-medium
    ${isPositiveTrend 
      ? 'text-green-600' 
      : 'text-red-600'
    }
  `;

  return (
    <div className={cardClasses}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className={`text-sm font-medium mb-2 ${
            variant === 'primary' 
              ? 'text-blue-100' 
              : 'text-gray-500'
          }`}>
            {title}
          </p>
          
          {loading ? (
            <div className="h-9 w-24 bg-gray-200 animate-pulse rounded-md mb-2"></div>
          ) : (
            <p className={`text-3xl font-bold mb-2 ${
              variant === 'primary' ? 'text-white' : 'text-gray-800'
            }`}>
              {value}
            </p>
          )}
          
          {(trend !== undefined || change !== undefined) && !loading && (
            <div className={trendClasses}>
              {trend !== undefined && (
                isPositiveTrend ? (
                  <TrendingUp size={16} className="mr-1" />
                ) : (
                  <TrendingDown size={16} className="mr-1" />
                )
              )}
              {change !== undefined && (
                <span>
                  {isPositiveTrend ? '+' : ''}{change}%
                </span>
              )}
              {trend !== undefined && change === undefined && (
                <span>{isPositiveTrend ? 'Up' : 'Down'}</span>
              )}
            </div>
          )}
          
          {description && !loading && (
            <p className={`text-xs mt-2 ${
              variant === 'primary' ? 'text-blue-100/80' : 'text-gray-500'
            }`}>
              {description}
            </p>
          )}
        </div>
        
        <div className={iconClasses}>
          {loading ? (
            <div className="w-6 h-6 bg-current opacity-20 rounded-full animate-pulse"></div>
          ) : (
            icon
          )}
        </div>
      </div>
      
      {/* Progress bar for primary variant */}
      {variant === 'primary' && !loading && (
        <div className="mt-4 w-full bg-blue-700/30 rounded-full h-1.5">
          <div 
            className="bg-white h-1.5 rounded-full transition-all duration-1000 ease-out" 
            style={{ width: `${Math.min(change || 0, 100)}%` }}
          ></div>
        </div>
      )}
    </div>
  );
};

// Example usage component
export const MetricCardGrid = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      <MetricCard 
        title="Total Revenue"
        value="$45,231.89"
        icon={<span>💰</span>}
        change={12.5}
        description="+20% from last month"
        loading={isLoading}
      />
      <MetricCard 
        title="Subscriptions"
        value="+2,350"
        icon={<span>👥</span>}
        change={18.2}
        description="+180 from last week"
        loading={isLoading}
      />
      <MetricCard 
        title="Sales"
        value="+12,234"
        icon={<span>🛒</span>}
        change={-2.1}
        description="-12% from last month"
        loading={isLoading}
      />
      <MetricCard 
        title="Active Now"
        value="573"
        icon={<span>🔥</span>}
        variant="primary"
        change={24.8}
        description="+201 in last hour"
        loading={isLoading}
      />
    </div>
  );
};