import AsyncSelect from "react-select/async";

import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import { FormControl, SelectChangeEvent } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import axios from "axios";

interface Props {
  valuePfam: any;
  setValuePfam: Dispatch<SetStateAction<any>>;
  logicOperatorValueForPfam: string;
  handleChangeLogicOperatorPfam: (e: SelectChangeEvent<string>) => void;
  index: number;
  options: any;
}

const PfamField = ({
  options,
  valuePfam,
  setValuePfam,
  index,
  logicOperatorValueForPfam,
  handleChangeLogicOperatorPfam,
}: Props) => {
  const loadOptions = (inputValue: any, callback: any) => {
    setTimeout(async () => {
      const { data } = await axios.get(`/api/taxonomy_list/${inputValue}`);
      callback(data.result);
    }, 1000);
  };

  return (
    <>
      <Grid item lg={12} md={12} xs={12}>
        {index === 0 ? (
          <AsyncSelect
            value={valuePfam}
            onChange={(e) => setValuePfam(e)}
            cacheOptions
            defaultOptions={options}
            loadOptions={loadOptions}
          />
        ) : (
          <Grid container spacing={2}>
            <Grid item lg={2.6} xs={4}>
              <Select
                value={logicOperatorValueForPfam}
                onChange={handleChangeLogicOperatorPfam}
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
                  value={valuePfam}
                  onChange={(e) => setValuePfam(e)}
                  cacheOptions
                  defaultOptions={options}
                  loadOptions={loadOptions}
                />
              </FormControl>
            </Grid>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default PfamField;
