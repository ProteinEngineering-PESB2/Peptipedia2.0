import { FormControl, Button } from "@mui/material";

export default function ButtonRun() {
  return (
    <FormControl fullWidth sx={{ marginTop: 2 }}>
      <Button
        type="submit"
        variant="contained"
        sx={{
          width: { xl: "12rem" },
          backgroundColor: "#2962ff",
          ":hover": { backgroundColor: "#3A6CF6" },
        }}
        size="medium"
      >
        run
      </Button>
    </FormControl>
  );
}
