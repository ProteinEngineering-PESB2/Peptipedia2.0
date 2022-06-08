import { BrowserRouter, Route, Routes } from "react-router-dom";

// Pages
import Home from "./pages/home";
import Database from "./pages/database";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/database" element={<Database />} />
      </Routes>
    </BrowserRouter>
  );
}
