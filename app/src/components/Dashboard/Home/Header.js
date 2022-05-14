import Typography from "@mui/material/Typography";

const Header = () => {
  return (
    <>
      <Typography
        variant="h2"
        style={{ fontWeight: "bold", marginBottom: 8, color: "#2962ff" }}
      >
        Peptipedia
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{ fontStyle: "italic", width: "85%", margin: "auto" }}
        fontSize={20}
      >
        Peptipedia, a user-friendly web application tool to support peptide
        research using bioinformatics and machine learning strategies
      </Typography>
    </>
  );
};

export default Header;
