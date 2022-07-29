import {
  Box,
  Card,
  CardContent,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import StorageIcon from "@mui/icons-material/Storage";
import axios from "axios";
import { useEffect, useState } from "react";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import BiotechIcon from "@mui/icons-material/Biotech";
import UpdateIcon from "@mui/icons-material/Update";

export default function StatisticsCards() {
  const [loadingCards, setLoadingCards] = useState<boolean>(true);
  const [dataCards, setDataCards] = useState<any>(null);

  const getDataCards = async () => {
    try {
      const response = await axios.get("/api/get_general_counts/");
      setDataCards(response.data);
      setLoadingCards(false);
    } catch (error) {
      setDataCards(null);
      setLoadingCards(false);
    }
  };

  useEffect(() => {
    setLoadingCards(true);
    getDataCards();
  }, []);

  return (
    <>
      <Grid container spacing={2} sx={{ marginTop: 5 }}>
        <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
          {loadingCards === true ? (
            <Skeleton variant="rectangular" width="100%" height={118} />
          ) : (
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
          )}
        </Grid>
        <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
          {loadingCards === true ? (
            <Skeleton variant="rectangular" width="100%" height={118} />
          ) : (
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
          )}
        </Grid>
        <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
          {loadingCards ? (
            <Skeleton variant="rectangular" width="100%" height={118} />
          ) : (
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
          )}
        </Grid>
        <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
          {loadingCards ? (
            <Skeleton variant="rectangular" width="100%" height={118} />
          ) : (
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
                    <Typography fontWeight="bold" variant="h6">
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
          )}
        </Grid>
      </Grid>
    </>
  );
}
