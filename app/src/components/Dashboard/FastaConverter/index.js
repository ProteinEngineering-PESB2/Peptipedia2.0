import {
  Grid,
  TextField,
  Typography,
  Paper,
  FilledInput,
  InputAdornment,
  Tooltip,
  IconButton,
  Stack,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DownloadIcon from "@mui/icons-material/Download";
import SnackbarComponent from "../Snackbar";
import { useStateIfMounted } from "use-state-if-mounted";

export default function FastaConverter() {
  const [sequences, setSequences] = useState("");
  const [newSequences, setNewSequences] = useState("");
  const [copied, setCopied] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [path, setPath] = useState("");
  const [openSnackbar, setOpenSnackbar] = useStateIfMounted(false);
  const [snackbarMessage, setSnackbarMessage] = useStateIfMounted("");
  const [snackbarSeverity, setSnackbarSeverity] = useStateIfMounted("");

  const handleCopied = () => {
    setCopied(true);
    setShowTooltip(true);
    setTimeout(() => {
      setShowTooltip(false);
    }, 2000);
  };

  const downloadFasta = async () => {
    try {
      const res = await axios.get(path, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "data.fasta");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Error downloading fasta");
      setOpenSnackbar(true);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      getFasta(sequences)
    }, 1000)
    return () => clearTimeout(delay)
  }, [sequences])

  const getFasta = async (sequences) => {
    try {
      const post = {
        data: sequences,
      };
      const res = await axios.post("/api/fasta_convertor/", post);
      setNewSequences(res.data.text);
      setPath(res.data.path);
      setCopied(false);
      setShowTooltip(false);
    } catch (error) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Error converting to fasta");
      setOpenSnackbar(true);
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        {snackbarMessage.length > 0 && (
          <SnackbarComponent
            open={openSnackbar}
            setOpen={setOpenSnackbar}
            message={snackbarMessage}
            severity={snackbarSeverity}
          />
        )}
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Typography variant="h4" style={{ fontWeight: "bold" }}>
            Fasta convertor
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <TextField
                  fullWidth
                  label="Enter sequences"
                  multiline
                  rows={30}
                  value={sequences}
                  onChange={(e) => setSequences(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <FilledInput
                  fullWidth
                  disabled
                  multiline
                  rows={30}
                  value={newSequences}
                  variant="filled"
                  endAdornment={
                    <Stack direction="row" spacing={2}>
                      <CopyToClipboard text={newSequences}>
                        <InputAdornment
                          position="end"
                          sx={{
                            display: "flex",
                            alignItems: "end",
                            marginBottom: 80,
                          }}
                        >
                          <Tooltip
                            title={showTooltip ? "Copied sequence" : ""}
                            onClick={handleCopied}
                            open={showTooltip}
                          >
                            <IconButton
                              edge="end"
                              disabled={newSequences === "" ? true : false}
                            >
                              <ContentCopyIcon
                                color={copied ? "primary" : "inherit"}
                              />
                            </IconButton>
                          </Tooltip>
                        </InputAdornment>
                      </CopyToClipboard>
                      <InputAdornment
                        position="end"
                        sx={{
                          display: "flex",
                          alignItems: "end",
                          marginBottom: 80,
                        }}
                      >
                        <Tooltip title="Download">
                          <IconButton
                            edge="end"
                            onClick={downloadFasta}
                            disabled={path === "" ? true : false}
                          >
                            <DownloadIcon />
                          </IconButton>
                        </Tooltip>
                      </InputAdornment>
                    </Stack>
                  }
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
