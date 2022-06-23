import { ChangeEvent, useState } from "react";

interface IArrayField {
  label: any;
  value: any;
}

export default function useValueFieldAdvancedSearch() {
  const [valueLength, setValueLength] = useState<number | number[]>([20, 100]);
  const [valueMolecularWeight, setValueMolecularWeight] = useState<
    number | number[]
  >([20, 100]);
  const [valueIsoelectricPoint, setValueIsoelectricPoint] = useState<
    number | number[]
  >([20, 100]);
  const [valueCharge, setValueCharge] = useState<number | number[]>([20, 100]);
  const [valueChargeDensity, setValueChargeDensity] = useState<
    number | number[]
  >([20, 100]);
  const [valueDatabase, setValueDatabase] = useState<IArrayField>({
    label: undefined,
    value: undefined,
  });
  const [valueActivity, setValueActivity] = useState<IArrayField>({
    label: undefined,
    value: undefined,
  });
  const [valueTaxonomy, setValueTaxonomy] = useState<IArrayField>({
    label: undefined,
    value: undefined,
  });
  const [valuePfam, setValuePfam] = useState<IArrayField>({
    label: undefined,
    value: undefined,
  });
  const [valueGeneOntology, setValueGeneOnotology] = useState<IArrayField>({
    label: undefined,
    value: undefined,
  });
  const [valueSequence, setValueSequence] = useState("");

  // Handle Change Fields
  const handleChangeValueLength = (e: Event, newValue: number | number[]) => {
    setValueLength(newValue);
  };

  const handleChangeValueMolecularWeight = (
    e: Event,
    newValue: number | number[]
  ) => {
    setValueMolecularWeight(newValue);
  };

  const handleChangeValueIsoelectricPoint = (
    e: Event,
    newValue: number | number[]
  ) => {
    setValueIsoelectricPoint(newValue);
  };

  const handleChangeValueCharge = (e: Event, newValue: number | number[]) => {
    setValueCharge(newValue);
  };

  const handleChangeValueChargeDensity = (
    e: Event,
    newValue: number | number[]
  ) => {
    setValueChargeDensity(newValue);
  };

  const handleChangeValueSequence = (e: ChangeEvent<HTMLInputElement>) => {
    setValueSequence(e.target.value);
  };

  return {
    valueLength,
    handleChangeValueLength,
    valueMolecularWeight,
    handleChangeValueMolecularWeight,
    valueIsoelectricPoint,
    handleChangeValueIsoelectricPoint,
    valueCharge,
    handleChangeValueCharge,
    valueChargeDensity,
    handleChangeValueChargeDensity,
    valueDatabase,
    setValueDatabase,
    valueActivity,
    setValueActivity,
    valueTaxonomy,
    setValueTaxonomy,
    valuePfam,
    setValuePfam,
    valueGeneOntology,
    setValueGeneOnotology,
    valueSequence,
    handleChangeValueSequence,
    setValueLength,
    setValueMolecularWeight,
    setValueIsoelectricPoint,
    setValueCharge,
    setValueChargeDensity,
    setValueSequence,
  };
}
