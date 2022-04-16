import { useState, useEffect } from "react";

import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

import { fields } from "./Fields/fields";

import { getTaxonomies, getDatabases } from "../../../services/advanced_search";

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

const Form = ({ queries, setQueries }) => {
  const [optionsValue, setOptionsValue] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [queryText, setQueryText] = useState("");
  const [loading, setLoading] = useState(true);

  const [valueLength, setValueLength] = useState([20, 100]);
  const [valueMolecularWeight, setValueMolecularWeight] = useState([20, 100]);
  const [valueIsoelectricPoint, setValueIsoelectricPoint] = useState([20, 100]);
  const [valueCharge, setValueCharge] = useState([20, 100]);
  const [valueChargeDensity, setValueChargeDensity] = useState([20, 100]);
  const [valueTaxonomy, setValueTaxonomy] = useState("");
  const [inputTaxonomy, setInputTaxonomy] = useState("");
  const [valueGeneOntology, setValueGeneOnotology] = useState("");
  const [valuePfam, setValuePfam] = useState("");
  const [valueActivity, setValueActivity] = useState("");
  const [valueDatabase, setValueDatabase] = useState("");

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

  const [taxonomies, setTaxonomies] = useState([]);
  const [databases, setDatabases] = useState([]);

  const initialTaxonomies = async () => {
    try {
      const res = await getTaxonomies("a");
      const array = [];
      res.result.forEach((r) => {
        array.push(r.name);
      });
      setTaxonomies(array);
    } catch (error) {
      console.log(error);
    }
  };

  const initialDatabases = async () => {
    try {
      const res = await getDatabases();
      const array = [];
      res.result.forEach((r) => {
        array.push(r.name);
      });
      setDatabases(array);
      setValueDatabase(array[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    initialTaxonomies();
    initialDatabases();
    setLoading(false);
  }, []);

  const handleChangeQueryText = (e) => {
    setQueryText(e.target.value);
  };

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

  const handleChangeValueActivity = (e, newValue) => {
    setValueActivity(newValue);
  };

  const handleChangeValueTaxonomy = async (e, newValue) => {
    setValueTaxonomy(newValue);
  };

  const handleChangeInputTaxonomy = async (e, newValue) => {
    if (newValue) {
      try {
        const res = await getTaxonomies(newValue);
        const array = [];
        res.result.forEach((r) => {
          array.push(r.name);
        });
        setTaxonomies(array);
      } catch (error) {
        console.log(error);
      }
    }

    setInputTaxonomy(newValue);
  };

  const handleChangeValueDatabase = (e, newValue) => {
    setValueDatabase(newValue);
  };

  const handleChangeValuePfam = (e, newValue) => {
    setValuePfam(newValue);
  };

  const handleChangeValueGeneOntology = (e, newValue) => {
    setValueGeneOnotology(newValue);
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
        return ` ${selectedOperators[index - 1]} (${range[0]} < ${field} < ${
          range[1]
        })`;
      }
    }
  };

  const selectInput = (field, value, index, selectedOperators) => {
    if (selectedOperators.length === 0) {
      return `(${field} = ${value})`;
    } else {
      if (index === 0) {
        return `(${field} = ${value})`;
      } else {
        return ` ${selectedOperators[index - 1]} (${field} = ${value})`;
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
    setValueActivity("");
    setValueTaxonomy("");
    setValueDatabase("");
    setValueGeneOnotology("");
    setValuePfam("");
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
    setQueryText("");
  };

  const onSearch = () => {
    let query = "";
    if (queryText.length > 0) {
      for (let i = 0; i < queryText.length; i++) {
        if (queryText[i] === "#") {
          let position = "";
          for (let j = i + 1; j < queryText.length; j++) {
            if (parseInt(queryText[j]) > 0) {
              position += queryText[j];
            } else {
              break;
            }
          }
          if (position.length > 0) {
            if (parseInt(position) <= queries.length) {
              query += queries[parseInt(position) - 1];
            } else {
              query = queryText;
              break;
            }
          }
        } else {
          if (parseInt(queryText[i]) >= 0) {
            continue;
          } else {
            query += queryText[i];
          }
        }
      }
    } else {
      const selectedOperators = [];
      selectedOptions.forEach((value, index) => {
        if (index !== 0) {
          if (value === "Length")
            selectedOperators.push(logicOperatorValueForLength);
          if (value === "Molecular Weight")
            selectedOperators.push(logicOperatorValueForMolecularWeight);
          if (value === "Isoelectric Point")
            selectedOperators.push(logicOperatorValueForIsoelectricPoint);
          if (value === "Charge")
            selectedOperators.push(logicOperatorValueForCharge);
          if (value === "Charge Density")
            selectedOperators.push(logicOperatorValueForChargeDensity);
          if (value === "Patent")
            selectedOperators.push(logicOperatorValueForPatent);
          if (value === "Activity")
            selectedOperators.push(logicOperatorValueForActivity);
          if (value === "Taxonomy")
            selectedOperators.push(logicOperatorValueForTaxonomy);
          if (value === "Database")
            selectedOperators.push(logicOperatorValueForDatabase);
          if (value === "Gene Ontology")
            selectedOperators.push(logicOperatorValueForGeneOntology);
          if (value === "Pfam")
            selectedOperators.push(logicOperatorValueForPfam);
        }
      });
      selectedOptions.forEach((value, index) => {
        if (value === "Length")
          query += rangeInput(value, valueLength, index, selectedOperators);
        if (value === "Molecular Weight")
          query += rangeInput(
            value,
            valueMolecularWeight,
            index,
            selectedOperators
          );
        if (value === "Isoelectric Point")
          query += rangeInput(
            value,
            valueIsoelectricPoint,
            index,
            selectedOperators
          );
        if (value === "Charge")
          query += rangeInput(value, valueCharge, index, selectedOperators);
        if (value === "Charge Density")
          query += rangeInput(
            value,
            valueChargeDensity,
            index,
            selectedOperators
          );
        if (value === "Taxonomy")
          query += selectInput(value, valueTaxonomy, index, selectedOperators);
        if (value === "Gene Ontology")
          query += selectInput(
            value,
            valueGeneOntology,
            index,
            selectedOperators
          );
        if (value === "Pfam")
          query += selectInput(value, valuePfam, index, selectedOperators);
        if (value === "Activity")
          query += selectInput(value, valueActivity, index, selectedOperators);
        if (value === "Database")
          query += selectInput(value, valueDatabase, index, selectedOperators);
      });
      query = `(${query})`;
    }
    setQueries(queries.concat(query));
    onReset();
  };

  return (
    <>
      {loading ? (
        <div></div>
      ) : (
        <Grid container spacing={3}>
          <Grid item lg={12} md={12} xs={12}>
            <Grid item lg={12} md={12} xs={12}>
              <Autocomplete
                multiple
                options={fields}
                disableCloseOnSelect
                disabled={queryText.length > 0 ? true : false}
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
                renderInput={(params) => (
                  <TextField {...params} label="Fields" />
                )}
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
                    handleChangeValueChargeDensity={
                      handleChangeValueChargeDensity
                    }
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
                {option === "Activity" && (
                  <ActivityField
                    valueActivity={valueActivity}
                    handleChangeValueActivity={handleChangeValueActivity}
                    logicOperatorValueForActivity={
                      logicOperatorValueForActivity
                    }
                    setLogicOperatorValueForActivity={
                      setLogicOperatorValueForActivity
                    }
                    selectedOptions={selectedOptions}
                    index={index}
                  />
                )}
                {option === "Taxonomy" && (
                  <TaxonomyField
                    valueTaxonomy={valueTaxonomy}
                    handleChangeValueTaxonomy={handleChangeValueTaxonomy}
                    inputTaxonomy={inputTaxonomy}
                    handleChangeInputTaxonomy={handleChangeInputTaxonomy}
                    logicOperatorValueForTaxonomy={
                      logicOperatorValueForTaxonomy
                    }
                    setLogicOperatorValueForTaxonomy={
                      setLogicOperatorValueForTaxonomy
                    }
                    selectedOptions={selectedOptions}
                    index={index}
                    taxonomies={taxonomies}
                  />
                )}
                {option === "Database" && (
                  <DatabaseField
                    valueDatabase={valueDatabase}
                    handleChangeValueDatabase={handleChangeValueDatabase}
                    logicOperatorValueForDatabase={
                      logicOperatorValueForDatabase
                    }
                    setLogicOperatorValueForDatabase={
                      setLogicOperatorValueForDatabase
                    }
                    selectedOptions={selectedOptions}
                    index={index}
                    databases={databases}
                  />
                )}
                {option === "Pfam" && (
                  <PfamField
                    valuePfam={valuePfam}
                    handleChangeValuePfam={handleChangeValuePfam}
                    logicOperatorValueForPfam={logicOperatorValueForPfam}
                    setLogicOperatorValueForPfam={setLogicOperatorValueForPfam}
                    selectedOptions={selectedOptions}
                    index={index}
                  />
                )}
                {option === "Gene Ontology" && (
                  <GeneOntologyField
                    valueGeneOntology={valueGeneOntology}
                    handleChangeValueGeneOntology={
                      handleChangeValueGeneOntology
                    }
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
              </>
            );
          })}
          <Grid item lg={12} md={12} xs={12}>
            <TextField
              multiline
              rows={5}
              label="Query"
              disabled={selectedOptions.length === 0 ? false : true}
              value={queryText}
              onChange={handleChangeQueryText}
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid item lg={12} xs={12}>
            <Grid container spacing={2}>
              <Grid item lg={6} md={6} xs={6}>
                <Button
                  variant="contained"
                  size="medium"
                  sx={{
                    width: "100%",
                    backgroundColor: "#2962ff",
                    ":hover": { backgroundColor: "#2962ff" },
                  }}
                  onClick={onSearch}
                  disabled={
                    selectedOptions.length === 0
                      ? queryText.length === 0
                        ? true
                        : false
                      : false ||
                        (selectedOptions.includes("Activity") &&
                          valueActivity === "")
                      ? true
                      : false ||
                        (selectedOptions.includes("Taxonomy") &&
                          valueTaxonomy === "")
                      ? true
                      : false ||
                        (selectedOptions.includes("Database") &&
                          valueDatabase === "")
                      ? true
                      : false ||
                        (selectedOptions.includes("Gene Ontology") &&
                          valueGeneOntology.length === 0)
                      ? true
                      : false ||
                        (selectedOptions.includes("Pfam") &&
                          valuePfam.length === 0)
                      ? true
                      : false
                  }
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
      )}
    </>
  );
};

export default Form;
