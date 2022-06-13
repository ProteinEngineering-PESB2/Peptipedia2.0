import { useEffect, useState, SyntheticEvent } from "react";
import { IDataPfam } from "../utils/interfaces";
import { useDataTablePfam } from "./useDataTablePfam";

interface Props {
  result: IDataPfam[];
}

export function usePfamAutocomplete({ result }: Props) {
  const [sequences, setSequences] = useState<string[]>([]);
  const [selectedSequence, setSelectedSequence] = useState<string | null>("");

  const { table } = useDataTablePfam({ result, selectedSequence });

  useEffect(() => {
    const unique_sequences: string[] = [];
    for (let row in result) {
      const sequence = result[row].id;
      if (unique_sequences.includes(sequence) == false) {
        unique_sequences.push(sequence);
      }
      setSequences(unique_sequences);
      setSelectedSequence(unique_sequences[0]);
    }
  }, []);

  const handleSequenceSelected = (
    e: SyntheticEvent<Element, Event>,
    newValue: string | null
  ): void => {
    setSelectedSequence(newValue);
  };

  return {
    sequences,
    selectedSequence,
    handleSequenceSelected,
    table
  };
}
