import { Grid, Typography, Button } from "@mui/material";
import axios from "axios";
import { useStateIfMounted } from "use-state-if-mounted"

import LoadingButton from "@mui/lab/LoadingButton";
import SnackbarComponent from "../Snackbar";

const Database = () => {
  const [loadingZIP, setLoadingZIP] = useStateIfMounted(false);
  const [loadingSQL, setLoadingSQL] = useStateIfMounted(false);
  const [loadingFasta, setLoadingFasta] = useStateIfMounted(false);

  const [openSnackbarZIP, setOpenSnackbarZIP] = useStateIfMounted(false);
  const [snackbarZIPMessage, setSnackbarZIPMessage] = useStateIfMounted("");
  const [snackbarZIPSeverity, setSnackbarZIPSeverity] = useStateIfMounted("");

  const [openSnackbarSQL, setOpenSnackbarSQL] = useStateIfMounted(false);
  const [snackbarSQLMessage, setSnackbarSQLMessage] = useStateIfMounted("");
  const [snackbarSQLSeverity, setSnackbarSQLSeverity] = useStateIfMounted("");

  const [openSnackbarFasta, setOpenSnackbarFasta] = useStateIfMounted(false);
  const [snackbarFastaMessage, setSnackbarFastaMessage] = useStateIfMounted("");
  const [snackbarFastaSeverity, setSnackbarFastaSeverity] = useStateIfMounted("");

  const downloadZIP = async () => {
    try {
      setLoadingZIP(true);
      const res = await axios.get("/files/downloads/dump_csv.zip", {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "database.zip");
      document.body.appendChild(link);
      link.click();

      setSnackbarZIPSeverity("success");
      setSnackbarZIPMessage("Database downloaded (ZIP)");
      setOpenSnackbarZIP(true);
      setLoadingZIP(false);
    } catch (error) {
      setSnackbarZIPSeverity("error");
      setSnackbarZIPMessage("Error downloading database (ZIP)");
      setOpenSnackbarZIP(true);
      setLoadingZIP(false);
    }
  };

  const downloadSQL = async () => {
    try {
      setLoadingSQL(true);
      setSnackbarSQLSeverity("success");
      setSnackbarSQLMessage("The download has started. You can continue using our services. Do not close the page");
      setOpenSnackbarSQL(true);
      const res = await axios.get("/files/downloads/backup.sql", {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "database.sql");
      document.body.appendChild(link);
      link.click();

      setSnackbarSQLSeverity("success");
      setSnackbarSQLMessage("Database downloaded (SQL)");
      setOpenSnackbarSQL(true);
      setLoadingSQL(false);
    } catch (error) {
      setSnackbarSQLSeverity("error");
      setSnackbarSQLMessage("Error downloading database (SQL)");
      setOpenSnackbarSQL(true);
      setLoadingSQL(false);
    }
  };

  const downloadFasta = async () => {
    try {
      setLoadingFasta(true);
      const res = await axios.get("/files/downloads/dump.fasta", {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "database.fasta");
      document.body.appendChild(link);
      link.click();

      setSnackbarFastaSeverity("success");
      setSnackbarFastaMessage("Database downloaded (Fasta)");
      setOpenSnackbarFasta(true);
      setLoadingFasta(false);
    } catch (error) {
      setSnackbarFastaSeverity("error");
      setSnackbarFastaMessage("Error downloading database (Fasta)");
      setOpenSnackbarFasta(true);
      setLoadingFasta(false);
    }
  };

  return (
    <>
      <Grid container spacing={5} sx={{ marginTop: 2 }}>
        {snackbarZIPMessage.length > 0 && (
          <SnackbarComponent
            open={openSnackbarZIP}
            setOpen={setOpenSnackbarZIP}
            message={snackbarZIPMessage}
            severity={snackbarZIPSeverity}
          />
        )}
        {snackbarSQLMessage.length > 0 && (
          <SnackbarComponent
            open={openSnackbarSQL}
            setOpen={setOpenSnackbarSQL}
            message={snackbarSQLMessage}
            severity={snackbarSQLSeverity}
            time={20000}
          />
        )}
        {snackbarFastaMessage.length > 0 && (
          <SnackbarComponent
            open={openSnackbarFasta}
            setOpen={setOpenSnackbarFasta}
            message={snackbarFastaMessage}
            severity={snackbarFastaSeverity}
          />
        )}
        <Grid item lg={12} md={12} xs={12}>
          <Typography variant="h4" style={{ fontWeight: "bold" }}>
            Peptipedia Database
          </Typography>
        </Grid>
        <Grid item lg={12} md={12} xs={12}>
          <p className="lead" style={{ textAlign: "justify" }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
            <br></br>
            <br></br>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </Grid>
        <Grid item lg={2.6} md={3.5} sm={4} xs={12}>
          {loadingZIP ? (
            <LoadingButton
              loading
              variant="contained"
              sx={{ width: "100%" }}
              size="medium"
            >
              Loading{" "}
            </LoadingButton>
          ) : (
            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: "#2962ff",
                width: "100%",
                ":hover": { backgroundColor: "#2962ff" },
              }}
              onClick={downloadZIP}
            >
              Download as CSV
            </Button>
          )}
        </Grid>
        <Grid item lg={2.6} md={3.5} sm={4} xs={12}>
          {loadingSQL ? (
            <LoadingButton
              loading
              variant="contained"
              sx={{ width: "100%" }}
              size="medium"
            >
              Loading{" "}
            </LoadingButton>
          ) : (
            <Button
              variant="contained"
              size="large"
              color="warning"
              sx={{ width: "100%" }}
              onClick={downloadSQL}
            >
              Download as SQL
            </Button>
          )}
        </Grid>
        <Grid item lg={2.6} md={3.5} sm={4} xs={12}>
          {loadingFasta ? (
            <LoadingButton
              loading
              variant="contained"
              sx={{ width: "100%" }}
              size="medium"
            >
              Loading{" "}
            </LoadingButton>
          ) : (
            <Button
              variant="contained"
              size="large"
              color="secondary"
              sx={{ width: "100%" }}
              onClick={downloadFasta}
            >
              Download as Fasta
            </Button>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Database;
