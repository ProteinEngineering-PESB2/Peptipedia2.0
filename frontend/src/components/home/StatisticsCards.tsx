import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import StorageIcon from "@mui/icons-material/Storage";
import axios from "axios";
import { useEffect, useState } from "react";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import BiotechIcon from "@mui/icons-material/Biotech";
import UpdateIcon from "@mui/icons-material/Update";

export default function StatisticsCards() {
  const [dataCards, setDataCards] = useState<any>(null);

  const getDataCards = async () => {
    try {
      const response = await axios.get("/api/get_general_counts/");
      console.log(response.data);
      setDataCards(response.data);
    } catch (error) {
      setDataCards(null);
    }
  };

  useEffect(() => {
    getDataCards();
  }, []);

  return (
    <>
      {dataCards && (
        <Grid container spacing={2} sx={{ marginTop: 5 }}>
          <Grid item xl={3}>
            <Card variant="outlined" sx={{ boxShadow: 3, p: 1 }}>
              <CardContent>
                <Box
                  height="100%"
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "end",
                    }}
                  >
                    <Typography fontWeight="bold" variant="h5">
                      {dataCards.databases}
                    </Typography>
                    <Typography fontWeight="400" variant="h6">
                      Databases
                    </Typography>
                  </Box>
                  <StorageIcon fontSize="large" />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xl={3}>
            <Card variant="outlined" sx={{ boxShadow: 3, p: 1 }}>
              <CardContent>
                <Box
                  height="100%"
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "end",
                    }}
                  >
                    <Typography fontWeight="bold" variant="h5">
                      {dataCards.sequences}
                    </Typography>
                    <Typography fontWeight="400" variant="h6">
                      Sequences
                    </Typography>
                  </Box>
                  <FormatAlignCenterIcon fontSize="large" />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xl={3}>
            <Card variant="outlined" sx={{ boxShadow: 3, p: 1 }}>
              <CardContent>
                <Box
                  height="100%"
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "end",
                    }}
                  >
                    <Typography fontWeight="bold" variant="h5">
                      {dataCards.activity}
                    </Typography>
                    <Typography fontWeight="400" variant="h6">
                      Activities
                    </Typography>
                  </Box>
                  <BiotechIcon fontSize="large" />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xl={3}>
            <Card variant="outlined" sx={{ boxShadow: 3, p: 1 }}>
              <CardContent>
                <Box
                  height="100%"
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "end",
                    }}
                  >
                    <Typography fontWeight="bold" variant="h5">
                      {dataCards.last_update}
                    </Typography>
                    <Typography fontWeight="400" variant="h6">
                      Last update
                    </Typography>
                  </Box>
                  <UpdateIcon fontSize="large" />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </>
  );
}
