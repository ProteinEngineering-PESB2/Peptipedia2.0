import Alignment from "./Alignment";
import GeneOntology from "./Characterization/GeneOntology";
import Phisicochemical from "./Characterization/Phisicochemical";
import Codification from "./Codification";

const RenderSection = ({ section }) => {
  return (
    <>
      {section === "alignments" && <Alignment />}
      {section === "phisicochemical" && <Phisicochemical />}
      {section === "gene_ontology" && <GeneOntology />}
      {section === "codifications" && <Codification />}
    </>
  );
};

export default RenderSection;
