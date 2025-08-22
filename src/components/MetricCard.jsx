import totalSalesIcon from '../assets/icons/total_sales.png';
import ordersIcon from '../assets/icons/orders.png';
import revenueIcon from '../assets/icons/Revenue.png';

export const MetricCard = ({ 
  title, 
  value, 
  icon, // will be ignored in favor of image
  variant = 'secondary' 
}) => {
  const cardClasses = variant === 'primary' 
    ? 'bg-[#ECECEC] text-gray-700 border-gray-300'
    : 'bg-[#ECECEC] text-gray-700 border-gray-300';

  const iconClasses = variant === 'primary'
    ? 'bg-blue-700/20 text-white'
    : 'bg-blue-100 text-blue-600';

  let iconSrc = null;
  if (title.toLowerCase().includes('sales')) iconSrc = totalSalesIcon;
  else if (title.toLowerCase().includes('order')) iconSrc = ordersIcon;
  else if (title.toLowerCase().includes('revenue')) iconSrc = revenueIcon;

  return (
    <div className={`p-4 sm:p-6 rounded-lg border ${cardClasses} shadow-sm transition-colors duration-200 group hover:bg-[#005660] hover:text-white`}> 
      <div className="flex items-center justify-between">
        <div>
          {/* Title */}
          <p 
            className={`text-xs sm:text-sm font-medium mb-1 sm:mb-2 ${
              variant === 'primary' ? 'text-gray-500' : 'text-gray-500'
            } group-hover:text-white`}
          >
            {title}
          </p>

          {/* Value */}
          <p className="text-3xl sm:text-5xl font-bold group-hover:text-white">
            {value}
          </p>
        </div>

        {/* Icon */}
        <div 
          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center ${iconClasses}`}
        >
          {iconSrc && (
            <img 
              src={iconSrc} 
              alt={title + ' icon'} 
              className="w-8 h-8 sm:w-12 sm:h-12 object-contain" 
            />
          )}
        </div>
      </div>
    </div>
  );
};
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  <MetricCard title="Total Sales" value="1,250" />
  <MetricCard title="Orders" value="320" />
  <MetricCard title="Revenue" value="$12,450" />
</div>
