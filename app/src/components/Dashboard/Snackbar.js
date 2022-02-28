import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const vertical = "top";
const horizontal = "center";

const SnackbarComponent = ({ open, setOpen, severity, message }) => {

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
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarComponent;
