import './App.css'

import { BrowserRouter } from "react-router-dom";

import Router from "./router";

import { AppProvider } from './context/AppContext'

const App = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
