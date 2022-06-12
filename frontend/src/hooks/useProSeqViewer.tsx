import { useEffect } from "react";
import { IAlign } from "../utils/interfaces";
import { ProSeqViewer } from "proseqviewer/dist";

interface Props {
  sequences: IAlign[];
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
