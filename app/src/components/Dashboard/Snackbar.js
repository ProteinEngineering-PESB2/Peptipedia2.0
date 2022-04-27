import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography"

const vertical = "top";
const horizontal = "center";

const SnackbarComponent = ({ open, setOpen, severity, message, time }) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical, horizontal }}
      key={vertical + horizontal}
      autoHideDuration={time ? time : 8000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        <Typography sx={{ fontWeight: "bold", fontSize: "1.07rem" }}>{message}</Typography>
      </Alert>
    </Snackbar>
  );
};

export default SnackbarComponent;
