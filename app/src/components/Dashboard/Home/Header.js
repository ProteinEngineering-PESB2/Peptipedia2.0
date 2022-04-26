import Typography from "@mui/material/Typography";

const Header = () => {
  return (
    <>
      <Typography variant="h2" style={{ fontWeight: "bold", marginBottom: 8, color: "#2962ff" }}>
        Peptipedia
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{ fontStyle: "italic", width: "85%", margin: "auto" }}
      >
        Lorem Ipsum has been the industry's standard dummy text ever since the
        1500s, when an unknown printer took a galley of type and scrambled it to
        make a type specimen book.
      </Typography>
    </>
  );
};

export default Header;
