import { Sidebar } from "../components/Sidebar";
import { DashboardHeader } from "../components/DashboardHeader";



const Settings = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-1 ">
  <DashboardHeader title="Settings" />


      </main>
    </div>
  );
};

export default Settings;