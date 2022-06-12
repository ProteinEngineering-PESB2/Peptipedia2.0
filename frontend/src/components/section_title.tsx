import { Typography } from "@mui/material";

interface Props {
  title: string;
}

export default function SectionTitle({ title }: Props) {
  return (
    <Typography
      variant="h4"
      style={{ fontWeight: "bold" }}
      sx={{
        textAlign: {
          xs: "center",
          sm: "start",
          md: "start",
          lg: "start",
          xl: "start",
        },
      }}
    >
      {title}
    </Typography>
  );
}
