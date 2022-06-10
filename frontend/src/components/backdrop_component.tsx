import { Backdrop, Typography } from "@mui/material";

interface Props {
  open: boolean;
  percentage: number;
}

export default function BackdropComponent({ open, percentage }: Props) {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <Typography variant="h4">Downloading {percentage}%</Typography>
    </Backdrop>
  );
}
