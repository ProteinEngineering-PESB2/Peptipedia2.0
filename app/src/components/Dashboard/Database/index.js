import { useCallback, useEffect } from "react";
import { Grid, Typography, Button, Link } from "@mui/material";
import axios from "axios";
import { useStateIfMounted } from "use-state-if-mounted";
import DataTable from "../DataTable";

import LoadingButton from "@mui/lab/LoadingButton";
import SnackbarComponent from "../Snackbar";
import CircularLoading from "../CircularLoading";

const Database = () => {
  const [loading, setLoading] = useStateIfMounted(true);
  const [columnsDBStatistics, setColumnsDBStatistics] = useStateIfMounted([]);
  const [dataDBStatistics, setDataDBStatistics] = useStateIfMounted([]);
  const [open, setOpen] = useStateIfMounted(false);
  const [message, setMessage] = useStateIfMounted("");
  const [severity, setSeverity] = useStateIfMounted("");

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
  const [snackbarFastaSeverity, setSnackbarFastaSeverity] =
    useStateIfMounted("");

  const getDBStatistics = async () => {
    try {
      const res = await axios.get("/api/get_db_statistics/");

      const new_data = [];
      for (let i = 0; i < res.data.data.length; i++) {
        if (res.data.data[i].length === 3) {
          const parcial_data = [
            res.data.data[i][0],
            res.data.data[i][1],
            <Link href={res.data.data[i][2]} target="_blank">
              {res.data.data[i][2]}
            </Link>,
          ];
          new_data.push(parcial_data);
        }
      }

      setColumnsDBStatistics(res.data.columns);
      setDataDBStatistics(new_data);
    } catch (error) {
      setSeverity("error");
      setMessage("Service no available");
      setOpen(true);
    }
  };

  useEffect(() => {
    getDBStatistics();
    setLoading(false);
  }, []);

  const downloadZIP = async () => {
    try {
      setLoadingZIP(true);
      setSnackbarZIPSeverity("success");
      setSnackbarZIPMessage(
        "The download has started. You can continue using our services. Do not close the page"
      );
      setOpenSnackbarZIP(true);
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
      setSnackbarSQLMessage(
        "The download has started. You can continue using our services. Do not close the page"
      );
      setOpenSnackbarSQL(true);
      const res = await axios.get("/files/downloads/backup_sql.zip", {
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
      setSnackbarFastaSeverity("success");
      setSnackbarFastaMessage(
        "The download has started. You can continue using our services. Do not close the page"
      );
      setOpenSnackbarFasta(true);
      const res = await axios.get("/files/downloads/dump_fasta.zip", {
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
      {loading ? (
        <CircularLoading />
      ) : (
        <>
          <Grid container spacing={2}>
            {message.length > 0 && (
              <SnackbarComponent
                open={open}
                setOpen={setOpen}
                message={message}
                severity={severity}
              />
            )}
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
              <Typography variant="h6">Download Database</Typography>
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
            <Grid item lg={12} md={12} xs={12}>
              <Typography variant="h6">Database Statistics</Typography>
            </Grid>
            <Grid item lg={12} md={12} xs={12}>
              <DataTable
                title="Database Statistics"
                columns={columnsDBStatistics}
                data={dataDBStatistics}
              />
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default Database;
