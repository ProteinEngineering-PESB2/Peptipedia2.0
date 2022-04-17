import AsyncSelect from "react-select/async";

import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import { getPfam } from "../../../../services/advanced_search";
import { FormControl } from "@mui/material";

const PfamField = ({
  options,
  valuePfam,
  setValuePfam,
  index,
  logicOperatorValueForPfam,
  handleChangeLogicOperatorPfam,
}) => {
  const loadOptions = (inputValue, callback) => {
    setTimeout(async () => {
      const res = await getPfam(inputValue);
      callback(res.result);
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
