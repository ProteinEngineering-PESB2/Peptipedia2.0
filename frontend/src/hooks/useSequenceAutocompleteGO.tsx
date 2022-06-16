import { SyntheticEvent, useEffect, useState } from "react";
import { IDataGeneOntology } from "../utils/interfaces";

interface Props {
  result: IDataGeneOntology[];
  type: string | null;
}

export const useSequenceAutocompleteGO = ({ result, type }: Props) => {
  const [sequences, setSequences] = useState<string[]>([]);
  const [selectedSequence, setSelectedSequence] = useState<string | null>("");

  useEffect(() => {
    const unique_sequences: string[] = [];

    for (let row in result) {
      if (result[row]["type"] === type) {
        result[row]["prediction"].map(
          (e) =>
            unique_sequences.includes(e.id_seq) === false &&
            unique_sequences.push(e.id_seq)
        );

        break
      }
    }

    setSequences(unique_sequences);
    setSelectedSequence(unique_sequences[0]);
  }, [type]);

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
