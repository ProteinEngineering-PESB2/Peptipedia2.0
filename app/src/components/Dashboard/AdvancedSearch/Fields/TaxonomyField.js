import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

const TaxonomyField = ({
  valueTaxonomy,
  handleChangeValueTaxonomy,
  inputTaxonomy,
  handleChangeInputTaxonomy,
  logicOperatorValueForTaxonomy,
  setLogicOperatorValueForTaxonomy,
  index,
  taxonomies,
}) => {
  return (
    <Grid item lg={12} md={12} xs={12}>
      {index !== 0 ? (
        <Grid container spacing={2}>
          <Grid item lg={2.6} xs={4}>
            <Select
              value={logicOperatorValueForTaxonomy}
              onChange={({ target }) =>
                setLogicOperatorValueForTaxonomy(target.value)
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
              <Autocomplete
                value={valueTaxonomy}
                onChange={handleChangeValueTaxonomy}
                inputValue={inputTaxonomy}
                onInputChange={handleChangeInputTaxonomy}
                options={taxonomies}
                renderInput={(params) => (
                  <TextField {...params} label="Taxonomy" />
                )}
              />
            </FormControl>
          </Grid>
        </Grid>
      ) : (
        <FormControl sx={{ width: "100%" }}>
          <Autocomplete
            value={valueTaxonomy}
            onChange={handleChangeValueTaxonomy}
            inputValue={inputTaxonomy}
            onInputChange={handleChangeInputTaxonomy}
            options={taxonomies}
            renderInput={(params) => <TextField {...params} label="Taxonomy" />}
          />
        </FormControl>
      )}
    </Grid>
  );
};

export default TaxonomyField;
