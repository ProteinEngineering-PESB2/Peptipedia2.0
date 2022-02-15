import { useState } from "react";

import AlignmentForm from "./AlignmentForm";
import Blast from "./Blast";
import MSA from "./MSA";

const Alignment = () => {
  const [alignmentType, setAlignmentType] = useState("")
  const [data, setData] = useState([]);

  return (
    <>{data.length === 0 
      ? <AlignmentForm setAlignmentType={setAlignmentType} setData={setData}/> 
      : alignmentType === "blast" ? <Blast data={data}/> : alignmentType === "msa" && <MSA data={data}/>
      }
    </>
  );
};

export default Alignment;
