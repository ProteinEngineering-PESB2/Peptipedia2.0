import { useState, useEffect } from "react";

import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import LoadingButton from "@mui/lab/LoadingButton";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import SaveIcon from "@mui/icons-material/Save";

const activites = [
  { name: "Activity one" },
  { name: "Activity two" },
  { name: "Activity three" },
  { name: "Activity fout" },
  { name: "Activity five" },
  { name: "Activity six" },
];

const Form = () => {
  const [valueLength, setValueLength] = useState([20, 102]);
  const [valueMolecularWeight, setValueMolecularWeight] = useState([2.3, 5.3]);
  const [valueIsoelectricPoint, setValueIsoelectricPoint] = useState([
    2.3, 5.3,
  ]);
  const [valueChargeDensity, setValueChargeDensity] = useState([2.3, 5.3]);
  const [valueCharge, setValueCharge] = useState([2.3, 5.3]);
  const [valueActivities, setValueActivities] = useState([]);
  const [valueTaxonomies, setValueTaxonomies] = useState([]);
  const [valueDatabases, setValueDatabases] = useState([])
  const [loading, setLoading] = useState(false);

  const handleChangeValueLength = (e, newValue) => {
    setValueLength(newValue);
  };

  const handleChangeValueMolecularWeight = (e, newValue) => {
    setValueMolecularWeight(newValue);
  };

  const handleChangeValueIsoelectricPoint = (e, newValue) => {
    setValueIsoelectricPoint(newValue);
  };

  const handleChangeValueChargeDensity = (e, newValue) => {
    setValueChargeDensity(newValue);
  };

  const handleChangeValueCharge = (e, newValue) => {
    setValueCharge(newValue);
  };

  const handleChangeValueActivities = (e, newValue) => {
    setValueActivities([...newValue]);
  };

  const handleChangeValueTaxonomies = (e, newValue) => {
    setValueTaxonomies([...newValue]);
  };

  const handleChangeValueDatabases = (e, newValue) => {
      setValueDatabases([...newValue])
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    console.log(valueActivities);
    console.log(valueTaxonomies);

    setLoading(false);
  };

  return (
    <form onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid item lg={7} md={6} xs={12}>
          <FormControl variant="standard" sx={{ width: "100%" }}>
            <FormLabel id="label-length">Length</FormLabel>
            <Slider
              aria-labelledby="label-length"
              value={valueLength}
              onChange={handleChangeValueLength}
              valueLabelDisplay="auto"
              min={-10}
              max={500}
            />
          </FormControl>
        </Grid>
        <Grid item lg={7} md={6} xs={12}>
          <FormControl variant="standard" sx={{ width: "100%" }}>
            <FormLabel id="label-molecular-weight">Molecular Weight</FormLabel>
            <Slider
              aria-labelledby="label-molecular-weight"
              value={valueMolecularWeight}
              onChange={handleChangeValueMolecularWeight}
              valueLabelDisplay="auto"
              step={0.05}
              min={0.1}
              max={13.4}
            />
          </FormControl>
        </Grid>
        <Grid item lg={7} md={6} xs={12}>
          <FormControl variant="standard" sx={{ width: "100%" }}>
            <FormLabel id="label-isoelectric-point">
              Isoelectric Point
            </FormLabel>
            <Slider
              aria-labelledby="label-isoelectric-point"
              value={valueIsoelectricPoint}
              onChange={handleChangeValueIsoelectricPoint}
              valueLabelDisplay="auto"
              step={0.05}
              min={0.1}
              max={13.4}
            />
          </FormControl>
        </Grid>
        <Grid item lg={7} md={6} xs={12}>
          <FormControl variant="standard" sx={{ width: "100%" }}>
            <FormLabel id="label-charge">Charge</FormLabel>
            <Slider
              aria-labelledby="label-charge"
              value={valueCharge}
              onChange={handleChangeValueCharge}
              valueLabelDisplay="auto"
              step={0.05}
              min={0.1}
              max={13.4}
            />
          </FormControl>
        </Grid>
        <Grid item lg={7} md={6} xs={12}>
          <FormControl variant="standard" sx={{ width: "100%" }}>
            <FormLabel id="label-charge-density">Charge Density</FormLabel>
            <Slider
              aria-labelledby="label-charge-density"
              value={valueChargeDensity}
              onChange={handleChangeValueChargeDensity}
              valueLabelDisplay="auto"
              step={0.05}
              min={0.1}
              max={13.4}
            />
          </FormControl>
        </Grid>
        <Grid item lg={7} md={6} xs={12}>
          <FormControl variant="standard" sx={{ width: "100%" }}>
            <Autocomplete
              multiple
              options={activites}
              disableCloseOnSelect
              getOptionLabel={(option) => option.name}
              value={valueActivities}
              onChange={handleChangeValueActivities}
              renderInput={(params) => (
                <TextField {...params} label="Activity" />
              )}
            />
          </FormControl>
        </Grid>
        <Grid item lg={7} md={6} xs={12}>
          <FormControl variant="standard" sx={{ width: "100%" }}>
            <Autocomplete
              multiple
              options={activites}
              disableCloseOnSelect
              getOptionLabel={(option) => option.name}
              value={valueTaxonomies}
              onChange={handleChangeValueTaxonomies}
              renderInput={(params) => (
                <TextField {...params} label="Taxonomy" />
              )}
            />
          </FormControl>
        </Grid>
        <Grid item lg={7} md={6} xs={12}>
          <FormControl variant="standard" sx={{ width: "100%" }}>
            <Autocomplete
              multiple
              options={activites}
              disableCloseOnSelect
              getOptionLabel={(option) => option.name}
              value={valueDatabases}
              onChange={handleChangeValueDatabases}
              renderInput={(params) => (
                <TextField {...params} label="Database" />
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sx={{ marginTop: 2 }}>
          <Stack direction="row" spacing={2}>
            {loading ? (
              <Stack direction="row" spacing={2}>
                <LoadingButton
                  loading
                  variant="contained"
                  color="primary"
                  startIcon={<SaveIcon />}
                  loadingPosition="start"
                >
                  Loading...
                </LoadingButton>
              </Stack>
            ) : (
              <Button type="submit" variant="contained">
                search
              </Button>
            )}
            <Button type="button" variant="contained" color="error">
              Reset
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
};

export default Form;
