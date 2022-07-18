import { Box, Typography } from "@mui/material";

export default function Header() {
  return (
    <>
      <Box>
        <Typography
          textAlign="center"
          color="#2962ff"
          variant="h2"
          fontWeight="bold"
        >
          Peptipedia
        </Typography>
      </Box>
      <Box marginTop={1}>
        <Typography
          variant="subtitle1"
          sx={{ fontStyle: "normal", width: "85%", margin: "auto" }}
          fontSize={24}
          textAlign="center"
        >
          Peptipedia, a user-friendly web application tool to support peptide
          research using bioinformatics and machine learning strategies
        </Typography>
      </Box>
    </>
  );
}
