import {
  Grid,
  Autocomplete,
  Checkbox,
  TextField,
  SelectChangeEvent,
} from "@mui/material";
import { SyntheticEvent, useState } from "react";
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

import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import useValueFieldAdvancedSearch from "../../hooks/useValueFieldAdvancedSearch";
import useValueLogicOperator from "../../hooks/useValueLogicOperator";
import useGetDatabases from "../../hooks/useGetDatabases";
import useGetActivities from "../../hooks/useGetActivities";
import useGetTaxonomies from "../../hooks/useGetTaxonomies";
import useGetPfam from "../../hooks/useGetPfams";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function AdvancedSearchForm() {
  const [queryText, setQueryText] = useState<string>("");
  const [optionsValue, setOptionsValue] = useState<any[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);

  const [params, setParams] = useState({});

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
  } = useValueLogicOperator();

  const { databases } = useGetDatabases();
  const { activities } = useGetActivities();
  const { taxonomies } = useGetTaxonomies();
  const { pfams } = useGetPfam();

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={9} lg={6} xl={4}>
          <FormContainer>
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
                    {/*
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
                    )} */}
                  </div>
                );
              })}
            </form>
          </FormContainer>
        </Grid>
      </Grid>
    </>
  );
}
