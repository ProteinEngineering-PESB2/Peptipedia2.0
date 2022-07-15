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
import { resources, IResource } from "./resources_list";

export default function Resource() {
  const [copiedCite, setCopiedCite] = useState<boolean>(false);
  const [showTooltipCite, setShowTooltipCite] = useState<boolean>(false);

  const handleCopiedCite = () => {
    setCopiedCite(true);
    setShowTooltipCite(true);
    setTimeout(() => {
      setShowTooltipCite(false);
    }, 2000);
  };

  return (
    <>
      <Box>
        <Typography
          variant="h4"
          style={{ fontWeight: "bold", textAlign: "center" }}
        >
          Resources
        </Typography>
      </Box>
      {resources.map((r: IResource) => (
        <Box key={r.title}>
          <Box marginTop={5}>
            <Typography variant="h6" style={{ fontWeight: "bold" }}>
              {r.title}
            </Typography>
          </Box>
          <Box marginTop={2}>
            <FilledInput
              id="filled-multiline-static-cite"
              multiline
              rows={3}
              defaultValue={r.cite}
              fullWidth
              endAdornment={
                <CopyToClipboard text={r.cite}>
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
        </Box>
      ))}
    </>
  );
}
