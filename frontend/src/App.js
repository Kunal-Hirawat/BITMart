import { Routes, Route } from "react-router-dom";
import Info from "./pages/info.js";
import Support from "./pages/support.js";
import Pagenotfound from "./pages/Pagenotfound.js";
import Home from "./pages/Home.js";

function App() {
  return (
    <>
      <Routes>
        <Route path="/info" element={<Info />} />
        <Route path="/support" element={<Support />} />
        {/* <Route path="*" element={<Pagenotfound />} /> */}
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
