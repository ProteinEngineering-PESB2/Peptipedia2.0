import { useEffect } from "react";
import { IAlign, IOneAlign } from "../utils/interfaces";
import { ProSeqViewer } from "proseqviewer/dist";

interface Props {
  sequences: IOneAlign[];
}

const options = {
  sequenceColor: "clustal",
  wrapLine: false,
  chunkSize: 20,
  viewerWidth: "100%",
};

export const useProSeqViewer = ({ sequences }: Props) => {
  useEffect(() => {
    const psv = new ProSeqViewer("psv");
    psv.draw({ sequences, options });
  }, [sequences]);

  return {};
};
