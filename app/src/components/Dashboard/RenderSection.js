import Alignment from "./Alignment";
import GeneOntology from "./Characterization/GeneOntology";
import Phisicochemical from "./Characterization/Phisicochemical";

const RenderSection = ({ section }) => {
  return (
    <>
      {section === "alignments" && <Alignment />}
      {section === "phisicochemical" && <Phisicochemical />}
      {section === "gene_ontology" && <GeneOntology />}
    </>
  );
};

export default RenderSection;
