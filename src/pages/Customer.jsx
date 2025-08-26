import { Sidebar } from "../components/Sidebar";
import { DashboardHeader } from "../components/DashboardHeader";
              import { CustomersTable } from "../components/CustomersTable";


const Customer = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-1 ">
  <DashboardHeader title="Products" />

        <CustomersTable />

      </main>
    </div>
  );
};

export default Customer;