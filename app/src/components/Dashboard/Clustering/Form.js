import { useState } from "react";

import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

const Form = () => {
  const [oneHotEncodingCheckbox, setOneHotEncodingCheckbox] = useState(true);
  const [
    phisicochemicalPropertiesCheckbox,
    setPhisicochemicalPropertiesCheckbox,
  ] = useState(true);
  const [fftCheckbox, setFFTCheckbox] = useState(true);
  const [alphaStructureCheckbox, setAlphaStructureCheckbox] = useState(true);
  const [betaStructureCheckbox, setBetaStructureCheckbox] = useState(true);
  const [energeticCheckbox, setEnergeticCheckbox] = useState(true);
  const [hydropathyCheckbox, setHydropathyCheckbox] = useState(true);
  const [hydrophobicityCheckbox, setHydrophobicityCheckbox] = useState(true);
  const [indexCheckbox, setIndexCheckbox] = useState(true);
  const [secondaryStructureCheckbox, setSecondaryStructureCheckbox] =
    useState(true);
  const [volumeCheckbox, setVolumeCheckbox] = useState(true);
  const [algorithmValue, setAlgorithmValue] = useState("");
  const [kvalue, setKvalue] = useState(0);
  const [linkage, setLinkage] = useState(0);
  const [affinity, setAffinity] = useState(0);
  const [minSamples, setMinSamples] = useState(0);
  const [xi, setXi] = useState(0);
  const [minClusterSize, setMinClusterSize] = useState(0);

  const handleChangeOneHotEncodingCheckbox = (e) => {
    setOneHotEncodingCheckbox(e.target.checked);
  };

  const handleChangePhisicochemicalPropertiesCheckbox = (e) => {
    setPhisicochemicalPropertiesCheckbox(e.target.checked);
  };

  const handleChangeFFTCheckbox = (e) => {
    setFFTCheckbox(e.target.checked);
  };

  const handleChangeAlphaStructureCheckbox = (e) => {
    setAlphaStructureCheckbox(e.target.checked);
  };

  const handleChangeBetaStructureCheckbox = (e) => {
    setBetaStructureCheckbox(e.target.checked);
  };

  const handleChangeEnergeticCheckbox = (e) => {
    setEnergeticCheckbox(e.target.checked);
  };

  const handleChangeHydropathyCheckbox = (e) => {
    setHydropathyCheckbox(e.target.value);
  };

  const handleChangeHydrophobicityCheckbox = (e) => {
    setHydrophobicityCheckbox(e.target.value);
  };

  const handleChangeIndexCheckbox = (e) => {
    setIndexCheckbox(e.target.checked);
  };

  const handleChangeSecondaryStructureCheckbox = (e) => {
    setSecondaryStructureCheckbox(e.target.checked);
  };

  const handleChangeVolumeCheckbox = (e) => {
    setVolumeCheckbox(e.target.checked);
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

  return (
    <>
      <form>
        <Grid container spacing={2}>
          <Grid item lg={12} md={12} xs={12}>
            <FormControl>
              <FormLabel id="encoding-label">Encoding Type</FormLabel>
              <FormGroup aria-labelledby="encoding-label">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={oneHotEncodingCheckbox}
                      onChange={handleChangeOneHotEncodingCheckbox}
                    />
                  }
                  label="One Hot Encoding"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={phisicochemicalPropertiesCheckbox}
                      onChange={handleChangePhisicochemicalPropertiesCheckbox}
                    />
                  }
                  label="Phisicochemical Properties"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={fftCheckbox}
                      onChange={handleChangeFFTCheckbox}
                    />
                  }
                  label="FFT"
                />
              </FormGroup>
            </FormControl>
          </Grid>
          {phisicochemicalPropertiesCheckbox === true && (
            <Grid item lg={12} md={12} xs={12}>
              <FormControl>
                <FormLabel id="select-property-label">
                  Select Phisicochemical Properties
                </FormLabel>
                <FormGroup aria-labelledby="select-property-label">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={alphaStructureCheckbox}
                        onChange={handleChangeAlphaStructureCheckbox}
                      />
                    }
                    label="Alpha Structure"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={betaStructureCheckbox}
                        onChange={handleChangeBetaStructureCheckbox}
                      />
                    }
                    label="Beta Structure"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={energeticCheckbox}
                        onChange={handleChangeEnergeticCheckbox}
                      />
                    }
                    label="Energetic"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={hydropathyCheckbox}
                        onChange={handleChangeHydropathyCheckbox}
                      />
                    }
                    label="Hidropathy"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={hydrophobicityCheckbox}
                        onChange={handleChangeHydrophobicityCheckbox}
                      />
                    }
                    label="Hydrophobicity"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={indexCheckbox}
                        onChange={handleChangeIndexCheckbox}
                      />
                    }
                    label="Index"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={secondaryStructureCheckbox}
                        onChange={handleChangeSecondaryStructureCheckbox}
                      />
                    }
                    label="Secondary Structure"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={volumeCheckbox}
                        onChange={handleChangeVolumeCheckbox}
                      />
                    }
                    label="Volume"
                  />
                </FormGroup>
              </FormControl>
            </Grid>
          )}
          <Grid item lg={12} md={12} xs={12}>
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
          <Grid item lg={12} md={12} xs={12}>
            {algorithmValue === "Kmeans" ||
            algorithmValue === "Birch" ||
            algorithmValue === "Agglomerative" ? (
              <TextField
                placeholder="K-Value"
                label="K-Value"
                type="number"
                value={kvalue}
                onChange={handleChangeKvalue}
              />
            ) : (
              <></>
            )}
          </Grid>
          {algorithmValue === "Agglomerative" && (
            <>
              <Grid item lg={12} md={12} xs={12}>
                <TextField
                  placeholder="Linkage"
                  label="Linkage"
                  type="number"
                  value={linkage}
                  onChange={handleChangeLinkage}
                />
              </Grid>
              <Grid item lg={12} md={12} xs={12}>
                <TextField
                  placeholder="Affinity"
                  label="Affinity"
                  type="number"
                  value={affinity}
                  onChange={handleChangeAffinity}
                />
              </Grid>
            </>
          )}
          {algorithmValue === "Optics" && (
            <>
              <Grid item lg={12} md={12} xs={12}>
                <TextField
                  placeholder="Min Samples"
                  label="Min Samples"
                  type="number"
                  value={minSamples}
                  onChange={handleChangeMinSamples}
                />
              </Grid>
              <Grid item lg={12} md={12} xs={12}>
                <TextField
                  placeholder="Xi"
                  label="Xi"
                  type="number"
                  value={xi}
                  onChange={handleChangeXi}
                />
              </Grid>
              <Grid item lg={12} md={12} xs={12}>
                <TextField
                  placeholder="Min Cluster Size"
                  label="Min Cluster Size"
                  type="number"
                  value={minClusterSize}
                  onChange={handleChangeMinClusterSize}
                />
              </Grid>
            </>
          )}
        </Grid>
      </form>
    </>
  );
};

export default Form;
