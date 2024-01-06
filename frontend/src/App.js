import { Routes, Route } from "react-router-dom";
import Info from "./pages/info.js";
import Support from "./pages/support.js";
import Pagenotfound from "./pages/Pagenotfound.js";
import Register from "./pages/Register.js";
import Login from "./pages/login.js"
import ForgotPassword from "./pages/ForgotPassword.js";
import Home from "./pages/Home.js";
import CartPage from "./pages/CartPage.js";
import Dashboard from "./pages/user/Dashboard.js";
import PrivateRoute from "./components/Routes/Private.js";
import AdminRoute from "./components/Routes/AdminRoute.js";
import AdminDashboard from "./pages/Admin/AdminDashboard.js";
import CreateProduct from "./pages/Admin/CreateProduct.js";
import Users from "./pages/Admin/Users.js";
import Orders from "./pages/user/Orders.js";
import Profile from "./pages/user/Profile.js";
import Products from "./pages/Admin/Products.js";
import UpdateProduct from "./pages/Admin/UpdateProduct.js";
import BuySell from "./pages/BuySell.js";

function App() {
  return (
    <>
      <Routes>
        <Route path="/info" element={<Info />} />
        <Route path="/support" element={<Support />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
        <Route path="user" element={<Dashboard />} />
        <Route path="user/orders" element={<Orders />} />
        <Route path="user/profile" element={<Profile />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="admin/create-product" element={<CreateProduct />} />  
        <Route path="admin/product/:slug" element={<UpdateProduct />} />  
        <Route path="admin/products" element={<Products />} />          
        <Route path="admin/users" element={<Users />} />  
        </Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/cart" element={<CartPage />} />
        {/* <Route path="*" element={<Pagenotfound />} /> */}
        <Route path="/forgotPassword" element={<ForgotPassword></ForgotPassword>}></Route>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/buy-sell" element = {<BuySell/>}></Route>
        {/* <Route path="*" element={<Pagenotfound />} /> */}
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;
