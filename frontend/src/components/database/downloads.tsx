import { Box, Stack, Button } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { downloadFile } from "../../helpers/downloadFile";

interface Props {
  setOpenBackdrop: Dispatch<SetStateAction<boolean>>;
  setPercentage: Dispatch<SetStateAction<number>>;
}

export default function Downloads({ setOpenBackdrop, setPercentage }: Props) {
  return (
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
            downloadFile({
              url: "/files/downloads/dump_csv.zip",
              name: "dump_csv.zip",
              setOpenBackdrop: setOpenBackdrop,
              setPercentage: setPercentage,
            })
          }
        >
          Download as CSV
        </Button>
        <Button
          variant="contained"
          size="large"
          onClick={() =>
            downloadFile({
              url: "/files/downloads/backup_sql.zip",
              name: "dump_sql.zip",
              setOpenBackdrop: setOpenBackdrop,
              setPercentage: setPercentage,
            })
          }
          color="warning"
        >
          Download as SQL
        </Button>
        <Button
          variant="contained"
          size="large"
          onClick={() =>
            downloadFile({
              url: "/files/downloads/dump_fasta.zip",
              name: "dump_fasta.zip",
              setOpenBackdrop: setOpenBackdrop,
              setPercentage: setPercentage,
            })
          }
          color="secondary"
        >
          Download as Fasta
        </Button>
      </Stack>
    </Box>
  );
}
