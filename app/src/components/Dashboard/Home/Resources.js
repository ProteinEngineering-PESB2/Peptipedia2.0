import {
  FilledInput,
  Grid,
  Typography,
  InputAdornment,
  Tooltip,
  IconButton,
} from "@mui/material";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useState } from "react";
import SnackbarComponent from "../Snackbar";

const cite =
  "Quiroz C, Saavedra YB, Armijo-Galdames B, Amado-Hinojosa J, Olivera-Nappa Á, Sanchez-Daza A, Medina-Ortiz D. Peptipedia: a user-friendly web application and a comprehensive database for peptide research supported by Machine Learning approach. Database (Oxford). 2021 Sep 3;2021:baab055. doi: 10.1093/database/baab055. PMID: 34478499; PMCID: PMC8415426.";

const repository = "https://github.com/ProteinEngineering-PESB2/Peptipedia2.0";

export default function Resources() {
  const [copiedCite, setCopiedCite] = useState(false);
  const [copiedRepository, setCopiedRepository] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");

  const handleCopiedCite = () => {
    setCopiedCite(true);
    setMessage("Copied cite");
    setSeverity("success");
    setOpenSnackbar(true);
  };

  const handleCopiedRepository = () => {
    setCopiedRepository(true);
    setMessage("Copied repository");
    setSeverity("success");
    setOpenSnackbar(true);
  };

  return (
    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
      {message.length > 0 && (
        <SnackbarComponent
          open={openSnackbar}
          setOpen={setOpenSnackbar}
          message={message}
          severity={severity}
        />
      )}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Typography
            variant="h4"
            style={{ fontWeight: "bold", textAlign: "center" }}
          >
            Resources
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            How to cite
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <FilledInput
            id="filled-multiline-static-cite"
            multiline
            rows={3}
            defaultValue={cite}
            variant="filled"
            fullWidth
            endAdornment={
              <CopyToClipboard text={cite}>
                <InputAdornment
                  position="end"
                  sx={{ display: "flex", alignItems: "end", marginBottom: 1 }}
                >
                  <Tooltip title="Copy" onClick={handleCopiedCite}>
                    <IconButton edge="end">
                      <ContentCopyIcon
                        color={copiedCite ? "primary" : "inherit"}
                      />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              </CopyToClipboard>
            }
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            Github Repository
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <FilledInput
            id="filled-multiline-static-repository"
            multiline
            rows={1}
            defaultValue={repository}
            variant="filled"
            fullWidth
            endAdornment={
              <CopyToClipboard text={repository}>
                <InputAdornment
                  position="end"
                  sx={{ display: "flex", alignItems: "end", marginTop: 2 }}
                >
                  <Tooltip title="Copy" onClick={handleCopiedRepository}>
                    <IconButton edge="end">
                      <ContentCopyIcon
                        color={copiedRepository ? "primary" : "inherit"}
                      />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              </CopyToClipboard>
            }
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
