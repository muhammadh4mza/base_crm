import { TrendingUp, ShoppingCart, DollarSign } from 'lucide-react';

export const MetricCard = ({ 
  title, 
  value, 
  variant = 'secondary' 
}) => {
  const cardClasses = variant === 'primary' 
    ? 'bg-[#ECECEC] text-gray-700 border-gray-300'
    : 'bg-[#ECECEC] text-gray-700 border-gray-300';

  const iconClasses = variant === 'primary'
    ? 'bg-[#005660] text-white'
    : 'bg-[#005660] text-white';

  // Get appropriate icon based on title
  const getIcon = () => {
    const iconProps = { 
      size: 24, 
      className: variant === 'primary' ? 'text-white' : 'text-white' 
    };
    
    if (title.toLowerCase().includes('sales')) return <TrendingUp {...iconProps} />;
    else if (title.toLowerCase().includes('order')) return <ShoppingCart {...iconProps} />;
    else if (title.toLowerCase().includes('revenue')) return <DollarSign {...iconProps} />;
    
    return <TrendingUp {...iconProps} />;
  };

  return (
    <div className={`p-4 sm:p-6 rounded-lg border ${cardClasses} shadow-sm transition-colors duration-200 group hover:bg-[#005660] hover:text-white`}> 
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          {/* Title */}
          <p 
            className={`text-xs sm:text-sm font-medium mb-1 sm:mb-2 ${
              variant === 'primary' ? 'text-gray-500' : 'text-gray-500'
            } group-hover:text-white truncate`}
          >
            {title}
          </p>
          {/* Value */}
          <p className="text-3xl sm:text-5xl font-bold group-hover:text-white break-words">
            {value}
          </p>
        </div>
        {/* Icon */}
        <div 
          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center ${iconClasses} flex-shrink-0 group-hover:bg-white/20 group-hover:text-white`}
        >
          {getIcon()}
        </div>
      </div>
    </div>
  );
};

// Usage example
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  <MetricCard title="Total Sales" value="1,250" />
  <MetricCard title="Orders" value="320" />
  <MetricCard title="Revenue" value="$12,450" />
</div>