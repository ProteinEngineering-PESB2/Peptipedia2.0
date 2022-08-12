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
import { useState } from "react";
import toast from "react-hot-toast";
import BackdropComponent from "../components/backdrop_component";
import Layout from "../components/layout";
import SectionTitle from "../components/section_title";
import { useHandleSection } from "../hooks/useHandleSection";
import useLoadingComponent from "../hooks/useLoadingComponent";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const aminoacids = [
  "A",
  "R",
  "N",
  "D",
  "C",
  "Q",
  "E",
  "G",
  "H",
  "I",
  "L",
  "K",
  "M",
  "F",
  "P",
  "S",
  "T",
  "W",
  "Y",
  "V",
];

function SequencesGenerator() {
  useHandleSection({ section: "sequence-generator" });
  useLoadingComponent();

  const [sequencesAmount, setSequencesAmount] = useState<string>("100");
  const [sequencesLength, setSequencesLength] = useState<string>("50");
  const [sequences, setSequences] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [colorIcon, setColorIcon] = useState(false);

  const generateSequences = () => {
    setLoading(true);

    const amount = parseInt(sequencesAmount);
    const length = parseInt(sequencesLength);

    if (!amount || !length) {
      toast.error("Enter valid values", {
        duration: 5000,
      });

      setSequencesAmount("100");
      setSequencesLength("50");
      setLoading(false);
      setSequences("");

      return;
    }

    if (amount < 1) {
      toast.error(
        "The number of sequences must be greater than or equal to 1.",
        {
          duration: 5000,
        }
      );

      setSequencesAmount("100");
      setSequencesLength("50");
      setLoading(false);
      setSequences("");

      return;
    }

    if (length > 50 || length < 1) {
      toast.error("The length should be between 1 and 50.", {
        duration: 5000,
      });

      setSequencesAmount("100");
      setSequencesLength("50");
      setLoading(false);
      setSequences("");

      return;
    }

    let new_sequences = "";
    for (let i = 0; i < amount; i++) {
      let generated_sequence = "";

      for (let j = 0; j < length; j++) {
        const random = Math.floor(Math.random() * aminoacids.length);
        const random_aminoacid = aminoacids[random];
        generated_sequence += random_aminoacid;
      }

      new_sequences += `>sequence_${i + 1}\n${generated_sequence}\n`;
    }

    setSequences(new_sequences);

    setLoading(false);
  };

  return (
    <Layout>
      <div>
        <BackdropComponent open={loading} />

        <SectionTitle title="Sequence Generator" description="" />

        <Box marginTop={3}>
          <Grid container spacing={2}>
            <Grid item xl={2}>
              <TextField
                label="Sequences Amount"
                value={sequencesAmount}
                onChange={(e) => setSequencesAmount(e.target.value)}
              />
            </Grid>
            <Grid item xl={2}>
              <TextField
                label="Sequences Lenght"
                value={sequencesLength}
                onChange={(e) => setSequencesLength(e.target.value)}
              />
            </Grid>
            <Grid item xl={2}>
              <Button
                variant="outlined"
                color="success"
                sx={{ height: "100%" }}
                disabled={
                  sequencesAmount === "" || (sequencesLength === "" && true)
                }
                onClick={generateSequences}
              >
                Generate
              </Button>
            </Grid>
          </Grid>
        </Box>

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
