export const MetricCard = ({ 
  title, 
  value, 
  icon, 
  variant = 'secondary' 
}) => {
  const cardClasses = variant === 'primary' 
    ? 'bg-blue-600 text-white border-blue-700'
    : 'bg-white text-gray-800 border-gray-200';
    
  const iconClasses = variant === 'primary'
    ? 'bg-blue-700/20 text-white'
    : 'bg-blue-100 text-blue-600';

  return (
    <div className={`p-6 rounded-lg border ${cardClasses} shadow-sm`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm font-medium mb-2 ${
            variant === 'primary' 
              ? 'text-blue-100' 
              : 'text-gray-500'
          }`}>
            {title}
          </p>
          <p className="text-3xl font-bold">
            {value}
          </p>
        </div>
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${iconClasses}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};