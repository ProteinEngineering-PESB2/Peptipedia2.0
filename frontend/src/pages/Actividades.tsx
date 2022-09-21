import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Skeleton,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import DataTable from "../components/datatable";
import Layout from "../components/layout";
import SectionTitle from "../components/section_title";
import useGetAllActivities from "../hooks/useGetAllActivities";
import { useHandleSection } from "../hooks/useHandleSection";
import useLoadingComponent from "../hooks/useLoadingComponent";
import Tree from "react-d3-tree";

function Actividades() {
  useLoadingComponent();
  useHandleSection({ section: "activities" });
  const [dataTree, setDataTree] = useState<any>({});
  const [showSkeletonTree, setShowSkeletonTree] = useState(true);
  const [encodingValue, setEncodingValue] = useState<number | string>(1);
  const [dataErrorBars, setDataErrorBars] = useState<any[]>([]);

  const {
    tableActivitiies,
    loadingTableActivities,
  } = useGetAllActivities();

  const getDataTree = async () => {
    try {
      const { data } = await axios.get("/api/get_tree/");
      setDataTree(data.tree);
    } catch (error) {
      setDataTree({});
    }
    setShowSkeletonTree(false);
  };

  const getSpectralByEncoding = async () => {
    try {
      const response = await axios.get(
        `/api/get_spectral_by_encoding/${encodingValue}`
      );
      
      const traceImmunologicalActivity = {
        x: response.data[0].x_average,
        y: response.data[0].average,
        line: { color: "rgb(0,100,80)" },
        mode: "spline",
        name: "Immunological activity",
        type: "scatter",
      };
      const traceImmunologicalActivityCi = {
        x: response.data[0].x_ci,
        y: response.data[0].ci,
        fill: "tozerox",
        fillcolor: "rgba(0,100,80,0.2)",
        line: { color: "transparent" },
        name: "Immunological activity",
        showlegend: false,
        type: "scatter",
      };

      const traceToxins = {
        x: response.data[1].x_average,
        y: response.data[1].average,
        line: { color: "rgb(0,176,246)" },
        mode: "spline",
        name: "Toxins",
        type: "scatter",
      };
      const traceToxinsCi = {
        x: response.data[1].x_ci,
        y: response.data[1].ci,
        fill: "tozerox",
        fillcolor: "rgba(0,176,246,0.2)",
        line: { color: "transparent" },
        name: "Toxins",
        showlegend: false,
        type: "scatter",
      };

      const traceNeurologicalActivity = {
        x: response.data[2].x_average,
        y: response.data[2].average,
        line: { color: "rgb(231,107,243)" },
        mode: "spline",
        name: "Neurological Activity",
        type: "scatter",
      };
      const traceNeurologicalActivityCi = {
        x: response.data[2].x_ci,
        y: response.data[2].ci,
        fill: "tozerox",
        fillcolor: "rgba(231,107,243,0.2)",
        line: { color: "transparent" },
        name: "Neurological Activity",
        showlegend: false,
        type: "scatter",
      };

      const traceTherapeutic = {
        x: response.data[3].x_average,
        y: response.data[3].average,
        line: { color: "rgb(68, 68, 68)" },
        mode: "spline",
        name: "Therapeutic",
        type: "scatter",
      };
      const traceTherapeuticCi = {
        x: response.data[3].x_ci,
        y: response.data[3].ci,
        fill: "tozerox",
        fillcolor: "rgba(68, 68, 68, 0.3)",
        line: { color: "transparent" },
        name: "Therapeutic",
        showlegend: false,
        type: "scatter",
      };

      const traceMoleculeBinding = {
        x: response.data[4].x_average,
        y: response.data[4].average,
        line: { color: "rgb(31, 119, 180)" },
        mode: "spline",
        name: "Molecule Binding",
        type: "scatter",
      };
      const traceMoleculeBindingCi = {
        x: response.data[4].x_ci,
        y: response.data[4].ci,
        fill: "tozerox",
        fillcolor: "rgba(31, 119, 180, 0.3)",
        line: { color: "transparent" },
        name: "Molecule Binding",
        showlegend: false,
        type: "scatter",
      };

      const traceOtherActivity = {
        x: response.data[5].x_average,
        y: response.data[5].average,
        line: { color: "rgb(106, 213, 42)" },
        mode: "spline",
        name: "Other Activity",
        type: "scatter",
      };
      const traceOtherActivityCi = {
        x: response.data[5].x_ci,
        y: response.data[5].ci,
        fill: "tozerox",
        fillcolor: "rgba(106, 213, 42, 0.3)",
        line: { color: "transparent" },
        name: "Other Activity",
        showlegend: false,
        type: "scatter",
      };

      const traceDrugDeliveryVehicle = {
        x: response.data[6].x_average,
        y: response.data[6].average,
        line: { color: "rgb(94, 39, 164)" },
        mode: "spline",
        name: "Drug Delivery Vehicle",
        type: "scatter",
      };
      const traceDrugDeliveryVehicleCi = {
        x: response.data[6].x_ci,
        y: response.data[6].ci,
        fill: "tozerox",
        fillcolor: "rgba(94, 39, 164, 0.3)",
        line: { color: "transparent" },
        name: "Drug Delivery Vehicle",
        showlegend: false,
        type: "scatter",
      };

      const traceSensorial = {
        x: response.data[7].x_average,
        y: response.data[7].average,
        line: { color: "rgb(251, 139, 56)" },
        mode: "spline",
        name: "Sensorial",
        type: "scatter",
      };
      const traceSensorialCi = {
        x: response.data[7].x_ci,
        y: response.data[7].ci,
        fill: "tozerox",
        fillcolor: "rgba(251, 139, 56, 0.3)",
        line: { color: "transparent" },
        name: "Sensorial",
        showlegend: false,
        type: "scatter",
      };

      const tracePropeptide = {
        x: response.data[8].x_average,
        y: response.data[8].average,
        line: { color: "rgb(238, 23, 103)" },
        mode: "spline",
        name: "Propeptide",
        type: "scatter",
      };
      const tracePropeptideCi = {
        x: response.data[8].x_ci,
        y: response.data[8].ci,
        fill: "tozerox",
        fillcolor: "rgba(238, 23, 103, 0.6)",
        line: { color: "transparent" },
        name: "Propeptide",
        showlegend: false,
        type: "scatter",
      };

      const traceSignalPeptide = {
        x: response.data[9].x_average,
        y: response.data[9].average,
        line: { color: "rgb(195, 176, 25)" },
        mode: "spline",
        name: "Signal Peptide",
        type: "scatter",
      };
      const traceSignalPeptideCi = {
        x: response.data[9].x_ci,
        y: response.data[9].ci,
        fill: "tozerox",
        fillcolor: "rgba(195, 176, 25, 0.4)",
        line: { color: "transparent" },
        name: "Signal Peptide",
        showlegend: false,
        type: "scatter",
      };

      setDataErrorBars([
        traceImmunologicalActivity,
        traceImmunologicalActivityCi,
        traceToxins,
        traceToxinsCi,
        traceNeurologicalActivity,
        traceNeurologicalActivityCi,
        traceTherapeutic,
        traceTherapeuticCi,
        traceMoleculeBinding,
        traceMoleculeBindingCi,
        traceOtherActivity,
        traceOtherActivityCi,
        traceDrugDeliveryVehicle,
        traceDrugDeliveryVehicleCi,
        traceSensorial,
        traceSensorialCi,
        tracePropeptide,
        tracePropeptideCi,
        traceSignalPeptide,
        traceSignalPeptideCi,
      ]);
    } catch (error) {
      setDataErrorBars([]);
    }
  };

  useEffect(() => {
    getDataTree();
  }, []);

  useEffect(() => {
    getSpectralByEncoding();
  }, [encodingValue]);

  return (
    <Layout>
      <>
        <SectionTitle
          title="Activities"
          description="Description and detail of the activities reported in the Peptipedia database. Presentation of trends in physicochemical properties and spectra."
        />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} marginTop={3}>
            {showSkeletonTree ? (
              <Skeleton variant="rectangular" width="100%" height={450} />
            ) : (
              Object.keys(dataTree).length !== 0 && (
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: 4,
                  }}
                >
                  <div
                    id="treeWrapper"
                    style={{ width: "100%", height: "32rem" }}
                  >
                    <Tree
                      data={dataTree}
                      orientation="vertical"
                      initialDepth={1}
                      enableLegacyTransitions={true}
                      translate={{ x: 650, y: 50 }}
                      nodeSize={{ x: 300, y: 300 }}
                      collapsible={true}
                      rootNodeClassName="node__root"
                      branchNodeClassName="node__branch"
                      pathFunc="step"
                      transitionDuration={500}
                    />
                  </div>
                </Paper>
              )
            )}
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} marginTop={2}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                boxShadow: 4,
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={10} md={5} lg={3} xl={2}>
                  <FormControl fullWidth>
                    <InputLabel id="physicochemical-properties-select-label">
                      Physicochemical Properties
                    </InputLabel>
                    <Select
                      labelId="physicochemical-properties-select-label"
                      label="Physicochemical Properties"
                      value={encodingValue}
                      onChange={(e) => setEncodingValue(e.target.value)}
                    >
                      <MenuItem value={1}>Alpha Structure Group</MenuItem>
                      <MenuItem value={2}>Betha Structure Group</MenuItem>
                      <MenuItem value={3}>Energetic Group</MenuItem>
                      <MenuItem value={4}>Hydropathy Group</MenuItem>
                      <MenuItem value={5}>Hydrophobicity Group</MenuItem>
                      <MenuItem value={6}>Index Group</MenuItem>
                      <MenuItem value={7}>Secondary Structure Group</MenuItem>
                      <MenuItem value={8}>Volume Group</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Plot
                    data={dataErrorBars}
                    layout={{
                      autosize: true,
                      height: 850,
                      title:
                        "Numerical representation of peptide sequences in the frequency space using FFT",
                      font: {
                        size: 15,
                      },
                    }}
                    config={{ responsive: true }}
                    useResizeHandler={true}
                    style={{ width: "100%", height: "100%" }}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={6} xl={5} marginTop={2}>
            {loadingTableActivities ? (
              <Skeleton variant="rectangular" width="100%" height={700} />
            ) : (
              tableActivitiies.data.length > 0 && (
                <Box boxShadow={4}>
                  <DataTable table={tableActivitiies} title="All Activities" />
                </Box>
              )
            )}
          </Grid>
        </Grid>
      </>
    </Layout>
  );
}

export default Actividades;
