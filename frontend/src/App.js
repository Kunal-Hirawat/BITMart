import { Routes, Route } from "react-router-dom";
import Info from "./pages/info.js";
import Support from "./pages/support.js";
import Pagenotfound from "./pages/Pagenotfound.js";
import Register from "./pages/Register.js";
import Login from "./pages/login.js"
import Home from "./pages/Home.js";

function App() {
  return (
    <>
      <Routes>
        <Route path="/info" element={<Info />} />
        <Route path="/support" element={<Support />} />
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        {/* <Route path="*" element={<Pagenotfound />} /> */}
        <Route path="*" element={<Pagenotfound />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
