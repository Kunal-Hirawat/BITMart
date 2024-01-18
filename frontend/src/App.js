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
import Profile from "./pages/user/Profile.js";
import Products from "./pages/Admin/Products.js";
import UpdateProduct from "./pages/Admin/UpdateProduct.js";
import BuySell from "./pages/BuySell.js";
import Search from "./pages/Search.js";
import CreateProductUser from "./pages/user/CreateProductUser.js";
import Product from "./pages/Product.js";
import UserProduct from "./pages/user/UserProduct.js";
import UpdateUserProduct from "./pages/user/UpdateUserProduct.js";
import { useAuth } from "./context/auth.js";
import LostFound from "./pages/LostFound.js";
import UpdateLostFoundProduct from "./pages/user/UpdateLostFoundProduct.js";
import AdminProfile from "./pages/Admin/AdminProfile.js";
import UpdateAdminLostFound from "./pages/Admin/UpdateAdminLostFoundProduct.js";

function App() {
  const [auth]=useAuth();
  return (
    <>
      <Routes>
        <Route path="/info" element={<Info />} />
        <Route path="/product/:id" element={<Product/>} />
        <Route path="/support" element={<Support />} />
        <Route path="/search" element={<Search></Search>}></Route>
        <Route path="/dashboard" element={<PrivateRoute />}>
        <Route path="user" element={<Dashboard />} />
        <Route path="user/create-product" element={<CreateProductUser />} />
        <Route path="user/user-products/:id" element={<UpdateUserProduct />} />
        <Route path="user/lostfound-products/:id" element={<UpdateLostFoundProduct />} />
        <Route path="user/user-products" element={<UserProduct />} />
        <Route path="user/profile" element={<Profile />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="admin/create-product" element={<CreateProduct />} />  
        <Route path="admin/product/:id" element={<UpdateProduct />} />  
        <Route path="admin/products" element={<Products />} /> 
        <Route path="admin/lostfound-product/:id" element={UpdateAdminLostFound}></Route>         
        <Route path="admin/users" element={<Users />} />  
        <Route path="admin/profile" element={<AdminProfile />} />
        </Route>
        <Route path="/register" element={!auth.user?<Register/>:<Pagenotfound></Pagenotfound>}></Route>
        <Route path="/login" element={!auth.user?<Login/>:<Pagenotfound></Pagenotfound>}></Route>
        <Route path="/cart" element={!auth.user?<Login></Login>:<CartPage />} />
        <Route path="/forgotPassword" element={!auth.user?<ForgotPassword></ForgotPassword>:<Pagenotfound></Pagenotfound>}></Route>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/buy-sell" element = {<BuySell/>}></Route>
        <Route path="/lost-found" element={<LostFound></LostFound>}></Route>
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;
