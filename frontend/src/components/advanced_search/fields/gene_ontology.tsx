import AsyncSelect from "react-select/async";
import axios from "axios";

import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { Dispatch, SetStateAction } from "react";
import { SelectChangeEvent } from "@mui/material";

interface Props {
  valueGeneOntology: any;
  setValueGeneOnotology: Dispatch<SetStateAction<any>>;
  logicOperatorValueForGeneOntology: string;
  setLogicOperatorValueForGeneOntology: Dispatch<SetStateAction<string>>;
  index: number;
  options: any;
}

const GeneOntologyField = ({
  valueGeneOntology,
  setValueGeneOnotology,
  logicOperatorValueForGeneOntology,
  setLogicOperatorValueForGeneOntology,
  index,
  options,
}: Props) => {
  const loadOptions = (inputValue: any, callback: any) => {
    setTimeout(async () => {
      const { data } = await axios.get(`/api/gene_ontology_list/${inputValue}`);
      callback(data.result);
    }, 1000);
  };

  return (
    <>
      <Grid item lg={12} md={12} xs={12}>
        {index !== 0 ? (
          <Grid container spacing={2}>
            <Grid item lg={2.6} xs={4}>
              <Select
                value={logicOperatorValueForGeneOntology}
                onChange={({ target }) =>
                  setLogicOperatorValueForGeneOntology(target.value)
                }
                label="Operator"
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                sx={{ width: "100%" }}
              >
                <MenuItem value="AND">AND</MenuItem>
                <MenuItem value="OR">OR</MenuItem>
              </Select>
            </Grid>
            <Grid item lg={9} xs={8}>
              <FormControl sx={{ width: "100%" }}>
                <AsyncSelect
                  value={valueGeneOntology}
                  onChange={(e) => setValueGeneOnotology(e)}
                  cacheOptions
                  defaultOptions={options}
                  loadOptions={loadOptions}
                />
              </FormControl>
            </Grid>
          </Grid>
        ) : (
          <FormControl sx={{ width: "100%" }}>
            <AsyncSelect
              value={valueGeneOntology}
              onChange={(e) => setValueGeneOnotology(e)}
              cacheOptions
              defaultOptions={options}
              loadOptions={loadOptions}
            />
          </FormControl>
        )}
      </Grid>
    </>
  );
};

export default GeneOntologyField;
