import Layout from "../components/layout";
import SectionTitle from "../components/section_title";
import StructuralPredictionForm from "../components/structural_prediction/StructuralPredictionForm";
import { useHandleSection } from "../hooks/useHandleSection";
import useLoadingComponent from "../hooks/useLoadingComponent";
import { Graph } from "react-d3-graph";
import { Box } from "@mui/material";

const data = {
  nodes: [{ id: "Harry" }, { id: "Sally" }, { id: "Alice" }],
  links: [
    { source: "Harry", target: "Sally" },
    { source: "Harry", target: "Alice" },
  ],
};

// the graph configuration, just override the ones you need
const myConfig = {
  nodeHighlightBehavior: true,
  node: {
    color: "lightgreen",
    size: 500,
    highlightStrokeColor: "blue",
  },
  link: {
    highlightColor: "lightblue",
  },
};

const onClickNode = function (nodeId: any) {
  window.alert(`Clicked node ${nodeId}`);
};

const onClickLink = function (source: any, target: any) {
  window.alert(`Clicked link between ${source} and ${target}`);
};

function StructuralPrediction() {
  useLoadingComponent();
  useHandleSection({ section: "structural_prediction" });

  return (
    <Layout>
      <>
        <SectionTitle
          title="Structural Prediction"
          description="Falta una descripción"
        />

        <StructuralPredictionForm />

        <Box>
        <Graph
          id="graph-id" // id is mandatory
          data={data}
          config={myConfig}
          onClickNode={onClickNode}
          onClickLink={onClickLink}
        />
        </Box>
      </>
    </Layout>
  );
}

export default StructuralPrediction;
