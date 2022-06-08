import { BrowserRouter, Route, Routes } from "react-router-dom";

import AppProvider from "./context/AppProvider";
// Pages
import Home from "./pages/home";
import Database from "./pages/database";
import AdvancedSearch from "./pages/advanced_search";
import ConverterFasta from "./pages/converter_fasta";
import AlignmentSequence from "./pages/alignment_sequence";
import MultiAlignmentSequence from "./pages/msa";
import Pfam from "./pages/pfam";
import GeneOntology from "./pages/gene_ontology";
import Frequency from "./pages/frequency";
import Phisicochemical from "./pages/phisicochemical";
import Encoding from "./pages/encoding";
import Clustering from "./pages/clustering";
import SupervisedLearning from "./pages/supervised_learning";

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/database" element={<Database />} />
          <Route path="/advanced-search" element={<AdvancedSearch />} />
          <Route path="/converter-fasta" element={<ConverterFasta />} />
          <Route path="/alignment-sequence" element={<AlignmentSequence />} />
          <Route path="/msa" element={<MultiAlignmentSequence />} />
          <Route path="/pfam" element={<Pfam />} />
          <Route path="/gene-ontology" element={<GeneOntology />} />
          <Route path="/frequency" element={<Frequency />} />
          <Route path="/phisicochemical" element={<Phisicochemical />} />
          <Route path="/encoding" element={<Encoding />} />
          <Route path="/clustering" element={<Clustering />} />
          <Route path="/supervised-learning" element={<SupervisedLearning />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
