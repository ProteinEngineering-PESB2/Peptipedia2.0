import { useStateIfMounted } from "use-state-if-mounted"

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import CodificationForm from "./CodificationForm";
import Snackbar from "../Snackbar";

const Codification = () => {
  const [openSnackbar, setOpenSnackbar] = useStateIfMounted(false);
  const [message, setMessage] = useStateIfMounted("");
  const [severity, setSeverity] = useStateIfMounted("");

  return (
    <>
      <Grid container spacing={5} sx={{ marginTop: 4 }}>
        {message.length > 0 && (
          <Snackbar
            open={openSnackbar}
            setOpen={setOpenSnackbar}
            message={message}
            severity={severity}
          />
        )}
        <Grid item lg={12} md={12} xs={12}>
          <Typography variant="h4">Encodings</Typography>
        </Grid>
        <Grid item lg={12} md={12} xs={12}>
          <CodificationForm
            setOpenSnackbar={setOpenSnackbar}
            setMessage={setMessage}
            setSeverity={setSeverity}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ marginTop: 3 }}></Grid>
    </>
  );
};

export default Codification;
