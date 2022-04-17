import AsyncSelect from "react-select/async";
import { useState, useEffect } from "react";

import Grid from "@mui/material/Grid";

import { getPfam } from "../../../../services/advanced_search";

const PfamField = () => {
  const [selectedOption, setSelectedOption] = useState({});
  const [pfams, setPfams] = useState([]);
  const [loading, setLoading] = useState(true);

  const initialData = async () => {
    const res = await getPfam("a");
    setPfams(res.result);
  };

  useEffect(() => {
    initialData();
    setLoading(false);
  }, []);

  const colourOptions = [
    { value: "ocean", label: "Ocean" },
    { value: "blue", label: "Blue" },
    { value: "purple", label: "Purple" },
    { value: "red", label: "Red" },
    { value: "orange", label: "Orange" },
    { value: "yellow", label: "Yellow" },
    { value: "green", label: "Green" },
    { value: "forest", label: "Forest" },
    { value: "slate", label: "Slate" },
    { value: "silver", label: "Silver" },
  ];

  const filterColors = async (inputValue) => {
    const res = await getPfam(inputValue);
    console.log(res.result);
    // const colors = colourOptions.filter((i) =>
    //   i.label.toLowerCase().includes(inputValue.toLowerCase())
    // );
    return res.result;
  };

  const loadOptions = (inputValue, callback) => {
    setTimeout(async () => {
      const res = await getPfam(inputValue);
      callback(res.result);
    }, 1000);
  };

  return (
    <>
      {loading ? (
        <></>
      ) : (
        <>
          <Grid item lg={12} md={12} xs={12}>
            <AsyncSelect
              value={selectedOption}
              onChange={(e) => setSelectedOption(e)}
              cacheOptions
              defaultOptions={pfams}
              loadOptions={loadOptions}
            />
          </Grid>
          <h1>{selectedOption.value}</h1>
          <h1>{selectedOption.label}</h1>
        </>
      )}
    </>
  );
};

export default PfamField;
