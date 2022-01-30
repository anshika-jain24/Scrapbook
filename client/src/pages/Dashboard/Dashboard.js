import React from "react";
import ButtonAppBar from "../../components/Navbar";
import Map from "../../components/Map/Map";
import {
  Box,
  Button,
  Grid,
  Typography,
  Card,
  CardActions,
  CardContent,
} from "@mui/material";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

function Dashboard() {
  const placesToVisit = useSelector(
    (state) => state.placesToVisit.placesToVisitData
  );
  const placesVisited = useSelector(
    (state) => state.placesVisited.placesVisitedData
  );

  console.log(placesToVisit);
  console.log(placesVisited);
  return (
    <>
      <ButtonAppBar />
      <Box
        sx={{
          p: 2,
        }}
      >
        <Typography variant="h4">Place Visited</Typography>
        {/* {JSON.stringify(placesVisited)} */}
        <Grid container justify="center" alignItems="center" spacing={2}>
          {placesVisited.map((obj, index) => {
            return (
              <Grid item sm={3}>
                <Card>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      Place {index + 1}
                    </Typography>
                    <Typography variant="h5" component="div">
                      {obj.name}
                    </Typography>
                    {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  adjective
                </Typography> */}
                    <Typography variant="body2">
                      well meaning and kindly.
                      <br />
                      {'"a benevolent smile"'}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <RouterLink
                      to={`/${obj._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Button variant="contained">See More</Button>
                    </RouterLink>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
      <Box
        sx={{
          p: 2,
        }}
      >
        <Typography variant="h4">Place To Visit</Typography>
        <Grid container justify="center" alignItems="center" spacing={2}>
          {placesToVisit.map((obj, index) => {
            return (
              <Grid item sm={3}>
                <Card>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      Word of the Day
                    </Typography>
                    <Typography variant="h5" component="div">
                      {obj.name}
                    </Typography>
                    {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  adjective
                </Typography> */}
                    <Typography variant="body2">
                      well meaning and kindly.
                      <br />
                      {'"a benevolent smile"'}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <RouterLink
                      to={`/${obj._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Button variant="contained">See More</Button>
                    </RouterLink>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>

      <Map />
      {/* <Button variant="contained">Hello</Button> */}
    </>
  );
}

export default Dashboard;
