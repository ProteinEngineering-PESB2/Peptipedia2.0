import { useState } from "react";

import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

import LoadingButton from "@mui/lab/LoadingButton";

const Form = () => {
  const [encodingTypeValue, setEncodingTypeValue] =
    useState("one_hot_encoding");
  const [propertyValue, setPropertyValue] = useState("alpha-structure_group");
  const [algorithmValue, setAlgorithmValue] = useState("Kmeans");
  const [kvalue, setKvalue] = useState(0);
  const [linkage, setLinkage] = useState(0);
  const [affinity, setAffinity] = useState(0);
  const [minSamples, setMinSamples] = useState(0);
  const [xi, setXi] = useState(0);
  const [minClusterSize, setMinClusterSize] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleChangeEncodingType = (e) => {
    setEncodingTypeValue(e.target.value);
  };

  const handleChangePropertyValue = (e) => {
    setPropertyValue(e.target.value);
  };

  const handleChangeAlgorithmValue = (e) => {
    setAlgorithmValue(e.target.value);
  };

  const handleChangeKvalue = (e) => {
    setKvalue(e.target.value);
  };

  const handleChangeLinkage = (e) => {
    setLinkage(e.target.value);
  };

  const handleChangeAffinity = (e) => {
    setAffinity(e.target.value);
  };

  const handleChangeMinSamples = (e) => {
    setMinSamples(e.target.value);
  };

  const handleChangeXi = (e) => {
    setXi(e.target.value);
  };

  const handleChangeMinClusterSize = (e) => {
    setMinClusterSize(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault()

    setLoading(true)

    setLoading(false)
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid item lg={6} md={6} xs={12}>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="encoding-type-label">Encoding Type</InputLabel>
              <Select
                aria-labelledby="encoding-type-label"
                label="Encoding Type"
                value={encodingTypeValue}
                onChange={handleChangeEncodingType}
              >
                <MenuItem value="one_hot_encoding">One Hot Encoding</MenuItem>
                <MenuItem value="phisicochemical_properties">
                  Phisicochemical Properties
                </MenuItem>
                <MenuItem value="digital_signal_processing">
                  Digital Signal Processing
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item lg={6} md={6} xs={12}>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="property-label">Property</InputLabel>
              <Select
                aria-labelledby="property-label"
                label="Property"
                value={propertyValue}
                onChange={handleChangePropertyValue}
              >
                <MenuItem value="alpha-structure_group">
                  Alpha Structure
                </MenuItem>
                <MenuItem value="beta-structure_group">Beta Structure</MenuItem>
                <MenuItem value="energetic_group">Energetic</MenuItem>
                <MenuItem value="hydropathy_group">Hydropathy</MenuItem>
                <MenuItem value="hydrophobicity_group">Hydrophobicity</MenuItem>
                <MenuItem value="index_group">Index</MenuItem>
                <MenuItem value="secondary_structure_properties_group">
                  Secondary Structure
                </MenuItem>
                <MenuItem value="volume_group">Volume</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item lg={6} md={6} xs={12}>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="algorithm-select-label">Algorithm</InputLabel>
              <Select
                aria-labelledby="algorithm-label"
                labelId="algorithm-select-label"
                label="Algorithm"
                value={algorithmValue}
                onChange={handleChangeAlgorithmValue}
              >
                <MenuItem value="Kmeans">K-Means</MenuItem>
                <MenuItem value="DBScan">DBScan</MenuItem>
                <MenuItem value="Meanshift">Meanshift</MenuItem>
                <MenuItem value="Birch">Birch</MenuItem>
                <MenuItem value="Agglomerative">Agglomerative</MenuItem>
                <MenuItem value="Affinity">Affinity</MenuItem>
                <MenuItem value="Optics">Optics</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {algorithmValue === "Kmeans" ||
          algorithmValue === "Birch" ||
          algorithmValue === "Agglomerative" ? (
            <Grid item lg={6} md={6} xs={12}>
              <TextField
                placeholder="K-Value"
                label="K-Value"
                type="number"
                value={kvalue}
                onChange={handleChangeKvalue}
                color="warning"
                focused
              />
            </Grid>
          ) : (
            <></>
          )}
          {algorithmValue === "Agglomerative" && (
            <>
              <Grid item lg={6} md={6} xs={12}>
                <TextField
                  placeholder="Linkage"
                  label="Linkage"
                  type="number"
                  value={linkage}
                  onChange={handleChangeLinkage}
                  color="warning"
                  focused
                />
              </Grid>
              <Grid item lg={6} md={6} xs={12}>
                <TextField
                  placeholder="Affinity"
                  label="Affinity"
                  type="number"
                  value={affinity}
                  onChange={handleChangeAffinity}
                  color="warning"
                  focused
                />
              </Grid>
            </>
          )}
          {algorithmValue === "Optics" ? (
            <>
              <Grid item lg={6} md={6} xs={12}>
                <TextField
                  placeholder="Min Samples"
                  label="Min Samples"
                  type="number"
                  value={minSamples}
                  onChange={handleChangeMinSamples}
                  color="warning"
                  focused
                />
              </Grid>
              <Grid item lg={6} md={6} xs={12}>
                <TextField
                  placeholder="Xi"
                  label="Xi"
                  type="number"
                  value={xi}
                  onChange={handleChangeXi}
                  color="warning"
                  focused
                />
              </Grid>
              <Grid item lg={6} md={6} xs={12}>
                <TextField
                  placeholder="Min Cluster Size"
                  label="Min Cluster Size"
                  type="number"
                  value={minClusterSize}
                  onChange={handleChangeMinClusterSize}
                  color="warning"
                  focused
                />
              </Grid>
            </>
          ) : (
            <></>
          )}
          <Grid item lg={12} md={12} xs={12} sx={{ marginTop: 2 }}>
            {loading ? (
              <LoadingButton
                loading
                variant="contained"
                color="primary"
                sx={{ width: "100%" }}
                size="medium"
              >
                Loading{" "}
              </LoadingButton>
            ) : (
              <Button
                type="submit"
                variant="contained"
                sx={{ width: "100%", backgroundColor: "#2962ff" }}
                size="medium"
              >
                Run Clustering
              </Button>
            )}
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default Form;
