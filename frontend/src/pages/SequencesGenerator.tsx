import {
  Box,
  Button,
  FilledInput,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react";
import Layout from "../components/layout";
import SectionTitle from "../components/section_title";
import { useHandleSection } from "../hooks/useHandleSection";
import useLoadingComponent from "../hooks/useLoadingComponent";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { sequences_model } from "./sequences_model";
import toast from "react-hot-toast";

function SequencesGenerator() {
  console.log(sequences_model.length);
  useHandleSection({ section: "test-sequences" });
  useLoadingComponent();

  const [sequencesAmount, setSequencesAmount] = useState("20");
  const [sequences, setSequences] = useState<string>("");
  const [colorIcon, setColorIcon] = useState(false);

  const generate_sequences = () => {
    if (parseInt(sequencesAmount) < 1 || parseInt(sequencesAmount) > 20) {
      toast.error("Quantity admitted between 1 and 20.");
      setSequencesAmount("20");
      return;
    }

    let new_sequence = "";
    for (let i = 0; i < parseInt(sequencesAmount); i++) {
      new_sequence += sequences_model[i] + "\n";
    }
    setSequences(new_sequence);
  };

  useEffect(() => {
    generate_sequences();
  }, []);

  return (
    <Layout>
      <div>
        <SectionTitle title="Test Sequences" description="" />

        <Grid container spacing={2}>
          <Grid item xl={2}>
            <TextField
              title="Sequences Amount"
              value={sequencesAmount}
              onChange={(e) => setSequencesAmount(e.target.value)}
            />
          </Grid>
          <Grid item xl={2}>
            <Button
              variant="outlined"
              sx={{ height: "100%" }}
              color="success"
              disabled={sequencesAmount === "" ? true : false}
              onClick={generate_sequences}
            >
              Generate
            </Button>
          </Grid>
        </Grid>

        <Box marginTop={3}>
          <FilledInput
            disabled
            multiline
            rows={28}
            fullWidth
            value={sequences}
            endAdornment={
              <Stack direction="row" spacing={2}>
                <CopyToClipboard text={sequences}>
                  <InputAdornment
                    position="end"
                    sx={{
                      display: "flex",
                      alignItems: "end",
                      marginBottom: 75,
                    }}
                  >
                    <Tooltip title="Copy Sequences">
                      <IconButton
                        edge="end"
                        disabled={sequences === "" ? true : false}
                        onClick={() => setColorIcon(true)}
                      >
                        <ContentCopyIcon
                          color={colorIcon ? "primary" : "inherit"}
                        />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                </CopyToClipboard>
              </Stack>
            }
          />
        </Box>
      </div>
    </Layout>
  );
}

export default SequencesGenerator;
