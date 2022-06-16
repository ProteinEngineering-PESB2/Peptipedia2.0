import { SyntheticEvent, useEffect, useState } from "react";
import { IDataFrequency } from "../utils/interfaces";

interface Props {
  result: IDataFrequency[];
}

export const useSequenceAutocompleteFrequency = ({ result }: Props) => {
  const [sequences, setSequences] = useState<string[]>([]);
  const [selectedSequence, setSelectedSequence] = useState<string | null>("");

  useEffect(() => {
    const unique_sequences: string[] = [];
    for (let row in result) {
      if (unique_sequences.includes(result[row]["id_seq"]) === false)
        unique_sequences.push(result[row]["id_seq"]);
    }

    setSequences(unique_sequences);
    setSelectedSequence(unique_sequences[0]);
  }, []);

  const handleChangeSelectedSequence = (
    e: SyntheticEvent<Element, Event>,
    newValue: string | null
  ): void => {
    setSelectedSequence(newValue);
  };

  return {
    sequences,
    selectedSequence,
    handleChangeSelectedSequence,
  };
};
