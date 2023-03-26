import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import AppProvider from "./context/AppProvider";
// Pages
import Home from "./pages/home";
import Database from "./pages/database";
import AdvancedSearch from "./pages/advanced_search";
import AlignmentSequence from "./pages/alignment_sequence";
import { Routes, Route } from "react-router-loading";
import LoadingComponent from "./components/Loading";
import PeptideDetail from "./pages/peptipe_detail";
import Team from "./pages/Team";
import HowToCite from "./pages/HowToCite";
import NotFound from "./pages/NotFound";
import Actividades from "./pages/Actividades";
import Promiscuous from "./pages/Promiscuous";
import ActivityDetail from "./pages/ActivityDetail";

export default function App() {
  const theme = createTheme();

  return (
    <AppProvider>
      <ThemeProvider theme={theme}>
        <>
          <BrowserRouter>
            <Routes loadingScreen={LoadingComponent}>
              <Route path="/" element={<Home />} loading />
              <Route path="/team" element={<Team />} loading />
              <Route path="/how-to-cite" element={<HowToCite />} loading />
              <Route path="/database" element={<Database />} loading />
              <Route
                path="/advanced-search"
                element={<AdvancedSearch />}
                loading
              />
              <Route
                path="/alignment-sequence"
                element={<AlignmentSequence />}
                loading
              />
              <Route
                path="/peptide/:peptideId"
                element={<PeptideDetail />}
                loading
              />
              <Route path="/activities" element={<Actividades />} loading />
              <Route path="/promiscuous" element={<Promiscuous />} loading />
              <Route
                path="/activity/:activityId"
                element={<ActivityDetail />}
                loading
              />
              <Route path="*" element={<NotFound />} loading />
            </Routes>
          </BrowserRouter>
          <Toaster />
        </>
      </ThemeProvider>
    </AppProvider>
  );
}
