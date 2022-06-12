import { Backdrop, Stack, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

interface Props {
  open: boolean;
  percentage?: number;
}

export default function BackdropComponent({ open, percentage }: Props) {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <Stack spacing={2} direction="row">
        <CircularProgress color="inherit" />{" "}
        <Typography variant="h4"> {percentage && percentage + "%"}</Typography>
      </Stack>
    </Backdrop>
  );
}
