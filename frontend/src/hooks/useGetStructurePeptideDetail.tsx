import toast from "react-hot-toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { IAlign } from "../utils/interfaces";
import pv from "bio-pv";

interface Props {
  peptideId: string | undefined;
}

export default function useGetStructurePeptideDetail({ peptideId }: Props) {
  const [sequences, setSequences] = useState<IAlign[]>([]);

  const getStructureFromPeptide = async () => {
    try {
      const { data } = await axios.get(`/api/get_structure/${peptideId}`);
      setSequences(data.alignment);

      const res_pdb = await axios.get(data.path);

      const options = {
        width: 700,
        height: 700,
        antialias: true,
        quality: "medium",
      };

      const structure = pv.io.pdb(res_pdb.data);
      const residues_equal = structure.select({
        rindices: data.equal_res,
      });
      const residues_similar = structure.select({
        rindices: data.similar_res,
      });
      const residues_different = structure.select({
        rindices: data.different_res,
      });
      const viewer = pv.Viewer(document.getElementById("content-pdb"));

      const geom_equal = viewer.cartoon("protein", residues_equal);
      geom_equal.colorBy(pv.color.uniform("darkblue"));
      const geom_similar = viewer.cartoon("protein", residues_similar);
      geom_similar.colorBy(pv.color.uniform("lightblue"));
      const geom_different = viewer.cartoon("protein", residues_different);
      geom_different.colorBy(pv.color.uniform("white"));

      viewer.centerOn(structure);
    } catch (error) {
      toast.error("Server Error");
    }
  };

  useEffect(() => {
    getStructureFromPeptide();
  }, []);

  return {
    sequences,
  };
}
