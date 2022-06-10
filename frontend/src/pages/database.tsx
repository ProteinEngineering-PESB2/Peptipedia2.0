import { Backdrop, Box, Button, Stack, Typography } from "@mui/material";
import Layout from "../components/layout";
import { useHandleSection } from "../hooks/useHandleSection";
import { useState } from "react";
import axios from "axios";
import fileDownload from "js-file-download";

export default function Database() {
  const [percentage, setPercentage] = useState<number>(0);
  const [openBackdrop, setOpenBackdrop] = useState<boolean>(false);

  useHandleSection({ section: "database" });

  const downloadFile = async (url: string, name: string): Promise<void> => {
    setOpenBackdrop(true);
    const res = await axios({
      url: url,
      method: "GET",
      responseType: "blob",
      onDownloadProgress: (progressEvent) => {
        let percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setPercentage(percentCompleted);
      },
    });
    fileDownload(res.data, name);
    setOpenBackdrop(false);
  };

  return (
    <Layout>
      <>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openBackdrop}
        >
          <Typography variant="h4">Downloading {percentage}%</Typography>
        </Backdrop>
        <Box>
          <Typography variant="h4" style={{ fontWeight: "bold" }}>
            Peptipedia Database
          </Typography>
        </Box>
        <Box marginTop={3}>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: "#2962ff",
                ":hover": { backgroundColor: "#2962ff" },
              }}
              onClick={() =>
                downloadFile("/files/downloads/dump_csv.zip", "dump_csv.zip")
              }
            >
              Download as CSV
            </Button>
            <Button
              variant="contained"
              size="large"
              onClick={() =>
                downloadFile("/files/downloads/backup_sql.zip", "dump_sql.zip")
              }
              color="warning"
            >
              Download as SQL
            </Button>
            <Button
              variant="contained"
              size="large"
              onClick={() =>
                downloadFile("/files/downloads/dump_fasta.zip", "dump_fasta.zip")
              }
              color="secondary"
            >
              Download as Fasta
            </Button>
          </Stack>
        </Box>
      </>
    </Layout>
  );
}
