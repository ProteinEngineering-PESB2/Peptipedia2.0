import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

const TaxonomyField = ({
  valueTaxonomy,
  setValueTaxonomy,
  logicOperatorValueForTaxonomy,
  setLogicOperatorValueForTaxonomy,
  index,
}) => {
  const handleChangeValueTaxonomy = (e) => {
    setValueTaxonomy(e.target.value);
  };

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
              <InputLabel id="tanoxomy-label">Taxonomy</InputLabel>
              <Select
                labelId="taxonomy-label"
                label="Taxonomy"
                value={valueTaxonomy}
                onChange={handleChangeValueTaxonomy}
              >
                <MenuItem value="taxonomy">Taxonomy</MenuItem>
                <MenuItem value="taxonomy1">Taxonomy1</MenuItem>
                <MenuItem value="taxonomy2">Taxonomy2</MenuItem>
                <MenuItem value="taxonomy3">Taxonomy3</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      ) : (
        <FormControl sx={{ width: "100%" }}>
          <InputLabel id="tanoxomy-label">Taxonomy</InputLabel>
          <Select
            labelId="taxonomy-label"
            label="Taxonomy"
            value={valueTaxonomy}
            onChange={handleChangeValueTaxonomy}
          >
            <MenuItem value="taxonomy">Taxonomy</MenuItem>
            <MenuItem value="taxonomy1">Taxonomy1</MenuItem>
            <MenuItem value="taxonomy2">Taxonomy2</MenuItem>
            <MenuItem value="taxonomy3">Taxonomy3</MenuItem>
          </Select>
        </FormControl>
      )}
    </Grid>
  );
};

export default TaxonomyField;
