import { BrowserRouter, Route, Routes } from "react-router-dom";

import AppProvider from "./context/AppProvider";
// Pages
import Home from "./pages/home";
import Database from "./pages/database";
import { useState } from "react";

export default function App() {
  const [section, setSection] = useState("home");

  const toggleSection = () => {
    setSection("database");
  };

  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/database" element={<Database />} />
          <Route path="*" element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
