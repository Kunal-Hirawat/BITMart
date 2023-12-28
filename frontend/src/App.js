import { Routes, Route } from "react-router-dom";
import Info from "./pages/info.js"
import Support from "./pages/support.js"
import TermsOfUse from "./pages/termsOfUse.js"
import Pagenotfound from "./pages/Pagenotfound.js";

function App() {
  return (
    <>
      <Routes>
        <Route path="/info" element={<Info />} />
        <Route path="/support" element={<Support />} />
        <Route path="/termsOfUse" element={<TermsOfUse />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;