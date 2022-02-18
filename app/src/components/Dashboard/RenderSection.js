import Alignment from "./Alignment";
import GeneOntology from "./Characterization/GeneOntology";
import Phisicochemical from "./Characterization/Phisicochemical";
import Test from '../../Test'

const RenderSection = ({ section }) => {
  return (
    <>
      {section === "alignments" && <Alignment />}
      {section === "phisicochemical" && <Phisicochemical />}
      {section === "gene_ontology" && <GeneOntology />}
      {section === "test" && <Test/>}
    </>
  );
};

export default RenderSection;
