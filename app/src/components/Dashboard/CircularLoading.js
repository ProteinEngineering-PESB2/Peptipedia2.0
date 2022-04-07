import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";

const CircularLoading = () => {
  return (
    <>
      <Grid item lg={12} md={12} xs={12}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress sx={{ color: "#2962ff" }} />
        </Box>
      </Grid>
    </>
  );
};

export default CircularLoading;
