import Layout from "../components/layout";
import {
  Box,
  Typography,
  Grid,
  TextField,
  FilledInput,
  Stack,
  Tooltip,
  InputAdornment,
  IconButton,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useHandleSection } from "../hooks/useHandleSection";
import { useEffect, useState } from "react";
import { fasta_converter } from "../services/fasta_converter";
import { CopyToClipboard } from "react-copy-to-clipboard";
import toast from "react-hot-toast";
import { downloadFile } from "../helpers/downloadFile";

export default function ConverterFasta() {
  const [sequences, setSequences] = useState<string>("");
  const [newSequences, setNewSequences] = useState<string>("");
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [path, setPath] = useState<string>("");

  useHandleSection({ section: "fasta-converter" });

  const handleCopied = (): void => {
    setShowTooltip(true);
    setCopied(true);
    setTimeout(() => {
      setShowTooltip(false);
      setCopied(false);
    }, 1500);
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      getFasta();
    }, 1000);
    return () => clearTimeout(delay);
  }, [sequences]);

  const getFasta = async (): Promise<void> => {
    try {
      const res = await fasta_converter({ data: sequences });
      const { path, text } = res;
      setNewSequences(text);
      setPath(path);
    } catch (error) {
      toast.error("Error converting fasta");
    }
  };

  return (
    <Layout>
      <>
        <Box>
          <Typography variant="h4" style={{ fontWeight: "bold" }}>
            Fasta Converter
          </Typography>
        </Box>
        <Box marginTop={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <TextField
                fullWidth
                label="Enter sequences"
                multiline
                rows={28}
                value={sequences}
                onChange={(e) => setSequences(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <FilledInput
                fullWidth
                disabled
                multiline
                rows={28}
                value={newSequences}
                endAdornment={
                  <Stack direction="row" spacing={2}>
                    <CopyToClipboard text={newSequences}>
                      <InputAdornment
                        position="end"
                        sx={{
                          display: "flex",
                          alignItems: "end",
                          marginBottom: 75,
                        }}
                      >
                        <Tooltip
                          open={showTooltip}
                          onClick={handleCopied}
                          title={showTooltip ? "Copied sequence" : ""}
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
                        marginTop: 75,
                      }}
                    >
                      <Tooltip title="Download">
                        <span>
                          <IconButton
                            edge="end"
                            disabled={path === "" ? true : false}
                            onClick={() => downloadFile(path)}
                          >
                            <DownloadIcon />
                          </IconButton>
                        </span>
                      </Tooltip>
                    </InputAdornment>
                  </Stack>
                }
              />
            </Grid>
          </Grid>
        </Box>
      </>
    </Layout>
  );
}
