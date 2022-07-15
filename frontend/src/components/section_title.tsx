import { Typography } from "@mui/material";

interface Props {
  title: string;
  description: string
}

export default function SectionTitle({ title, description }: Props) {
  return (
    <>
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
    <Typography
      variant="h6"
      sx={{
        textAlign: {
          xs: "center",
          sm: "start",
          md: "start",
          lg: "start",
          xl: "start",
        },
        marginTop: 1,
        fontWeight: "400"
      }}
    >
      {description}
    </Typography>
    </>
  );
}
