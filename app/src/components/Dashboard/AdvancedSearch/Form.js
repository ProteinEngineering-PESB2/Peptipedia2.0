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

  const [logicOperatorValueForLength, setLogicOperatorValueForLength] =
    useState("AND");
  const [
    logicOperatorValueForMolecularWeight,
    setLogicOperatorValueForMolecularWeight,
  ] = useState("AND");
  const [
    logicOperatorValueForIsoelectricPoint,
    setLogicOperatorValueForIsoelectricPoint,
  ] = useState("AND");
  const [logicOperatorValueForCharge, setLogicOperatorValueForCharge] =
    useState("AND");
  const [
    logicOperatorValueForChargeDensity,
    setLogicOperatorValueForChargeDensity,
  ] = useState("AND");
  const [logicOperatorValueForActivity, setLogicOperatorValueForActivity] =
    useState("AND");
  const [logicOperatorValueForTaxonomy, setLogicOperatorValueForTaxonomy] =
    useState("AND");
  const [logicOperatorValueForDatabase, setLogicOperatorValueForDatabase] =
    useState("AND");
  const [
    logicOperatorValueForGeneOntology,
    setLogicOperatorValueForGeneOntology,
  ] = useState("AND");
  const [logicOperatorValueForPfam, setLogicOperatorValueForPfam] =
    useState("AND");

  const handleChangeOptionsValue = (e, newValue) => {
    setOptionsValue([...newValue]);

    const selected = [];
    newValue.forEach((n) => {
      selected.push(n.label);
    });

    setSelectedOptions(selected);
  };

  const onReset = () => {
    setSelectedOptions([]);
    setOptionsValue([]);
  };

  const onSearch = () => {
    console.log(logicOperatorValueForLength);
    console.log(logicOperatorValueForMolecularWeight);
    console.log(logicOperatorValueForIsoelectricPoint);
    console.log(logicOperatorValueForCharge);
    console.log(logicOperatorValueForChargeDensity);
    console.log(logicOperatorValueForActivity);
    console.log(logicOperatorValueForTaxonomy);
    console.log(logicOperatorValueForDatabase);
    console.log(logicOperatorValueForGeneOntology);
    console.log(logicOperatorValueForPfam);
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
          logicOperatorValueForLength={logicOperatorValueForLength}
          setLogicOperatorValueForLength={setLogicOperatorValueForLength}
        />
      )}
      {selectedOptions.includes("Molecular Weight") && (
        <MolecularWeightField
          valueMolecularWeight={valueMolecularWeight}
          setValueMolecularWeight={setValueMolecularWeight}
          logicOperatorValueForMolecularWeight={
            logicOperatorValueForMolecularWeight
          }
          setLogicOperatorValueForMolecularWeight={
            setLogicOperatorValueForMolecularWeight
          }
        />
      )}
      {selectedOptions.includes("Isoelectric Point") && (
        <IsoelectricPointField
          valueIsoelectricPoint={valueIsoelectricPoint}
          setValueIsoelectricPoint={setValueIsoelectricPoint}
          logicOperatorValueForIsoelectricPoint={
            logicOperatorValueForIsoelectricPoint
          }
          setLogicOperatorValueForIsoelectricPoint={
            setLogicOperatorValueForIsoelectricPoint
          }
        />
      )}
      {selectedOptions.includes("Charge") && (
        <ChargeField
          valueCharge={valueCharge}
          setValueCharge={setValueCharge}
          logicOperatorValueForCharge={logicOperatorValueForCharge}
          setLogicOperatorValueForCharge={setLogicOperatorValueForCharge}
        />
      )}
      {selectedOptions.includes("Charge Density") && (
        <ChargeDensityField
          valueChargeDensity={valueChargeDensity}
          setValueChargeDensity={setValueChargeDensity}
          logicOperatorValueForChargeDensity={
            logicOperatorValueForChargeDensity
          }
          setLogicOperatorValueForChargeDensity={
            setLogicOperatorValueForChargeDensity
          }
        />
      )}
      {selectedOptions.includes("Activity") && (
        <ActivityField
          valueActivities={valueActivities}
          setValueActivities={setValueActivities}
          logicOperatorValueForActivity={logicOperatorValueForActivity}
          setLogicOperatorValueForActivity={setLogicOperatorValueForActivity}
        />
      )}
      {selectedOptions.includes("Taxonomy") && (
        <TaxonomyField
          valueTaxonomies={valueTaxonomies}
          setValueTaxonomies={setValueTaxonomies}
          logicOperatorValueForTaxonomy={logicOperatorValueForTaxonomy}
          setLogicOperatorValueForTaxonomy={setLogicOperatorValueForTaxonomy}
        />
      )}
      {selectedOptions.includes("Database") && (
        <DatabaseField
          valueDatabases={valueDatabases}
          setValueDatabases={setValueDatabases}
          logicOperatorValueForDatabase={logicOperatorValueForDatabase}
          setLogicOperatorValueForDatabase={setLogicOperatorValueForDatabase}
        />
      )}
      {selectedOptions.includes("Gene Ontology") && (
        <GeneOntologyField
          valueGeneOntology={valueGeneOntology}
          setValueGeneOntology={setValueGeneOnotology}
          logicOperatorValueForGeneOntology={logicOperatorValueForGeneOntology}
          setLogicOperatorValueForGeneOntology={
            setLogicOperatorValueForGeneOntology
          }
        />
      )}
      {selectedOptions.includes("Pfam") && (
        <PfamField
          valuePfam={valuePfam}
          setValuePfam={setValuePfam}
          logicOperatorValueForPfam={logicOperatorValueForPfam}
          setLogicOperatorValueForPfam={setLogicOperatorValueForPfam}
        />
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
