import { useState, useEffect, useCallback } from "react";
import { useStateIfMounted } from "use-state-if-mounted";

import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";

import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

import { fields } from "./Fields/fields";

import {
  getTaxonomiesWithoutTerm,
  getDatabases,
  getPfamWithoutTerm,
  getGeneOntologyWithoutTerm,
  databaseResultsCount,
  parameters,
  getActivities,
} from "../../../services/advanced_search";

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
import SequenceField from "./Fields/SequenceField";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const Form = ({
  queries,
  setQueries,
  queriesWithID,
  setQueriesWithID,
  counts,
  setCounts,
  setOpenSnackbar,
  setMessage,
  setSeverity,
}) => {
  const [optionsValue, setOptionsValue] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [queryText, setQueryText] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingButton, setLoadingButton] = useStateIfMounted(false);
  const [params, setParams] = useStateIfMounted({});

  const [valueLength, setValueLength] = useStateIfMounted([]);
  const [valueMolecularWeight, setValueMolecularWeight] = useStateIfMounted([
    20, 100,
  ]);
  const [valueIsoelectricPoint, setValueIsoelectricPoint] = useStateIfMounted([
    20, 100,
  ]);
  const [valueCharge, setValueCharge] = useStateIfMounted([20, 100]);
  const [valueChargeDensity, setValueChargeDensity] = useStateIfMounted([
    20, 100,
  ]);
  const [valueDatabase, setValueDatabase] = useState({});
  const [valueActivity, setValueActivity] = useState({});
  const [valueTaxonomy, setValueTaxonomy] = useState({});
  const [valuePfam, setValuePfam] = useState({});
  const [valueGeneOntology, setValueGeneOnotology] = useState({});
  const [valueSequence, setValueSequence] = useState("");

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
  const [logicOperatorValueForSequence, setLogicOperatorValueForSequence] =
    useState("AND");

  const [taxonomies, setTaxonomies] = useStateIfMounted([]);
  const [databases, setDatabases] = useStateIfMounted([]);
  const [pfams, setPfams] = useStateIfMounted([]);
  const [geneOntologies, setGeneOntologies] = useStateIfMounted([]);
  const [activities, setActivities] = useStateIfMounted([]);

  const initialTaxonomies = useCallback(async () => {
    try {
      const res = await getTaxonomiesWithoutTerm();
      setTaxonomies(res.result);
    } catch (error) {
      setSeverity("error");
      setMessage("Service no available");
      setOpenSnackbar(true);
    }
  }, [setMessage, setOpenSnackbar, setSeverity]);

  const initialPfams = useCallback(async () => {
    try {
      const res = await getPfamWithoutTerm();
      setPfams(res.result);
    } catch (error) {
      setSeverity("error");
      setMessage("Service no available");
      setOpenSnackbar(true);
    }
  }, [setSeverity, setMessage, setOpenSnackbar]);

  const initialDatabases = useCallback(async () => {
    try {
      const res = await getDatabases();
      setDatabases(res.result);
    } catch (error) {
      setSeverity("error");
      setMessage("Service no available");
      setOpenSnackbar(true);
    }
  }, [setMessage, setSeverity, setOpenSnackbar]);

  const initialGeneOntology = useCallback(async () => {
    try {
      const res = await getGeneOntologyWithoutTerm();
      setGeneOntologies(res.result);
    } catch (error) {
      setSeverity("error");
      setMessage("Service no available");
      setOpenSnackbar(true);
    }
  }, [setSeverity, setMessage, setOpenSnackbar]);

  const initialActivities = useCallback(async () => {
    try {
      const res = await getActivities();
      setActivities(res.result);
    } catch (error) {
      setSeverity("error");
      setMessage("Service no available");
      setOpenSnackbar(true);
    }
  }, [setSeverity, setMessage, setOpenSnackbar]);

  const initialParameters = useCallback(async () => {
    try {
      const res = await parameters();
      setParams(res.result);
      setValueLength([res.result.min_length, res.result.max_length]);
      setValueMolecularWeight([
        res.result.min_molecular_weigth,
        res.result.max_molecular_weight,
      ]);
      setValueIsoelectricPoint([
        res.result.min_isoelectric_point,
        res.result.max_isoelectric_point,
      ]);
      setValueCharge([res.result.min_charge, res.result.max_charge]);
      setValueChargeDensity([
        res.result.min_charge_density,
        res.result.max_charge_density,
      ]);
    } catch (error) {
      setSeverity("error");
      setMessage("Service no available");
      setOpenSnackbar(true);
    }
  }, [
    setMessage,
    setSeverity,
    setOpenSnackbar,
  ]);

  useEffect(() => {
    initialParameters();
    initialPfams();
    initialTaxonomies();
    initialDatabases();
    initialGeneOntology();
    initialActivities();
    setLoading(false);
  }, [
    initialTaxonomies,
    initialPfams,
    initialGeneOntology,
    initialParameters,
    initialDatabases,
    initialActivities,
  ]);

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

  const handleChangeValueSequence = (e) => {
    setValueSequence(e.target.value);
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

  const handleChangeLogicOperatorPfam = (e) => {
    setLogicOperatorValueForPfam(e.target.value);
  };

  const handleChangeLogicOperatorForSequence = (e) => {
    setLogicOperatorValueForSequence(e.target.value);
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
      return `(${range[0]} <= ${field} <= ${range[1]})`;
    } else {
      if (index === 0) {
        return `(${range[0]} <= ${field} <= ${range[1]})`;
      } else {
        return ` ${selectedOperators[index - 1]} (${range[0]} <= ${field} <= ${
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
    setValueLength([params.min_length, params.max_length]);
    setValueMolecularWeight([
      params.min_molecular_weigth,
      params.max_molecular_weight,
    ]);
    setValueIsoelectricPoint([
      params.min_isoelectric_point,
      params.max_isoelectric_point,
    ]);
    setValueCharge([params.min_charge, params.max_charge]);
    setValueChargeDensity([
      params.min_charge_density,
      params.max_charge_density,
    ]);
    // setValueActivity("");
    setValueTaxonomy({});
    setValueDatabase({});
    setValueGeneOnotology({});
    setValuePfam({});
    setValueSequence("");
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
    setLogicOperatorValueForSequence("AND");
    setQueryText("");
  };

  const onSearch = async () => {
    let query = "";
    let queryWithId = "";

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
              queryWithId += queriesWithID[parseInt(position) - 1];
            } else {
              query = queryText;
              queryWithId += queryText;
              break;
            }
          }
        } else {
          if (parseInt(queryText[i]) >= 0) {
            continue;
          } else {
            query += queryText[i];
            queryWithId += queryText[i];
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
          if (value === "Sequence")
            selectedOperators.push(logicOperatorValueForSequence);
        }
      });
      selectedOptions.forEach((value, index) => {
        if (value === "Length") {
          query += rangeInput(value, valueLength, index, selectedOperators);
          queryWithId += rangeInput(
            value,
            valueLength,
            index,
            selectedOperators
          );
        }
        if (value === "Molecular Weight") {
          query += rangeInput(
            value,
            valueMolecularWeight,
            index,
            selectedOperators
          );
          queryWithId += rangeInput(
            value,
            valueMolecularWeight,
            index,
            selectedOperators
          );
        }
        if (value === "Isoelectric Point") {
          query += rangeInput(
            value,
            valueIsoelectricPoint,
            index,
            selectedOperators
          );
          queryWithId += rangeInput(
            value,
            valueIsoelectricPoint,
            index,
            selectedOperators
          );
        }
        if (value === "Charge") {
          query += rangeInput(value, valueCharge, index, selectedOperators);
          queryWithId += rangeInput(
            value,
            valueCharge,
            index,
            selectedOperators
          );
        }
        if (value === "Charge Density") {
          query += rangeInput(
            value,
            valueChargeDensity,
            index,
            selectedOperators
          );
          queryWithId += rangeInput(
            value,
            valueChargeDensity,
            index,
            selectedOperators
          );
        }
        if (value === "Taxonomy") {
          query += selectInput(
            value,
            valueTaxonomy.label,
            index,
            selectedOperators
          );
          queryWithId += selectInput(
            value,
            valueTaxonomy.value,
            index,
            selectedOperators
          );
        }
        if (value === "Gene Ontology") {
          query += selectInput(
            value,
            valueGeneOntology.label,
            index,
            selectedOperators
          );
          queryWithId += selectInput(
            value,
            valueGeneOntology.value,
            index,
            selectedOperators
          );
        }
        if (value === "Pfam") {
          query += selectInput(
            value,
            valuePfam.label,
            index,
            selectedOperators
          );
          queryWithId += selectInput(
            value,
            valuePfam.value,
            index,
            selectedOperators
          );
        }
        if (value === "Sequence") {
          query += selectInput(value, valueSequence, index, selectedOperators);
          queryWithId += selectInput(
            value,
            valueSequence,
            index,
            selectedOperators
          );
        }
        if (value === "Activity") {
          query += selectInput(
            value,
            valueActivity.label,
            index,
            selectedOperators
          );
          queryWithId += selectInput(
            value,
            valueActivity.value,
            index,
            selectedOperators
          );
        }
        if (value === "Database") {
          query += selectInput(
            value,
            valueDatabase.label,
            index,
            selectedOperators
          );
          queryWithId += selectInput(
            value,
            valueDatabase.value,
            index,
            selectedOperators
          );
        }
      });
      query = `(${query})`;
      queryWithId = `(${queryWithId})`;
    }
    try {
      setLoadingButton(true);
      const res = await databaseResultsCount(queryWithId);

      if (res.status === "error") {
        setSeverity("error");
        setMessage(res.description);
        setOpenSnackbar(true);
        onReset();
        setLoadingButton(false);
      } else if (res.status === "success") {
        setCounts(counts.concat(res.count));

        setQueries(queries.concat(query));
        setQueriesWithID(queriesWithID.concat(queryWithId));
        onReset();
        setLoadingButton(false);
      }
    } catch (error) {
      setSeverity("error");
      setMessage("Service not available");
      setOpenSnackbar(true);
      onReset();
      setLoadingButton(false);
    }
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
                    params={params}
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
                    index={index}
                    params={params}
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
                    index={index}
                    params={params}
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
                    index={index}
                    params={params}
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
                    index={index}
                    params={params}
                  />
                )}
                {option === "Database" && (
                  <DatabaseField
                    valueDatabase={valueDatabase}
                    setValueDatabase={setValueDatabase}
                    logicOperatorValueForDatabase={
                      logicOperatorValueForDatabase
                    }
                    setLogicOperatorValueForDatabase={
                      setLogicOperatorValueForDatabase
                    }
                    index={index}
                    options={databases}
                  />
                )}
                {option === "Activity" && (
                  <ActivityField
                    valueActivity={valueActivity}
                    setValueActivity={setValueActivity}
                    logicOperatorValueForActivity={
                      logicOperatorValueForActivity
                    }
                    setLogicOperatorValueForActivity={
                      setLogicOperatorValueForActivity
                    }
                    index={index}
                    options={activities}
                  />
                )}
                {option === "Taxonomy" && (
                  <TaxonomyField
                    valueTaxonomy={valueTaxonomy}
                    setValueTaxonomy={setValueTaxonomy}
                    logicOperatorValueForTaxonomy={
                      logicOperatorValueForTaxonomy
                    }
                    setLogicOperatorValueForTaxonomy={
                      setLogicOperatorValueForTaxonomy
                    }
                    index={index}
                    options={taxonomies}
                  />
                )}
                {option === "Pfam" && (
                  <PfamField
                    options={pfams}
                    valuePfam={valuePfam}
                    setValuePfam={setValuePfam}
                    logicOperatorValueForPfam={logicOperatorValueForPfam}
                    handleChangeLogicOperatorPfam={
                      handleChangeLogicOperatorPfam
                    }
                    index={index}
                  />
                )}
                {option === "Gene Ontology" && (
                  <GeneOntologyField
                    valueGeneOntology={valueGeneOntology}
                    setValueGeneOnotology={setValueGeneOnotology}
                    logicOperatorValueForGeneOntology={
                      logicOperatorValueForGeneOntology
                    }
                    setLogicOperatorValueForGeneOntology={
                      setLogicOperatorValueForGeneOntology
                    }
                    index={index}
                    options={geneOntologies}
                  />
                )}
                {option === "Sequence" && (
                  <SequenceField
                    index={index}
                    valueSequence={valueSequence}
                    handleChangeValueSequence={handleChangeValueSequence}
                    logicOperatorValueForSequence={
                      logicOperatorValueForSequence
                    }
                    handleChangeLogicOperatorForSequence={
                      handleChangeLogicOperatorForSequence
                    }
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
                {loadingButton ? (
                  <LoadingButton
                    loading
                    variant="contained"
                    sx={{ width: "100%", backgroundColor: "#2962ff" }}
                    size="medium"
                  >
                    Loading{" "}
                  </LoadingButton>
                ) : (
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
                          (selectedOptions.includes("Taxonomy") &&
                            valueTaxonomy.value === undefined)
                        ? true
                        : false ||
                          (selectedOptions.includes("Database") &&
                            valueDatabase.value === undefined)
                        ? true
                        : false ||
                          (selectedOptions.includes("Gene Ontology") &&
                            valueGeneOntology.value === undefined)
                        ? true
                        : false ||
                          (selectedOptions.includes("Pfam") &&
                            valuePfam.value === undefined)
                        ? true
                        : false ||
                          (selectedOptions.includes("Sequence") &&
                            valueSequence === "")
                        ? true
                        : false ||
                          (selectedOptions.includes("Activity") &&
                            valueActivity.value === undefined)
                        ? true
                        : false
                    }
                  >
                    ADD
                  </Button>
                )}
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
