import { Box, Paper } from "@mui/material";
import { ReactElement } from "react";

interface Props {
  children: ReactElement;
}

export default function FormContainer({ children }: Props) {
  return (
    <Box marginTop={3} boxShadow={4}>
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </Paper>
    </Box>
  );
}
