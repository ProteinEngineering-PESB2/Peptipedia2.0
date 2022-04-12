import Home from "./Home";
import Blast from "./Alignment/Blast";
import MSA from "./Alignment/MSA";
import GeneOntology from "./Characterization/GeneOntology";
import Phisicochemical from "./Characterization/Phisicochemical";
import Pfam from "./Characterization/Pfam";
import Frequency from "./Characterization/Frequency";
import Codification from "./Codification";
import Clustering from "./Clustering";
import SupervisedLearning from "./SupervisedLearning";
import AdvancedSearch from "./AdvancedSearch";

const RenderSection = ({ section }) => {
  return (
    <>
      {section === "home" && <Home/>}
      {section === "blast" && <Blast />}
      {section === "msa" && <MSA />}
      {section === "phisicochemical" && <Phisicochemical />}
      {section === "gene_ontology" && <GeneOntology />}
      {section === "pfam" && <Pfam />}
      {section === "frequency" && <Frequency/>}
      {section === "codifications" && <Codification />}
      {section === "clustering" && <Clustering/>}
      {section === "supervised-learning" && <SupervisedLearning/>}
      {section === "advanced-search" && <AdvancedSearch/>}
    </>
  );
};

export default RenderSection;
