import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const Contact = () => {
  return (
    <>
      <Grid item lg={12} xs={12}>
        <Typography
          variant="h4"
          style={{ fontWeight: "bold", textAlign: "center" }}
        >
          Contact Us
        </Typography>
        <Grid container spacing={2} sx={{ marginTop: 0 }}>
          <Grid item lg={6} xs={12}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="First and Last Name"
              name="username"
            />
          </Grid>
          <Grid item lg={6} xs={12}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
            />
          </Grid>
          <Grid item lg={12} xs={12}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="subject"
              label="Subject"
              name="subject"
            />
          </Grid>
          <Grid item lg={12} xs={12}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="message"
              label="Message"
              name="message"
              multiline
              rows={6}
            />
          </Grid>
          <Grid item lg={2} xs={12}>
            <Button
              variant="contained"
              size="large"
              sx={{
                width: "100%",
                backgroundColor: "#2962ff",
                ":hover": { backgroundColor: "#2962ff" },
              }}
            >
              Send Email
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Contact;
