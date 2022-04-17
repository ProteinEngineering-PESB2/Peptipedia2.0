import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const SequenceField = ({
  index,
  valueSequence,
  handleChangeValueSequence,
  logicOperatorValueForSequence,
  handleChangeLogicOperatorForSequence,
}) => {
  return (
    <>
      <Grid item lg={12} md={12} xs={12}>
        {index === 0 ? (
          <FormControl sx={{ width: "100%" }}>
            <TextField
              label="Enter Amino Acid sequences"
              multiline
              rows={7}
              sx={{ width: "100%" }}
              value={valueSequence}
              onChange={handleChangeValueSequence}
            />
          </FormControl>
        ) : (
          <Grid container spacing={2}>
            <Grid item lg={2.6} xs={4}>
              <Select
                value={logicOperatorValueForSequence}
                onChange={handleChangeLogicOperatorForSequence}
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
                <TextField
                  label="Enter Amino Acid sequences"
                  multiline
                  rows={7}
                  sx={{ width: "100%" }}
                  value={valueSequence}
                  onChange={handleChangeValueSequence}
                />
              </FormControl>
            </Grid>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default SequenceField;
