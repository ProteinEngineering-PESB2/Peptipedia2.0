import { useState } from "react";

import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import LoadingButton from "@mui/lab/LoadingButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import SaveIcon from "@mui/icons-material/Save";

import { codificationForText } from "../../../services/codifications";

const Form = ({ setFileName }) => {
  const [textInput, setTextInput] = useState();
  const [oneHotEncodingCheckbox, setOneHotEncodingCheckbox] = useState(true);
  const [
    phisicochemicalPropertiesCheckbox,
    setPhisicochemicalPropertiesCheckbox,
  ] = useState(true);
  const [digitalSignalProcessingCheckbox, setDigitalSignalProcessingCheckbox] =
    useState(true);
  const [loading, setLoading] = useState(false);

  const handleChangeTextInput = (e) => {
    setTextInput(e.target.value);
  };

  const handleChangeOneHotEncodingCheckbox = (e) => {
    setOneHotEncodingCheckbox(e.target.checked);
  };

  const handleChangePhisicochemicalPropertiesCheckbox = (e) => {
    setPhisicochemicalPropertiesCheckbox(e.target.checked);
  };

  const handleChangeDigitalSignalProcessingCheckbox = (e) => {
    setDigitalSignalProcessingCheckbox(e.target.checked);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const post = {
      data: textInput,
      options: {
        one_hot_encoding: oneHotEncodingCheckbox,
        phisicochemical_properties: phisicochemicalPropertiesCheckbox,
        digital_signal_processing: digitalSignalProcessingCheckbox,
      },
    };

    const res = await codificationForText(post);

    setFileName(res);
    setLoading(false);
  };

  return (
    <form onSubmit={onSubmit}>
      <Grid container spcaing={2}>
        <Grid item xs={12}>
          <TextField
            label="Enter Amino Acid sequences"
            multiline
            rows={5}
            sx={{ width: "100%" }}
            onChange={handleChangeTextInput}
          />
        </Grid>
        <Grid item xs={12}>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={oneHotEncodingCheckbox}
                  onChange={handleChangeOneHotEncodingCheckbox}
                />
              }
              label="One Hot Encoding"
            ></FormControlLabel>
          </FormGroup>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={phisicochemicalPropertiesCheckbox}
                  onChange={handleChangePhisicochemicalPropertiesCheckbox}
                />
              }
              label="Phisicochemical Properties"
            ></FormControlLabel>
          </FormGroup>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={digitalSignalProcessingCheckbox}
                  onChange={handleChangeDigitalSignalProcessingCheckbox}
                />
              }
              label="Digital Signal Processing"
            ></FormControlLabel>
          </FormGroup>
        </Grid>
        <Grid item xs={12} sx={{ marginTop: 2 }}>
          {loading ? (
            <Stack direction="row" spacing={2}>
              <LoadingButton
                loading
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                loadingPosition="start"
              >
                Loading...
              </LoadingButton>
            </Stack>
          ) : (
            <Button type="submit" variant="contained">
              Run Codifications
            </Button>
          )}
        </Grid>
      </Grid>
    </form>
  );
};

export default Form;
