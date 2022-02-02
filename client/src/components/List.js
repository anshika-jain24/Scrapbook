import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function InteractiveList() {
  const placesToVisit = useSelector((state) => state.placesToVisit);

  return (
    <Box sx={{ flexGrow: 1, border: '0.5px dashed black', maxWidth: '70%', margin: 'auto', padding: '0.5rem', maxHeight: '30rem', overflow: 'auto'}}>
      <Grid container>
      <Grid item md={12} style={{margin: 'auto'}}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div" style={{textAlign: 'center'}}>
          Explore your Places to Visit
        </Typography>
        <Demo>
          <List>
            {placesToVisit.placesToVisitData.map((place) => {
            //   console.log(place);
              const s = place.rating[0];
              const t = place.rating[1];
              var avg=0;
              if(s!=0 && t!=0)
              {
                  avg = s / t;
              }
              console.log('s', s);
              console.log('t', t);
              return (
                <ListItem
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      Rating : {avg}
                    </IconButton>
                  }
                >
                  <ListItemText primary={place.name} />
                </ListItem>
              );
            })}
          </List>
        </Demo>
      </Grid>
      </Grid>
    </Box>
  );
}
