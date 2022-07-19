import { Box, Button, Typography } from "@mui/material";
import useLoadingComponent from "../hooks/useLoadingComponent";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  useLoadingComponent();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h1" fontWeight="400" marginBottom={4}>
          404 - Page Not Found
        </Typography>
        <Button variant="contained" onClick={() => navigate("/")} size="large">
          Go to Peptipedia
        </Button>
      </Box>
    </Box>
  );
}
