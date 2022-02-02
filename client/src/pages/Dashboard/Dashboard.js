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
import { useSelector} from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import List from "../../components/List";


function Dashboard() {
  const placesToVisit = useSelector(
    (state) => state.placesToVisit
  );
  const placesVisited = useSelector(
    (state) => state.placesVisited
  );



  console.log(placesToVisit);
  console.log(placesVisited);
  return (
      (placesToVisit.isLoaded && placesVisited.isLoaded) ?
    <>
      <ButtonAppBar />
      <Box
        sx={{
          p: 2,
        }}
      >
        <Typography variant="h4" style={{padding: '1rem', textAlign: 'center'}}>Have a look at all the amazing places you have visited!</Typography>
        {/* {JSON.stringify(placesVisited)} */}
        <Grid container justify="center" alignItems="center" spacing={2}>
          {placesVisited.placesVisitedData.map((obj, index) => {
            var note = obj.personal_note ;
            if(note.length > 100)
            {
              note = note.substring(0,100);
            }
            return (
              <Grid item sm={3}>
                <Card>
                  <CardContent>
                    {/* <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      Place {index + 1}
                    </Typography> */}
                    <Typography variant="h5" component="div" style={{padding: '0.5rem'}}>
                      {obj.place.name}
                    </Typography>
                    {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  adjective
                </Typography> */}
                    <Typography variant="body2">
                      {note}{
                        note === obj.personal_note ? <></> : <>...</>
                      }
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <RouterLink
                      to={`/placesVisited/${obj._id}`}
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
      <List />
      <Map />
      {/* <Button variant="contained">Hello</Button> */}
    </> : <></>
  );
}

export default Dashboard;
