import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Test from "../Test";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/test" element={<Test/>}/>
    </Routes>
  );
};

export default Router;
