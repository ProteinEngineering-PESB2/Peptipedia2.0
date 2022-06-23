import { useState } from "react";
import { SelectChangeEvent } from "@mui/material";

export default function useValueLogicOperator() {
  // Operators
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

  // Handle Change Operators
  const handleChangeLogicOperatorLength = (e: SelectChangeEvent<string>) => {
    setLogicOperatorValueForLength(e.target.value);
  };

  const handleChangeLogicOperatorMolecularWeight = (
    e: SelectChangeEvent<string>
  ) => {
    setLogicOperatorValueForMolecularWeight(e.target.value);
  };

  const handleChangeLogicOperatorIsoelectricPoint = (
    e: SelectChangeEvent<string>
  ) => {
    setLogicOperatorValueForIsoelectricPoint(e.target.value);
  };

  const handleChangeLogicOperatorCharge = (e: SelectChangeEvent<string>) => {
    setLogicOperatorValueForCharge(e.target.value);
  };

  const handleChangeLogicOperatorChargeDensity = (
    e: SelectChangeEvent<string>
  ) => {
    setLogicOperatorValueForChargeDensity(e.target.value);
  };

  return {
    logicOperatorValueForLength,
    logicOperatorValueForMolecularWeight,
    logicOperatorValueForIsoelectricPoint,
    logicOperatorValueForCharge,
    logicOperatorValueForChargeDensity,
    handleChangeLogicOperatorLength,
    handleChangeLogicOperatorMolecularWeight,
    handleChangeLogicOperatorIsoelectricPoint,
    handleChangeLogicOperatorCharge,
    handleChangeLogicOperatorChargeDensity,
  };
}
