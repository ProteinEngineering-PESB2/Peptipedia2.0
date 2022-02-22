import { useState } from "react";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import LoadingButton from "@mui/lab/LoadingButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import SaveIcon from "@mui/icons-material/Save";

import { pfam } from "../../../../services/characterizations"

const Form = ({ setData }) => {
  const [textInput, setTextInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangeTextInput = (e) => {
    setTextInput(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const post = {
      "data": textInput,
    };

    const res = await pfam(post)

    setData(res)

    setLoading(false);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Enter Amino Acid sequences"
              multiline
              rows={5}
              sx={{ width: "100%" }}
              onChange={handleChangeTextInput}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
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
                run characterization
              </Button>
            )}
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default Form;
