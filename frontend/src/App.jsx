import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Prediction from "./pages/Prediction";
import DataQuality from "./pages/DataQuality";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/prediction" element={<Prediction />} />

        <Route path="/data-quality" element={<DataQuality />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
