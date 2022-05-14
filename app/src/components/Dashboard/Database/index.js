import { useEffect } from "react";
import { Grid, Typography, Button, Link, Box, Paper } from "@mui/material";
import axios from "axios";
import { useStateIfMounted } from "use-state-if-mounted";
import DataTable from "../DataTable";
import Tree from "react-d3-tree";

import LoadingButton from "@mui/lab/LoadingButton";
import SnackbarComponent from "../Snackbar";
import CircularLoading from "../CircularLoading";

const Database = () => {
  const [loading, setLoading] = useStateIfMounted(true);
  const [columnsDBStatistics, setColumnsDBStatistics] = useStateIfMounted([]);
  const [dataDBStatistics, setDataDBStatistics] = useStateIfMounted([]);
  const [dataActivities, setDataActivities] = useStateIfMounted([]);
  const [columnsActivities, setColumnsActivities] = useStateIfMounted([]);
  const [dataTree, setDataTree] = useStateIfMounted({});
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
            <Link
              href={res.data.data[i][2]}
              target="_blank"
              sx={{ textDecoration: "none" }}
            >
              {res.data.data[i][0]}
            </Link>,
            res.data.data[i][1],
          ];
          new_data.push(parcial_data);
        }
      }

      setColumnsDBStatistics([res.data.columns[0], res.data.columns[1]]);
      setDataDBStatistics(new_data);
    } catch (error) {
      setSeverity("error");
      setMessage("Service no available");
      setOpen(true);
    }
  };

  const getAllActivities = async () => {
    try {
      const res = await axios.get("/api/get_all_act_statistics/");
      const new_data = [];
      for (let i = 0; i < res.data.data.length; i++) {
        if (res.data.data[i].length === 3) {
          const parcial_data = [res.data.data[i][1], res.data.data[i][2]];
          new_data.push(parcial_data);
        }
      }
      console.log(new_data);
      setDataActivities(new_data);
      setColumnsActivities(["activity", "peptides"]);
    } catch (error) {
      setSeverity("error");
      setMessage("Service no available");
      setOpen(true);
    }
  };

  const getTree = async () => {
    try {
      const res = await axios.get("/api/get_tree/");
      setDataTree(res.data.tree);
    } catch (error) {
      setSeverity("error");
      setMessage("Service no available");
      setOpen(true);
    }
  };

  useEffect(() => {
    getDBStatistics();
    getAllActivities();
    getTree();
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
            {dataTree !== {} && (
              <>
                <Grid item lg={12} md={12} xs={12} sx={{ marginTop: 3 }}>
                  <Typography variant="h6">Activity Tree</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div
                      id="treeWrapper"
                      style={{ width: "100%", height: "40rem" }}
                    >
                      <Tree
                        data={dataTree}
                        orientation="horizontal"
                        initialDepth={1}
                        enableLegacyTransitions={true}
                        translate={{ x: 400, y: 250 }}
                      />
                    </div>
                  </Paper>
                </Grid>
              </>
            )}
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              sx={{ marginTop: 1 }}
            >
              <Grid container spacing={3}>
                {dataDBStatistics.length > 0 && (
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Box sx={{ height: "100%" }}>
                      <DataTable
                        title="Database Statistics"
                        columns={columnsDBStatistics}
                        data={dataDBStatistics}
                      />
                    </Box>
                  </Grid>
                )}
                {dataActivities.length > 0 && (
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Box sx={{ height: "100%" }}>
                      <DataTable
                        title="All Activities"
                        data={dataActivities}
                        columns={columnsActivities}
                      />
                    </Box>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default Database;
