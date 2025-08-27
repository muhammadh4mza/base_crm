import { useState, useRef, useEffect } from "react";

const tabs = [
  { key: "profile", label: "Profile Setting" },
  { key: "account", label: "Account Setting" },
];

export default function SettingsContent() {
  const [activeTab, setActiveTab] = useState("profile");
  const [businessName, setBusinessName] = useState("CWC");
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [colorTheme, setColorTheme] = useState("#005660");
  const [isEditingBusinessName, setIsEditingBusinessName] = useState(false);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  
  const fileInputRef = useRef(null);
  const colorThemes = ["#005660", "#4F46E5", "#DC2626", "#059669", "#7C3AED", "#D97706"];

  // Handle logo upload
  const handleUploadLogo = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle business name editing
  const handleEditBusinessName = () => {
    setIsEditingBusinessName(true);
  };

  const handleSaveBusinessName = () => {
    setIsEditingBusinessName(false);
  };

  const handleCancelEditBusinessName = () => {
    setIsEditingBusinessName(false);
  };

  // Handle color theme selection
  const handleEditColorTheme = () => {
    setIsColorPickerOpen(true);
  };

  const handleColorSelect = (color) => {
    setColorTheme(color);
    setIsColorPickerOpen(false);
    // Set CSS variable for global theme color
    document.documentElement.style.setProperty('--theme-color', color);
  };

  // On mount, set the CSS variable to the current colorTheme
  useEffect(() => {
    document.documentElement.style.setProperty('--theme-color', colorTheme);
  }, []);

  return (
    <div className="flex-1 p-6 bg-gray-50 ">
      <div className="mx-auto space-y-6">
        {/* Settings Tabs */}
        <div className="flex space-x-4">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-8 py-4 rounded-2xl font-semibold transition-all ${
                activeTab === tab.key
                  ? "bg-[#005660] text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Business Logo Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
                {logoPreview ? (
                  <img src={logoPreview} alt="Business Logo" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-gray-600 font-bold text-xl">CWC</span>
                )}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Your business logo</h3>
                <p className="text-sm text-gray-500">WEBP, PNG, SVG or JPEG (max 5MB)</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".webp,.png,.svg,.jpg,.jpeg"
                className="hidden"
              />
              <button
                onClick={handleUploadLogo}
                className="bg-gray-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                Upload logo
              </button>
              {logoPreview && (
                <button
                  onClick={() => {
                    setLogo(null);
                    setLogoPreview(null);
                  }}
                  className="border border-gray-300 px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Business Profile Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center">
                <span className="text-gray-600 font-bold text-xl">CWC</span>
              </div>
              <div>
                {isEditingBusinessName ? (
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#005660]"
                    />
                    <button
                      onClick={handleSaveBusinessName}
                      className="bg-[#005660] text-white px-3 py-2 rounded-lg font-medium hover:bg-[#00444d] transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelEditBusinessName}
                      className="border border-gray-300 px-3 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="text-lg font-semibold text-gray-900">Your business profile name</h3>
                    <p className="text-gray-600">{businessName}</p>
                  </>
                )}
              </div>
            </div>
            {!isEditingBusinessName && (
              <button
                onClick={handleEditBusinessName}
                className="border border-gray-300 px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Edit
              </button>
            )}
          </div>
        </div>

        {/* Color Theme Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div 
                className="w-10 h-10 rounded-lg border border-gray-200"
                style={{ backgroundColor: colorTheme }}
              ></div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Color Theme</h3>
                <p className="text-sm text-gray-500">Selected: {colorTheme}</p>
              </div>
            </div>
            
            <div className="relative">
              <button
                onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
                className="border border-gray-300 px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Change
              </button>
              
              {isColorPickerOpen && (
                <div className="absolute right-0 mt-2 bg-white p-4 rounded-lg shadow-lg border border-gray-200 z-10">
                  <h4 className="font-medium text-gray-700 mb-2">Select a color theme</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {colorThemes.map((color) => (
                      <div
                        key={color}
                        className="w-12 h-12 rounded-lg cursor-pointer border border-gray-200"
                        style={{ backgroundColor: color }}
                        onClick={() => handleColorSelect(color)}
                      ></div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Save Changes Button */}
        <div className="flex justify-end">
          <button
            className="bg-[var(--theme-color)] text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};