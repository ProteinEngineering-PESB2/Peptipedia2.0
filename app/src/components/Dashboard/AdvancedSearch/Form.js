import { useState } from "react";

import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

import { fields } from "./Fields/fields";

// Fields
import LengthField from "./Fields/LengthField";
import MolecularWeightField from "./Fields/MolecularWeightField";
import IsoelectricPointField from "./Fields/IsoelectricPointField";
import ChargeField from "./Fields/ChargeField";
import ChargeDensityField from "./Fields/ChargeDensityField";
import ActivityField from "./Fields/ActivityField";
import TaxonomyField from "./Fields/TaxonomyField";
import DatabaseField from "./Fields/DatabaseField";
import GeneOntologyField from "./Fields/GeneOntologyField";
import PfamField from "./Fields/PfamField";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const Form = () => {
  const [optionsValue, setOptionsValue] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [valueLength, setValueLength] = useState([20, 100]);
  const [valueMolecularWeight, setValueMolecularWeight] = useState([20, 100]);
  const [valueIsoelectricPoint, setValueIsoelectricPoint] = useState([20, 100]);
  const [valueCharge, setValueCharge] = useState([20, 100]);
  const [valueChargeDensity, setValueChargeDensity] = useState([20, 100]);
  const [valueActivities, setValueActivities] = useState([]);
  const [valueTaxonomies, setValueTaxonomies] = useState([]);
  const [valueDatabases, setValueDatabases] = useState([]);
  const [valueGeneOntology, setValueGeneOnotology] = useState([]);
  const [valuePfam, setValuePfam] = useState([]);

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

  const onSearch = () => {
    console.log(valueLength);
    console.log(valueMolecularWeight);
    console.log(valueIsoelectricPoint);
    console.log(valueCharge);
    console.log(valueChargeDensity);
    console.log(valueActivities);
    console.log(valueTaxonomies);
    console.log(valueDatabases);
    console.log(valueGeneOntology);
    console.log(valuePfam);
  };

  return (
    <Grid container spacing={3}>
      <Grid item lg={12} md={12} xs={12}>
        <Grid item lg={12} md={12} xs={12}>
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
      {selectedOptions.includes("Length") && (
        <LengthField
          valueLength={valueLength}
          setValueLength={setValueLength}
        />
      )}
      {selectedOptions.includes("Molecular Weight") && (
        <MolecularWeightField
          valueMolecularWeight={valueMolecularWeight}
          setValueMolecularWeight={setValueMolecularWeight}
        />
      )}
      {selectedOptions.includes("Isoelectric Point") && (
        <IsoelectricPointField
          valueIsoelectricPoint={valueIsoelectricPoint}
          setValueIsoelectricPoint={setValueIsoelectricPoint}
        />
      )}
      {selectedOptions.includes("Charge") && (
        <ChargeField
          valueCharge={valueCharge}
          setValueCharge={setValueCharge}
        />
      )}
      {selectedOptions.includes("Charge Density") && (
        <ChargeDensityField
          valueChargeDensity={valueChargeDensity}
          setValueChargeDensity={setValueChargeDensity}
        />
      )}
      {selectedOptions.includes("Activity") && (
        <ActivityField
          valueActivities={valueActivities}
          setValueActivities={setValueActivities}
        />
      )}
      {selectedOptions.includes("Taxonomy") && (
        <TaxonomyField
          valueTaxonomies={valueTaxonomies}
          setValueTaxonomies={setValueTaxonomies}
        />
      )}
      {selectedOptions.includes("Database") && (
        <DatabaseField
          valueDatabases={valueDatabases}
          setValueDatabases={setValueDatabases}
        />
      )}
      {selectedOptions.includes("Gene Ontology") && (
        <GeneOntologyField
          valueGeneOntology={valueGeneOntology}
          setValueGeneOntology={setValueGeneOnotology}
        />
      )}
      {selectedOptions.includes("Pfam") && (
        <PfamField valuePfam={valuePfam} setValuePfam={setValuePfam} />
      )}
      <Grid item lg={12} xs={12}>
        <Grid container spacing={2}>
          <Grid item lg={6} md={6} xs={6}>
            <Button
              variant="contained"
              size="medium"
              sx={{ width: "100%" }}
              onClick={onSearch}
            >
              Seach
            </Button>
          </Grid>
          <Grid item lg={6} md={6} xs={6}>
            <Button
              variant="contained"
              size="medium"
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
