import {
  Grid,
  Autocomplete,
  Checkbox,
  TextField,
  Button,
  Paper,
  Box,
} from "@mui/material";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useState,
} from "react";
import FormContainer from "../form/form_container";

// Fields
import { fields } from "./fields";
import LengthField from "./fields/length_field";
import MolecularWeightField from "./fields/molecular_weight";
import IsoelectricPointField from "./fields/isoelectric_point";
import ChargeField from "./fields/charge";
import ChargeDensityField from "./fields/charge_density";
import DatabaseField from "./fields/database";
import ActivityField from "./fields/activity";
import TaxonomyField from "./fields/taxonomy";
import PfamField from "./fields/pfam";
import GeneOntologyField from "./fields/gene_ontology";
import SequenceField from "./fields/sequence";

import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import useValueFieldAdvancedSearch from "../../hooks/useValueFieldAdvancedSearch";
import useValueLogicOperator from "../../hooks/useValueLogicOperator";
import useGetDatabases from "../../hooks/useGetDatabases";
import useGetActivities from "../../hooks/useGetActivities";
import useGetTaxonomies from "../../hooks/useGetTaxonomies";
import useGetPfam from "../../hooks/useGetPfams";
import useGetGeneOntologoies from "../../hooks/useGetGeneOntologoies";
import useInitialParamsAdvancedSearch from "../../hooks/useInitialParamsAdvancedSearch";
import axios from "axios";
import toast from "react-hot-toast";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface Props {
  queries: string[];
  setQueries: Dispatch<SetStateAction<string[]>>;
  queriesWithID: string[];
  setQueriesWithID: Dispatch<SetStateAction<string[]>>;
  counts: number[];
  setCounts: Dispatch<SetStateAction<number[]>>;
  setOpenBackdrop: Dispatch<SetStateAction<boolean>>;
}

const markdownText = `
  + **Sequence Input**: 
    + One amino acid sequence without fasta format.
    + Only the sequence
    + Sequence with maxium length 150.
`;

export default function AdvancedSearchForm({
  queries,
  setQueries,
  queriesWithID,
  setQueriesWithID,
  counts,
  setCounts,
  setOpenBackdrop,
}: Props) {
  const [queryText, setQueryText] = useState<string>("");
  const [optionsValue, setOptionsValue] = useState<any[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);

  const {
    valueLength,
    valueMolecularWeight,
    valueIsoelectricPoint,
    valueCharge,
    valueChargeDensity,
    handleChangeValueLength,
    handleChangeValueCharge,
    handleChangeValueChargeDensity,
    handleChangeValueIsoelectricPoint,
    handleChangeValueMolecularWeight,
    valueDatabase,
    setValueDatabase,
    setValueActivity,
    valueActivity,
    setValueTaxonomy,
    valueTaxonomy,
    setValuePfam,
    valuePfam,
    setValueGeneOnotology,
    valueGeneOntology,
    handleChangeValueSequence,
    valueSequence,
    setValueCharge,
    setValueChargeDensity,
    setValueIsoelectricPoint,
    setValueLength,
    setValueMolecularWeight,
    setValueSequence,
  } = useValueFieldAdvancedSearch();

  const {
    handleChangeLogicOperatorCharge,
    handleChangeLogicOperatorChargeDensity,
    handleChangeLogicOperatorIsoelectricPoint,
    handleChangeLogicOperatorLength,
    handleChangeLogicOperatorMolecularWeight,
    logicOperatorValueForCharge,
    logicOperatorValueForChargeDensity,
    logicOperatorValueForIsoelectricPoint,
    logicOperatorValueForLength,
    logicOperatorValueForMolecularWeight,
    logicOperatorValueForDatabase,
    setLogicOperatorValueForDatabase,
    logicOperatorValueForActivity,
    setLogicOperatorValueForActivity,
    logicOperatorValueForTaxonomy,
    setLogicOperatorValueForTaxonomy,
    handleChangeLogicOperatorPfam,
    logicOperatorValueForPfam,
    logicOperatorValueForGeneOntology,
    setLogicOperatorValueForGeneOntology,
    handleChangeLogicOperatorForSequence,
    logicOperatorValueForSequence,
    setLogicOperatorValueForCharge,
    setLogicOperatorValueForChargeDensity,
    setLogicOperatorValueForIsoelectricPoint,
    setLogicOperatorValueForMolecularWeight,
    setLogicOperatorValueForPfam,
    setLogicOperatorValueForSequence,
  } = useValueLogicOperator();

  const { databases } = useGetDatabases();
  const { activities } = useGetActivities();
  const { taxonomies } = useGetTaxonomies();
  const { pfams } = useGetPfam();
  const { geneOntologies } = useGetGeneOntologoies();

  const { params } = useInitialParamsAdvancedSearch({
    setValueCharge,
    setValueChargeDensity,
    setValueIsoelectricPoint,
    setValueLength,
    setValueMolecularWeight,
  });

  const handleChangeQueryText = (e: ChangeEvent<HTMLInputElement>) => {
    setQueryText(e.target.value);
  };

  const rangeInput = (
    field: string,
    range: any,
    index: any,
    selectedOperators: any[]
  ) => {
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

  const selectInput = (
    field: string,
    value: string,
    index: number,
    selectedOperators: any[]
  ) => {
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
    setValueActivity({ label: undefined, value: undefined });
    setValueTaxonomy({ label: undefined, value: undefined });
    setValueDatabase({ label: undefined, value: undefined });
    setValueGeneOnotology({ label: undefined, value: undefined });
    setValuePfam({ label: undefined, value: undefined });
    setValueSequence("");
    setLogicOperatorValueForMolecularWeight("AND");
    setLogicOperatorValueForIsoelectricPoint("AND");
    setLogicOperatorValueForCharge("AND");
    setLogicOperatorValueForChargeDensity("AND");
    setLogicOperatorValueForActivity("AND");
    setLogicOperatorValueForTaxonomy("AND");
    setLogicOperatorValueForDatabase("AND");
    setLogicOperatorValueForGeneOntology("AND");
    setLogicOperatorValueForPfam("AND");
    setLogicOperatorValueForSequence("AND");
    setQueryText("");
  };

  const onSearch = async () => {
    setOpenBackdrop(true);
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
      const selectedOperators: any[] = [];
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
      const post = {
        query: queryWithId,
      };

      const { data } = await axios.post(`/api/count/`, post);

      if (data.status === "error") {
        toast.error(data.description);
        onReset();
      } else if (data.status === "success") {
        setCounts(counts.concat(data.count));

        setQueries(queries.concat(query));
        setQueriesWithID(queriesWithID.concat(queryWithId));
        onReset();
      }
      setOpenBackdrop(false);
    } catch (error) {
      toast.error("Server error");
      setOpenBackdrop(false);
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={9} lg={6} xl={4}>
          <FormContainer markdownText={markdownText}>
            <form>
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
                onChange={(
                  event: SyntheticEvent<Element, Event>,
                  newValue: any[]
                ) => {
                  setOptionsValue([...newValue]);

                  const selected: any[] = [];
                  newValue.forEach((n) => {
                    selected.push(n.label);
                  });

                  setSelectedOptions(selected);
                }}
              />
              {selectedOptions.map((option, index) => {
                return (
                  <div key={index} style={{ marginTop: 10 }}>
                    {option === "Length" && (
                      <LengthField
                        valueLength={valueLength}
                        handleChangeValueLength={handleChangeValueLength}
                        logicOperatorValueForLength={
                          logicOperatorValueForLength
                        }
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
                        logicOperatorValueForCharge={
                          logicOperatorValueForCharge
                        }
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
                  </div>
                );
              })}
              <TextField
                multiline
                rows={5}
                label="Query"
                placeholder="Example: (#1 AND #2) AND (#2 OR #3)"
                disabled={selectedOptions.length === 0 ? false : true}
                value={queryText}
                onChange={handleChangeQueryText}
                sx={{ width: "100%", marginTop: 2 }}
              />
              <Button
                variant="contained"
                size="medium"
                sx={{
                  width: {
                    xl: "12rem",
                    lg: "12rem",
                    md: "12rem",
                    sm: "12rem",
                    xs: "100%",
                  },
                  backgroundColor: "#2962ff",
                  ":hover": { backgroundColor: "#2962ff" },
                  marginTop: 2,
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
                ADD QUERY
              </Button>
            </form>
          </FormContainer>
        </Grid>
      </Grid>
    </>
  );
}
