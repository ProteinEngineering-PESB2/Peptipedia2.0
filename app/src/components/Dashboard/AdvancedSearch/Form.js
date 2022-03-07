import { useState } from "react";

import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

import { initialFields } from "./Fields/initialFields";

// Fields
import LengthField from "./Fields/LengthField";
import MolecularWeightField from "./Fields/MolecularWeightField";
import IsoelectricPointField from "./Fields/IsoelectricPointField";
import ChargeField from "./Fields/ChargeField";
import ChargeDensityField from "./Fields/ChargeDensityField";
import ActivityField from "./Fields/ActivityField";
import TaxonomyField from "./Fields/TaxonomyField";
import DatabaseField from "./Fields/DatabaseField";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

let fields = initialFields;

const Form = () => {
  const [optionsValue, setOptionsValue] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChangeOptionsValue = (e, newValue) => {
    setOptionsValue([...newValue]);

    const selected = [];
    newValue.map((n) => {
      selected.push(n.label);
    });

    setSelectedOptions(selected);
  };

  const onReset = () => {
    setSelectedOptions([]);
    setOptionsValue([]);
  };

  return (
    <Grid container spacing={3}>
      <Grid item lg={12} xs={12}>
        <Grid item lg={4} xs={12}>
          <Autocomplete
            multiple
            options={fields}
            disableCloseOnSelect
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.label}
              </li>
            )}
            renderInput={(params) => <TextField {...params} label="Fields" />}
            value={optionsValue}
            onChange={handleChangeOptionsValue}
          />
        </Grid>
      </Grid>
      {selectedOptions.includes("Length") && <LengthField />}
      {selectedOptions.includes("Molecular Weight") && <MolecularWeightField />}
      {selectedOptions.includes("Isoelectric Point") && (
        <IsoelectricPointField />
      )}
      {selectedOptions.includes("Charge") && <ChargeField />}
      {selectedOptions.includes("Charge Density") && <ChargeDensityField />}
      {selectedOptions.includes("Activity") && <ActivityField />}
      {selectedOptions.includes("Taxonomy") && <TaxonomyField />}
      {selectedOptions.includes("Database") && <DatabaseField />}
      <Grid item lg={12} xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button variant="contained" size="large" sx={{ width: "100%" }}>
              Seach
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              size="large"
              color="error"
              onClick={onReset}
              sx={{ width: "100%" }}
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Form;
