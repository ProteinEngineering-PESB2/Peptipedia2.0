import Blast from "./Alignment/Blast";
import MSA from "./Alignment/MSA";
import GeneOntology from "./Characterization/GeneOntology";
import Phisicochemical from "./Characterization/Phisicochemical";
import Pfam from "./Characterization/Pfam";
import Codification from "./Codification";

const RenderSection = ({ section }) => {
  return (
    <>
      {section === "blast" && <Blast />}
      {section === "msa" && <MSA />}
      {section === "phisicochemical" && <Phisicochemical />}
      {section === "gene_ontology" && <GeneOntology />}
      {section === "codifications" && <Codification />}
      {section === "pfam" && <Pfam />}
    </>
  );
};

export default RenderSection;
