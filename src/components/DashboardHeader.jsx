export const DashboardHeader = () => {
  return (
    <header className="bg-[#f5f5f5] shadow-sm border border-gray-300 flex items-center justify-between mb-8 px-6 py-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Dashboard</h1>
        <p className="text-gray-600">You have got 24 new sales.</p>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-gray-800">CWC</span>
        </div>
        
        <div className="w-10 h-10 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center">
          <span className="text-sm font-medium text-gray-600">U</span>
        </div>
      </div>
    </header>
  );
};