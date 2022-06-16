import { SyntheticEvent, useEffect, useState } from "react";
import { IDataGeneOntology } from "../utils/interfaces";

interface Props {
  result: IDataGeneOntology[];
}

export function useTypeAutocompleteGO({ result }: Props) {
  const [types, setTypes] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string | null>("");

  useEffect(() => {
    const unique_types: string[] = [];
    for (let row in result) {
      const new_type = result[row]["type"];
      if (unique_types.includes(new_type) === false) {
        unique_types.push(new_type);
      }
    }

    setTypes(unique_types);
    setSelectedType(unique_types[0]);
  }, []);

  const handleChangeSelectedType = (
    e: SyntheticEvent<Element, Event>,
    newValue: string | null
  ): void => {
    setSelectedType(newValue);
  };

  return {
    types,
    selectedType,
    handleChangeSelectedType
  };
}
