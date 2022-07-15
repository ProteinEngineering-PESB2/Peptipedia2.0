import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import AppProvider from "./context/AppProvider";
// Pages
import Home from "./pages/home";
import Database from "./pages/database";
import AdvancedSearch from "./pages/advanced_search";
import FastaConverter from "./pages/fasta_converter";
import AlignmentSequence from "./pages/alignment_sequence";
import MultiAlignmentSequence from "./pages/msa";
import Pfam from "./pages/pfam";
import GeneOntology from "./pages/gene_ontology";
import Frequency from "./pages/frequency";
import Physicochemical from "./pages/physicochemical";
import Encoding from "./pages/encoding";
import Clustering from "./pages/clustering";
import SupervisedLearning from "./pages/supervised_learning";
import { Routes, Route } from "react-router-loading";
import LoadingComponent from "./components/Loading";
import PeptideDetail from "./pages/peptipe_detail";
import AboutUs from "./pages/AboutUs"
import HowToCite from "./pages/HowToCite";

export default function App() {
  const theme = createTheme();

  return (
    <AppProvider>
      <ThemeProvider theme={theme}>
        <>
          <BrowserRouter>
            <Routes loadingScreen={LoadingComponent}>
              <Route path="/" element={<Home />} loading />
              <Route path="/about-us" element={<AboutUs/>} loading/>
              <Route path="/how-to-cite" element={<HowToCite/>} loading/>
              <Route path="/database" element={<Database />} loading />
              <Route
                path="/advanced-search"
                element={<AdvancedSearch />}
                loading
              />
              <Route
                path="/fasta-converter"
                element={<FastaConverter />}
                loading
              />
              <Route
                path="/alignment-sequence"
                element={<AlignmentSequence />}
                loading
              />
              <Route path="/msa" element={<MultiAlignmentSequence />} loading />
              <Route path="/pfam" element={<Pfam />} loading />
              <Route path="/gene-ontology" element={<GeneOntology />} loading />
              <Route path="/frequency" element={<Frequency />} loading />
              <Route
                path="/physicochemical"
                element={<Physicochemical />}
                loading
              />
              <Route path="/encoding" element={<Encoding />} loading />
              <Route path="/clustering" element={<Clustering />} loading />
              <Route
                path="/supervised-learning"
                element={<SupervisedLearning />}
                loading
              />
              <Route path="/peptide/:peptideId" element={<PeptideDetail/>} loading/>
              <Route path="*" element={<Home />} loading />
            </Routes>
          </BrowserRouter>
          <Toaster />
        </>
      </ThemeProvider>
    </AppProvider>
  );
}
