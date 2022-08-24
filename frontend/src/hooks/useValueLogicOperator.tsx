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
  const [
    logicOperatorValueForInstabilityIndex,
    setLogicOperatorValueForInstabilityIndex,
  ] = useState("AND");
  const [
    logicOperatorValueForAromaticity,
    setLogicOperatorValueForAromaticity,
  ] = useState("AND");
  const [
    logicOperatorValueForAliphaticIndex,
    setLogicOperatorValueForAliphaticIndex,
  ] = useState("AND");
  const [logicOperatorValueForBomanIndex, setLogicOperatorValueForBomanIndex] =
    useState("AND");
  const [
    logicOperatorValueForHydrophobicRatio,
    setLogicOperatorValueForHydrophobicRatio,
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

  const handleChangeLogicOperatorInstabilityIndex = (
    e: SelectChangeEvent<string>
  ) => {
    setLogicOperatorValueForInstabilityIndex(e.target.value);
  };

  const handleChangeLogicOperatorAromaticity = (
    e: SelectChangeEvent<string>
  ) => {
    setLogicOperatorValueForAromaticity(e.target.value);
  };

  const handleChangeLogicOperatorAliphaticIndex = (
    e: SelectChangeEvent<string>
  ) => {
    setLogicOperatorValueForAliphaticIndex(e.target.value);
  };

  const handleChangeLogicOperatorBomanIndex = (
    e: SelectChangeEvent<string>
  ) => {
    setLogicOperatorValueForBomanIndex(e.target.value);
  };

  const handleChangeLogicOperatorHydrophobicRatio = (
    e: SelectChangeEvent<string>
  ) => {
    setLogicOperatorValueForHydrophobicRatio(e.target.value);
  };

  const handleChangeLogicOperatorPfam = (e: SelectChangeEvent<string>) => {
    setLogicOperatorValueForPfam(e.target.value);
  };

  const handleChangeLogicOperatorForSequence = (
    e: SelectChangeEvent<string>
  ) => {
    setLogicOperatorValueForSequence(e.target.value);
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
    logicOperatorValueForInstabilityIndex,
    handleChangeLogicOperatorInstabilityIndex,
    logicOperatorValueForAromaticity,
    handleChangeLogicOperatorAromaticity,
    logicOperatorValueForAliphaticIndex,
    handleChangeLogicOperatorAliphaticIndex,
    logicOperatorValueForBomanIndex,
    handleChangeLogicOperatorBomanIndex,
    logicOperatorValueForHydrophobicRatio,
    handleChangeLogicOperatorHydrophobicRatio,
    logicOperatorValueForDatabase,
    setLogicOperatorValueForDatabase,
    logicOperatorValueForActivity,
    setLogicOperatorValueForActivity,
    logicOperatorValueForTaxonomy,
    setLogicOperatorValueForTaxonomy,
    logicOperatorValueForPfam,
    handleChangeLogicOperatorPfam,
    logicOperatorValueForGeneOntology,
    setLogicOperatorValueForGeneOntology,
    logicOperatorValueForSequence,
    handleChangeLogicOperatorForSequence,
    setLogicOperatorValueForMolecularWeight,
    setLogicOperatorValueForIsoelectricPoint,
    setLogicOperatorValueForCharge,
    setLogicOperatorValueForChargeDensity,
    setLogicOperatorValueForPfam,
    setLogicOperatorValueForSequence,
    setLogicOperatorValueForAliphaticIndex,
    setLogicOperatorValueForBomanIndex,
    setLogicOperatorValueForAromaticity,
    setLogicOperatorValueForHydrophobicRatio,
    setLogicOperatorValueForInstabilityIndex,
  };
}
