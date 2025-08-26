
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProductsProvider } from "./context/ProductsContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Product from "./pages/Product";
import AddProduct from "./pages/AddProduct";
import Customer from "./pages/Customer";
import Invoices from "./pages/Invoices";

function App() {
  return (
    <div className="font-sans">
      <ProductsProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/products" element={<Product />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/customers" element={<Customer />} />
            <Route path="/invoice" element={<Invoices />} />
          </Routes>
        </Router>
      </ProductsProvider>
    </div>
  );
}

export default App;
