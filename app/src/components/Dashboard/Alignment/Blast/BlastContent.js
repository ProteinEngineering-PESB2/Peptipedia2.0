import axios from "axios";
import { useState, forwardRef, useEffect, useRef } from "react";

import { useStateIfMounted } from "use-state-if-mounted";
import { ProSeqViewer } from "proseqviewer/dist";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import LoadingButton from "@mui/lab/LoadingButton";

import CircularLoading from "../../CircularLoading";
import DataTable from "../../DataTable";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import { Box } from "@mui/material";

const options = {
  sequenceColor: "clustal",
};

const ComponentPrint = forwardRef((props, ref) => (
  <div id="psv" ref={ref}></div>
));

const BlastContent = ({ data, setError, setSeverity, setOpenSnackbar }) => {
  const [loading, setLoading] = useStateIfMounted(true);
  const [loadingButton, setLoadingButton] = useState(false);
  const [dataTable, setDataTable] = useState([]);
  const [columnsTable, setColumnsTable] = useState([]);
  const [loadingPSV, setLoadingPSV] = useState(null);

  const componentRef = useRef();

  const alignment = (id) => {
    setLoadingPSV(true);
    const psv = new ProSeqViewer("psv");
    psv.draw({ sequences: data.aligns[id], options });
    setLoadingPSV(false);
  };

  const parseData = () => {
    const new_data_table = [];
    for (let i = 0; i < data.table.data.length; i++) {
      const new_data = [
        ...data.table.data[i],
        <Button onClick={() => alignment(data.table.data[i][0])}>
          <FormatAlignCenterIcon />
        </Button>,
      ];
      new_data_table.push(new_data);
    }
    const new_columns = [...data.table.columns, "Alignment"];
    setColumnsTable(new_columns);
    setDataTable(new_data_table);
  };

  useEffect(() => {
    setLoading(true);
    parseData();
    alignment(data.table.data[0][0]);
    setLoading(false);
  }, []);

  const downloadBlast = async () => {
    setLoadingButton(true);
    try {
      const res = await axios.get(data.path, {
        responseType: "blod",
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "blast.txt");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

      setSeverity("success");
      setError("Download completed");
      setOpenSnackbar(true);
      setLoadingButton(false);
    } catch (error) {
      setSeverity("error");
      setError("Service not available");
      setOpenSnackbar(true);
      setLoadingButton(false);
    }
  };

  return (
    <>
      {loading ? (
        <CircularLoading />
      ) : (
        <Grid item lg={12} md={12} xs={12}>
          <Grid
            item
            xl={2.05}
            lg={2.05}
            md={2.65}
            sm={4.15}
            xs={12}
            sx={{ marginBottom: 3 }}
          >
            {loadingButton ? (
              <LoadingButton
                loading
                variant="contained"
                color="primary"
                size="medium"
                sx={{ width: "100%" }}
              >
                Loading{" "}
              </LoadingButton>
            ) : (
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#2962ff",
                  ":hover": { backgroundColor: "#2962ff" },
                  width: "100%",
                }}
                onClick={downloadBlast}
              >
                Download Blast
              </Button>
            )}
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            sx={{ marginTop: 4 }}
          >
            <DataTable
              title="Blast Alignment"
              columns={columnsTable}
              data={dataTable}
            />
          </Grid>
          <Grid sx={{ marginTop: 4 }}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <ComponentPrint ref={componentRef} />
            </Paper>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default BlastContent;
