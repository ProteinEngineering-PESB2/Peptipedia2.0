import { useState } from "react";

import AlignmentForm from "./AlignmentForm";

const Alignment = () => {
  const [data, setData] = useState([]);

  return (
    <>{data.length === 0 ? <AlignmentForm /> : ""}</>
  );
};

export default Alignment;
