import { useState } from "react";

import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

import LoadingButton from "@mui/lab/LoadingButton";

import { styled } from "@mui/material/styles";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { clustering } from "../../../services/clustering";

const Input = styled("input")({
  display: "none",
});

const Form = () => {
  const [fileType, setFileType] = useState("text");
  const [textInput, setTextInput] = useState("");
  const [fileInput, setFileInput] = useState(null);
  const [encodingTypeValue, setEncodingTypeValue] =
    useState("one_hot_encoding");
  const [propertyValue, setPropertyValue] = useState("alpha-structure_group");
  const [algorithmValue, setAlgorithmValue] = useState("kmeans");
  const [kvalue, setKvalue] = useState(2);
  const [linkage, setLinkage] = useState("ward");
  const [affinity, setAffinity] = useState("euclidean");
  const [minSamples, setMinSamples] = useState(0);
  const [xi, setXi] = useState(0);
  const [minClusterSize, setMinClusterSize] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleChangeFileType = (e) => {
    setFileType(e.target.value);
    setTextInput("");
    setFileInput(null);
  };

  const handleChangeTextInput = (e) => {
    setTextInput(e.target.value);
  };

  const handleChangeFileInput = (e) => {
    setFileInput(e.target.files[0]);
  };

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

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    let post = {};

    if (fileType === "text") {
      if (
        encodingTypeValue === "phisicochemical_properties" ||
        encodingTypeValue === "digital_signal_processing"
      ) {
        if (algorithmValue === "kmeans" || algorithmValue === "birch") {
          post = {
            data: textInput,
            options: {
              encoding: encodingTypeValue,
              selected_property: propertyValue,
              algorithm: algorithmValue,
              params: {
                k_value: parseInt(kvalue),
              },
            },
          };
        } else if (algorithmValue === "agglomerative") {
          post = {
            data: textInput,
            options: {
              encoding: encodingTypeValue,
              selected_property: propertyValue,
              algorithm: algorithmValue,
              params: {
                linkage: linkage,
                affinaty: affinity,
                k_value: parseInt(kvalue),
              },
            },
          };
        } else if (algorithmValue === "optics") {
          post = {
            data: textInput,
            options: {
              encoding: encodingTypeValue,
              selected_property: propertyValue,
              algorithm: algorithmValue,
              params: {
                min_samples: parseInt(minSamples),
                xi: parseInt(xi),
                min_cluster_size: parseInt(minClusterSize),
              },
            },
          };
        } else {
          post = {
            data: textInput,
            options: {
              encoding: encodingTypeValue,
              selected_property: propertyValue,
              algorithm: algorithmValue,
            },
          };
        }
      } else if (encodingTypeValue === "one_hot_encoding") {
        if (algorithmValue === "kmeans" || algorithmValue === "birch") {
          post = {
            data: textInput,
            options: {
              encoding: encodingTypeValue,
              algorithm: algorithmValue,
              params: {
                k_value: parseInt(kvalue),
              },
            },
          };
        } else if (algorithmValue === "agglomerative") {
          post = {
            data: textInput,
            options: {
              encoding: encodingTypeValue,
              algorithm: algorithmValue,
              params: {
                linkage: linkage,
                affinaty: affinity,
                k_value: parseInt(kvalue),
              },
            },
          };
        } else if (algorithmValue === "optics") {
          post = {
            data: textInput,
            options: {
              encoding: encodingTypeValue,
              algorithm: algorithmValue,
              params: {
                min_samples: parseInt(minSamples),
                xi: parseInt(xi),
                min_cluster_size: parseInt(minClusterSize),
              },
            },
          };
        } else {
          post = {
            data: textInput,
            options: {
              encoding: encodingTypeValue,
              algorithm: algorithmValue,
            },
          };
        }
      }
    } else if (fileType === "file") {
    }

    const res = await clustering(post);
    console.log(res);

    setLoading(false);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid item lg={12} md={12} xs={12}>
            <FormControl>
              <FormLabel id="label-file-type">File Type</FormLabel>
              <RadioGroup row aria-labelledby="label-file-type">
                <FormControlLabel
                  label="Text"
                  control={<Radio />}
                  value="text"
                  checked={fileType === "text"}
                  onChange={handleChangeFileType}
                />
                <FormControlLabel
                  label="File"
                  control={<Radio />}
                  value="file"
                  checked={fileType === "file"}
                  onChange={handleChangeFileType}
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          {fileType === "text" && (
            <Grid item xs={12} sx={{ marginBottom: 2 }}>
              <TextField
                label="Enter Amino Acid sequences"
                multiline
                rows={5}
                sx={{ width: "100%" }}
                onChange={handleChangeTextInput}
              />
            </Grid>
          )}
          {fileType === "file" && (
            <Grid item xs={12} sx={{ marginBottom: 2 }}>
              <label htmlFor="contained-button-file">
                <Input
                  id="contained-button-file"
                  type="file"
                  onChange={handleChangeFileInput}
                />
                <Button
                  variant="outlined"
                  component="span"
                  endIcon={<CloudUploadIcon />}
                >
                  Upload Fasta
                </Button>
              </label>
            </Grid>
          )}
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
          {encodingTypeValue === "phisicochemical_properties" ||
          encodingTypeValue === "digital_signal_processing" ? (
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
                  <MenuItem value="beta-structure_group">
                    Beta Structure
                  </MenuItem>
                  <MenuItem value="energetic_group">Energetic</MenuItem>
                  <MenuItem value="hydropathy_group">Hydropathy</MenuItem>
                  <MenuItem value="hydrophobicity_group">
                    Hydrophobicity
                  </MenuItem>
                  <MenuItem value="index_group">Index</MenuItem>
                  <MenuItem value="secondary_structure_properties_group">
                    Secondary Structure
                  </MenuItem>
                  <MenuItem value="volume_group">Volume</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          ) : (
            <></>
          )}
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
                <MenuItem value="kmeans">K-Means</MenuItem>
                <MenuItem value="dbscan">DBScan</MenuItem>
                <MenuItem value="meanshift">Meanshift</MenuItem>
                <MenuItem value="birch">Birch</MenuItem>
                <MenuItem value="agglomerative">Agglomerative</MenuItem>
                <MenuItem value="affinity">Affinity</MenuItem>
                <MenuItem value="optics">Optics</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {algorithmValue === "kmeans" ||
          algorithmValue === "birch" ||
          algorithmValue === "agglomerative" ? (
            <Grid item lg={6} md={6} xs={12}>
              <TextField
                placeholder="K-Value"
                label="K-Value"
                type="number"
                value={kvalue}
                onChange={handleChangeKvalue}
                color="warning"
                focused
                sx={{ width: "100%" }}
                inputProps={{
                  min: 2,
                }}
              />
            </Grid>
          ) : (
            <></>
          )}
          {algorithmValue === "agglomerative" && (
            <>
              <Grid item lg={6} md={6} xs={12}>
                <FormControl sx={{ width: "100%" }} color="warning" focused>
                  <InputLabel id="linkage-label">Linkage</InputLabel>
                  <Select
                    aria-labelledby="linkage-label"
                    label="Linkage"
                    value={linkage}
                    onChange={handleChangeLinkage}
                  >
                    <MenuItem value="ward">Ward</MenuItem>
                    <MenuItem value="complete">Complete</MenuItem>
                    <MenuItem value="average">Average</MenuItem>
                    <MenuItem value="single">Single</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item lg={6} md={6} xs={12}>
                <FormControl sx={{ width: "100%" }} color="warning" focused={linkage === "ward" ? false : true}>
                  <InputLabel id="affinity-label">Affinity</InputLabel>
                  <Select
                    aria-labelledby="affinity-label"
                    label="Affinity"
                    value={linkage === "ward" ? "euclidean" : affinity}
                    onChange={handleChangeAffinity}
                    disabled={linkage === "ward" ? true : false}
                  >
                    <MenuItem value="euclidean">Euclidean</MenuItem>
                    <MenuItem value="I1">I1</MenuItem>
                    <MenuItem value="I2">I2</MenuItem>
                    <MenuItem value="manhattan">Manhattan</MenuItem>
                    <MenuItem value="cosine">Cosine</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </>
          )}
          {algorithmValue === "optics" ? (
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
                  sx={{ width: "100%" }}
                  inputProps={{
                    min: 0,
                  }}
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
                  sx={{ width: "100%" }}
                  inputProps={{
                    min: 0,
                    max: 1,
                  }}
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
                  sx={{ width: "100%" }}
                  inputProps={{
                    min: 0,
                  }}
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
                disabled={textInput === "" ? true : false}
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
