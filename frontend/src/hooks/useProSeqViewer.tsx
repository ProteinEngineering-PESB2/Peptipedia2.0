import { useEffect } from "react";
import { IAlign, IOneAlign } from "../utils/interfaces";
import { ProSeqViewer } from "proseqviewer/dist";

interface Props {
  sequences: IOneAlign[];
  color?: boolean;
}

export const useProSeqViewer = ({ sequences, color }: Props) => {
  const options = {
    sequenceColor: color ? "" : "clustal",
    wrapLine: false,
    chunkSize: 20,
    viewerWidth: "100%",
  };

  useEffect(() => {
    const psv = new ProSeqViewer("psv");
    psv.draw({ sequences, options });
  }, [sequences]);

  return {};
};
