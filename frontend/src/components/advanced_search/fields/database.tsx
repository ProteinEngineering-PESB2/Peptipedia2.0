import AsyncSelect from "react-select/async";

import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Dispatch, SetStateAction } from "react";

interface Props {
    valueDatabase: any
    setValueDatabase: Dispatch<SetStateAction<any>>
    logicOperatorValueForDatabase: string
    setLogicOperatorValueForDatabase: Dispatch<SetStateAction<string>>
    index: number
    options: any
}

const DatabaseField = ({
  valueDatabase,
  setValueDatabase,
  logicOperatorValueForDatabase,
  setLogicOperatorValueForDatabase,
  index,
  options,
}: Props) => {
  const filterDatabases = (inputValue: any) => {
    const databases = options.filter((o: any) => o.label.includes(inputValue));

    return databases;
  };

  const loadOptions = (inputValue: any, callback: any) => {
    setTimeout(() => {
      const databases = filterDatabases(inputValue);
      callback(databases);
    }, 1000);
  };

  return (
    <Grid item lg={12} md={12} xs={12}>
      {index !== 0 ? (
        <Grid container spacing={2}>
          <Grid item lg={2.6} xs={4}>
            <Select
              value={logicOperatorValueForDatabase}
              onChange={({ target }) =>
                setLogicOperatorValueForDatabase(target.value)
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
                value={valueDatabase}
                onChange={(e) => setValueDatabase(e)}
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
            value={valueDatabase}
            onChange={(e) => setValueDatabase(e)}
            cacheOptions
            defaultOptions={options}
            loadOptions={loadOptions}
          />
        </FormControl>
      )}
    </Grid>
  );
};

export default DatabaseField;
