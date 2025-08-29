import tracksuitImg from "../assets/images/tracksuit.png";

export const DashboardHeader = ({ title = "Dashboard" }) => {
  return (
    <header className="bg-[#f5f5f5] shadow-sm border border-gray-300 flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 px-4 sm:px-6 py-4 gap-4 sm:gap-0">
      {/* Left Side */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-[var(--theme-color)] mb-1">{title}</h1>
        <p className="text-sm sm:text-base text-gray-600">You have got 24 new sales.</p>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4 self-end sm:self-auto">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs sm:text-sm font-medium text-gray-800">CWC</span>
        </div>
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center overflow-hidden">
          <img
            src={tracksuitImg}
            alt="User Icon"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </header>
  );
};
