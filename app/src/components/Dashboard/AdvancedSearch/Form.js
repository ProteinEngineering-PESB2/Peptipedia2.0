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
import PatentField from "./Fields/PatentField";

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
  const [valuePatent, setValuePatent] = useState([]);
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
  const [logicOperatorValueForPatent, setLogicOperatorValueForPatent] =
    useState("AND");
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

  // Fields
  const handleChangeValueLength = (e, newValue) => {
    setValueLength(newValue);
  };

  const handleChangeValueMolecularWeight = (e, newValue) => {
    setValueMolecularWeight(newValue);
  };

  const handleChangeValueIsoelectricPoint = (e, newValue) => {
    setValueIsoelectricPoint(newValue);
  };

  const handleChangeValueCharge = (e, newValue) => {
    setValueCharge(newValue);
  };

  const handleChangeValueChargeDensity = (e, newValue) => {
    setValueChargeDensity(newValue);
  };

  // Operators
  const handleChangeLogicOperatorLength = (e) => {
    setLogicOperatorValueForLength(e.target.value);
  };

  const handleChangeLogicOperatorMolecularWeight = (e) => {
    setLogicOperatorValueForMolecularWeight(e.target.value);
  };

  const handleChangeLogicOperatorIsoelectricPoint = (e) => {
    setLogicOperatorValueForIsoelectricPoint(e.target.value);
  };

  const handleChangeLogicOperatorCharge = (e) => {
    setLogicOperatorValueForCharge(e.target.value);
  };

  const handleChangeLogicOperatorChargeDensity = (e) => {
    setLogicOperatorValueForChargeDensity(e.target.value);
  };

  const handleChangeOptionsValue = (e, newValue) => {
    setOptionsValue([...newValue]);

    const selected = [];
    newValue.forEach((n) => {
      selected.push(n.label);
    });

    setSelectedOptions(selected);
  };

  const rangeInput = (field, range, index, selectedOperators) => {
    if (selectedOperators.length === 0) {
      return `(${range[0]} < ${field} < ${range[1]})`;
    } else {
      if (index === 0) {
        return `(${range[0]} < ${field} < ${range[1]})`;
      } else {
        return ` ${selectedOperators[index-1]} (${range[0]} < ${field} < ${range[1]})`;
      }
    }
  };

  const onReset = () => {
    setSelectedOptions([]);
    setOptionsValue([]);
    setValueLength([20, 100]);
    setValueMolecularWeight([20, 100]);
    setValueIsoelectricPoint([20, 100]);
    setValueCharge([20, 100]);
    setValueChargeDensity([20, 100]);
    setValuePatent([]);
    setValueActivities([]);
    setValueTaxonomies([]);
    setValueDatabases([]);
    setValueGeneOnotology([]);
    setValuePfam([]);
    setLogicOperatorValueForMolecularWeight("AND");
    setLogicOperatorValueForIsoelectricPoint("AND");
    setLogicOperatorValueForCharge("AND");
    setLogicOperatorValueForChargeDensity("AND");
    setLogicOperatorValueForPatent("AND");
    setLogicOperatorValueForActivity("AND");
    setLogicOperatorValueForTaxonomy("AND");
    setLogicOperatorValueForDatabase("AND");
    setLogicOperatorValueForGeneOntology("AND");
    setLogicOperatorValueForPfam("AND");
  };

  const onSearch = () => {
    const selectedOperators = []

    selectedOptions.forEach((value, index) => {
      if (index !== 0) {
        if (value === "Length") selectedOperators.push(logicOperatorValueForLength)
        if (value === "Molecular Weight") selectedOperators.push(logicOperatorValueForMolecularWeight)
        if (value === "Isoelectric Point") selectedOperators.push(logicOperatorValueForIsoelectricPoint)
        if (value === "Charge") selectedOperators.push(logicOperatorValueForCharge)
        if (value === "Charge Density") selectedOperators.push(logicOperatorValueForChargeDensity)
      }
    })

    let query = "";
    selectedOptions.forEach((value, index) => {
      if (value === "Length") query += rangeInput(value, valueLength, index, selectedOperators);
      if (value === "Molecular Weight")
        query += rangeInput(value, valueMolecularWeight, index, selectedOperators);
      if (value === "Isoelectric Point")
        query += rangeInput(value, valueIsoelectricPoint, index, selectedOperators);
      if (value === "Charge") query += rangeInput(value, valueCharge, index, selectedOperators);
      if (value === "Charge Density")
        query += rangeInput(value, valueChargeDensity, index, selectedOperators);

      console.log(query)
    });
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
      {selectedOptions.map((option, index) => {
        return (
          <>
            {option === "Length" && (
              <LengthField
                valueLength={valueLength}
                handleChangeValueLength={handleChangeValueLength}
                logicOperatorValueForLength={logicOperatorValueForLength}
                handleChangeLogicOperatorLength={
                  handleChangeLogicOperatorLength
                }
                index={index}
              />
            )}
            {option === "Molecular Weight" && (
              <MolecularWeightField
                valueMolecularWeight={valueMolecularWeight}
                handleChangeValueMolecularWeight={
                  handleChangeValueMolecularWeight
                }
                logicOperatorValueForMolecularWeight={
                  logicOperatorValueForMolecularWeight
                }
                handleChangeLogicOperatorMolecularWeight={
                  handleChangeLogicOperatorMolecularWeight
                }
                selectedOptions={selectedOptions}
                index={index}
              />
            )}
            {option === "Isoelectric Point" && (
              <IsoelectricPointField
                valueIsoelectricPoint={valueIsoelectricPoint}
                handleChangeValueIsoelectricPoint={
                  handleChangeValueIsoelectricPoint
                }
                logicOperatorValueForIsoelectricPoint={
                  logicOperatorValueForIsoelectricPoint
                }
                handleChangeLogicOperatorIsoelectricPoint={
                  handleChangeLogicOperatorIsoelectricPoint
                }
                selectedOptions={selectedOptions}
                index={index}
              />
            )}
            {option === "Charge" && (
              <ChargeField
                valueCharge={valueCharge}
                handleChangeValueCharge={handleChangeValueCharge}
                logicOperatorValueForCharge={logicOperatorValueForCharge}
                handleChangeLogicOperatorCharge={
                  handleChangeLogicOperatorCharge
                }
                selectedOptions={selectedOptions}
                index={index}
              />
            )}
            {option === "Charge Density" && (
              <ChargeDensityField
                valueChargeDensity={valueChargeDensity}
                handleChangeValueChargeDensity={handleChangeValueChargeDensity}
                logicOperatorValueForChargeDensity={
                  logicOperatorValueForChargeDensity
                }
                handleChangeLogicOperatorChargeDensity={
                  handleChangeLogicOperatorChargeDensity
                }
                selectedOptions={selectedOptions}
                index={index}
              />
            )}
            {option === "Patent" && (
              <PatentField
                valuePatent={valuePatent}
                setValuePatent={setValuePatent}
                logicOperatorValueForPatent={logicOperatorValueForPatent}
                setLogicOperatorValueForPatent={setLogicOperatorValueForPatent}
                selectedOptions={selectedOptions}
                index={index}
              />
            )}
            {option === "Activity" && (
              <ActivityField
                valueActivities={valueActivities}
                setValueActivities={setValueActivities}
                logicOperatorValueForActivity={logicOperatorValueForActivity}
                setLogicOperatorValueForActivity={
                  setLogicOperatorValueForActivity
                }
                selectedOptions={selectedOptions}
                index={index}
              />
            )}
            {option === "Taxonomy" && (
              <TaxonomyField
                valueTaxonomies={valueTaxonomies}
                setValueTaxonomies={setValueTaxonomies}
                logicOperatorValueForTaxonomy={logicOperatorValueForTaxonomy}
                setLogicOperatorValueForTaxonomy={
                  setLogicOperatorValueForTaxonomy
                }
                selectedOptions={selectedOptions}
                index={index}
              />
            )}
            {option === "Database" && (
              <DatabaseField
                valueDatabases={valueDatabases}
                setValueDatabases={setValueDatabases}
                logicOperatorValueForDatabase={logicOperatorValueForDatabase}
                setLogicOperatorValueForDatabase={
                  setLogicOperatorValueForDatabase
                }
                selectedOptions={selectedOptions}
                index={index}
              />
            )}
            {option === "Gene Ontology" && (
              <GeneOntologyField
                valueGeneOntology={valueGeneOntology}
                setValueGeneOntology={setValueGeneOnotology}
                logicOperatorValueForGeneOntology={
                  logicOperatorValueForGeneOntology
                }
                setLogicOperatorValueForGeneOntology={
                  setLogicOperatorValueForGeneOntology
                }
                selectedOptions={selectedOptions}
                index={index}
              />
            )}
            {option === "Pfam" && (
              <PfamField
                valuePfam={valuePfam}
                setValuePfam={setValuePfam}
                logicOperatorValueForPfam={logicOperatorValueForPfam}
                setLogicOperatorValueForPfam={setLogicOperatorValueForPfam}
                selectedOptions={selectedOptions}
                index={index}
              />
            )}
          </>
        );
      })}
      <Grid item lg={12} md={12} xs={12}>
        <TextField
          multiline
          rows={5}
          label="Query"
          disabled={selectedOptions.length === 0 ? false : true}
          sx={{ width: "100%" }}
        />
      </Grid>
      <Grid item lg={12} xs={12}>
        <Grid container spacing={2}>
          <Grid item lg={6} md={6} xs={6}>
            <Button
              variant="contained"
              size="medium"
              sx={{ width: "100%" }}
              onClick={onSearch}
              disabled={selectedOptions.length === 0 ? true : false}
            >
              ADD
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
