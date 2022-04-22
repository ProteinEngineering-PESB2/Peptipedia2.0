import { useState } from "react";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";

import { styled } from "@mui/material/styles";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { supervisedLearning } from "../../../services/supervsied_learning";

const Input = styled("input")({
  display: "none",
});

const Form = ({
  setData,
  setSelectedTaskType,
  setOpenSnackbar,
  setMessage,
  setSeverity,
}) => {
  const [fileInput, setFileInput] = useState(null);
  const [encodingTypeValue, setEncodingTypeValue] =
    useState("one_hot_encoding");
  const [propertyValue, setPropertyValue] = useState("alpha-structure_group");
  const [validation, setValidation] = useState(2);
  const [taskType, setTaskType] = useState("classification");
  const [algorithm, setAlgorithm] = useState("adaboost");
  const [loading, setLoading] = useState(false);

  const handleChangeFileInput = (e) => {
    setFileInput(e.target.files[0]);
  };

  const handleChangeEncodingTypeValue = (e) => {
    setEncodingTypeValue(e.target.value);
  };

  const handleChangePropertyValue = (e) => {
    setPropertyValue(e.target.value);
  };

  const handleChangeValidation = (e) => {
    setValidation(e.target.value);
  };

  const handleChangeTaskType = (e) => {
    setTaskType(e.target.value);
    setAlgorithm("adaboost");
  };

  const handleChangeAlgorithm = (e) => {
    setAlgorithm(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSelectedTaskType("");
    setData();

    let options;
    let example;

    if (encodingTypeValue === "one_hot_encoding") {
      options = new Blob([
        JSON.stringify({
          encoding: encodingTypeValue,
          task: taskType,
          algorithm: algorithm,
          validation: parseInt(validation),
        }),
      ]);
      example = {
        encoding: encodingTypeValue,
        task: taskType,
        algorithm: algorithm,
        validation: parseInt(validation),
      };
    } else {
      options = new Blob([
        JSON.stringify({
          encoding: encodingTypeValue,
          selected_property: propertyValue,
          task: taskType,
          algorithm: algorithm,
          validation: parseInt(validation),
        }),
      ]);
      example = {
        encoding: encodingTypeValue,
        selected_property: propertyValue,
        task: taskType,
        algorithm: algorithm,
        validation: parseInt(validation),
      };
    }

    const post = new FormData();
    post.append("file", fileInput);
    post.append("options", options);

    try {
      console.log(example);
      const res = await supervisedLearning(post);

      if (res.status === "error") {
        setSeverity("error");
        setMessage(res.description);
        setOpenSnackbar(true);
        setLoading(false);
      } else {
        setSelectedTaskType(taskType);
        setData(res);
        setLoading(false);
      }
    } catch (error) {
      setSeverity("error");
      setMessage("Service no available");
      setOpenSnackbar(true);
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid item lg={6} md={6} xs={12} sx={{ marginBottom: 2 }}>
            <label htmlFor="contained-button-file" style={{ width: "100%" }}>
              <Input
                id="contained-button-file"
                type="file"
                onChange={handleChangeFileInput}
              />
              <Button
                variant="outlined"
                component="span"
                endIcon={<CloudUploadIcon />}
                color={
                  fileInput
                    ? fileInput.name
                      ? "success"
                      : "primary"
                    : "primary"
                }
                sx={{ width: "100%" }}
              >
                {fileInput
                  ? fileInput.name
                    ? fileInput.name
                    : "Upload CSV"
                  : "Upload CSV"}
              </Button>
            </label>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ marginTop: 1 }}>
          <Grid item lg={6} md={6} xs={12}>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="encoding-type-label">Encoding Type</InputLabel>
              <Select
                aria-labelledby="encoding-type-label"
                label="Encoding Type"
                value={encodingTypeValue}
                onChange={handleChangeEncodingTypeValue}
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
                  <MenuItem value="betha-structure_group">
                    Betha Structure
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
            <TextField
              placeholder="Number of folds for cross validation"
              label="Number of folds for cross validation"
              value={validation}
              onChange={handleChangeValidation}
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid item lg={6} md={6} xs={12}>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="task-type-label">Task Type</InputLabel>
              <Select
                aria-labelledby="task-type-label"
                label="Task Type"
                value={taskType}
                onChange={handleChangeTaskType}
              >
                <MenuItem value="classification">Classification</MenuItem>
                <MenuItem value="regression">Regression</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item lg={6} md={6} xs={12}>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="algorithm-type-label">Algorithm Type</InputLabel>
              <Select
                aria-labelledby="algomrith-type-label"
                label="Algorithm Type"
                value={algorithm}
                onChange={handleChangeAlgorithm}
              >
                <MenuItem value="adaboost">Adaboost</MenuItem>
                <MenuItem value="bagging">Bagging</MenuItem>
                {taskType === "classification" && (
                  <MenuItem value="bernoulli">Bernoulli</MenuItem>
                )}
                <MenuItem value="descision_tree">Decision Tree</MenuItem>
                {taskType === "classification" && (
                  <MenuItem value="gaussian_bayes">Gaussian Bayes</MenuItem>
                )}
                <MenuItem value="gradient_boosting">Gradient Boosting</MenuItem>
                {taskType === "classification" && (
                  <MenuItem value="nu_svc">Nu-SVC</MenuItem>
                )}
                {taskType === "regression" && (
                  <MenuItem value="nu_svr">Nu-SVR</MenuItem>
                )}
                <MenuItem value="random_forest">Random Forest</MenuItem>
                {taskType === "regression" && (
                  <MenuItem value="svr">SVR</MenuItem>
                )}
                {taskType === "classification" && (
                  <MenuItem value="svc">SVC</MenuItem>
                )}
                <MenuItem value="knn">KNN</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item lg={12} xs={12} sx={{ marginTop: 3 }}>
            <Grid container spacing={2}>
              <Grid item lg={6} md={6} xs={12}>
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
                    sx={{
                      width: "100%",
                      backgroundColor: "#2962ff",
                      ":hover": { backgroundColor: "#2962ff" },
                    }}
                    size="medium"
                    disabled={
                      (fileInput === null || fileInput === undefined) && true
                    }
                  >
                    Run Training
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default Form;
