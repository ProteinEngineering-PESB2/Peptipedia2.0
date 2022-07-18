import Layout from "../components/layout";

import Header from "../components/home/header";
import About from "../components/home/about";
import { useHandleSection } from "../hooks/useHandleSection";
import useLoadingComponent from "../hooks/useLoadingComponent";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import StorageIcon from "@mui/icons-material/Storage";
import { grey } from "@mui/material/colors";

export default function Home() {
  useHandleSection({ section: "home" });
  useLoadingComponent();
  const theme = useTheme();

  return (
    <Layout>
      <>
        <Header />

        <Grid container spacing={2} sx={{ marginTop: 5 }}>
          <Grid item xl={3}>
            <Card variant="outlined" sx={{ boxShadow: 1 }}>
              <CardContent>
                <Box
                  height="100%"
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-around",
                    border: 2
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "end",
                      border: 2
                    }}
                  >
                    <Typography fontWeight="bold">30</Typography>
                    <Typography>Databases</Typography>
                  </Box>
                  <Box sx={{ border: 2 }}>
                    asd
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* <About /> */}
      </>
    </Layout>
  );
}
