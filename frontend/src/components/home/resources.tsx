import {
  FilledInput,
  Typography,
  InputAdornment,
  Tooltip,
  IconButton,
  Box,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

const cite =
  "Quiroz C, Saavedra YB, Armijo-Galdames B, Amado-Hinojosa J, Olivera-Nappa Á, Sanchez-Daza A, Medina-Ortiz D. Peptipedia: a user-friendly web application and a comprehensive database for peptide research supported by Machine Learning approach. Database (Oxford). 2021 Sep 3;2021:baab055. doi: 10.1093/database/baab055. PMID: 34478499; PMCID: PMC8415426.";

export default function Resource() {
  const [copiedCite, setCopiedCite] = useState(false);
  const [showTooltipCite, setShowTooltipCite] = useState(false);

  const handleCopiedCite = () => {
    setCopiedCite(true);
    setShowTooltipCite(true);
    setTimeout(() => {
      setShowTooltipCite(false);
    }, 2000);
  };

  return (
    <>
      <Box marginTop={8}>
        <Typography
          variant="h4"
          style={{ fontWeight: "bold", textAlign: "center" }}
        >
          Resources
        </Typography>
      </Box>
      <Box marginTop={5}>
        <Typography variant="h6" style={{ fontWeight: "bold" }}>
          How to cite
        </Typography>
      </Box>
      <Box marginTop={2}>
        <FilledInput
          id="filled-multiline-static-cite"
          multiline
          rows={3}
          defaultValue={cite}
          fullWidth
          endAdornment={
            <CopyToClipboard text={cite}>
              <InputAdornment
                position="end"
                sx={{ display: "flex", alignItems: "end", marginBottom: 1 }}
              >
                <Tooltip
                  title={showTooltipCite ? "Copied cite" : ""}
                  onClick={handleCopiedCite}
                  open={showTooltipCite}
                >
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
      </Box>
    </>
  );
}
