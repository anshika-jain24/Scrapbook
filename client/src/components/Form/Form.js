import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  Item,
} from "@mui/material";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { addPlacesVisited } from "../../redux/ActionCreators/PlacesVisited";

//GET CURRENTID OF THE POST

function Form() {
  const [placeData, setPlaceData] = useState({
    personal_note: "",
    review: "",
    rating: -1,
  });
  // const post = useSelector(state => currentId ? state.posts.find( (p) => p._id === currentId) : null)
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();

  const [selectedFiles, setSelectedFiles] = useState(null);

  const handleFileInput = (e) => {
    console.log(e.target.files);
    setSelectedFiles(e.target.files);
  };

  console.log(selectedFiles);

  // useEffect(() => {
  //     if(post) setPostData(post);
  // }, [post])

  // console.log(location.state);

  const temp = {
    "name":location.state.name,
    "location":location.state.location
  };
  console.log(temp);

  const handleSubmit = (e) => {
    e.preventDefault();
    const temp1 = new FormData(
      document.getElementById("add-place-tovisited-form")
    );

    temp1.append('place', JSON.stringify(temp))

    // if(selectedFiles.length===null)
    // {
    //   temp1.set('image_files', []);
    // }
    // temp1.append('image', selectedFiles);

    for (var pair of temp1.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }


    // console.log(...temp1);

    // console.log(temp1.get('image_files'))

    // console.log(temp1);
    // const obj = {
    //   place: {
    //     name: temp.name,
    //     location: temp.location,
    //   },
    //   personal_note: placeData.personal_note,
    //   review: placeData.review,
    //   rating: placeData.rating,
    //   location: temp.location,
    //   images_files:selectedFiles
    // };
    // console.log(obj);
    dispatch(addPlacesVisited(temp1));
    clear();
    // if(currentId){
    //     dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
    //     clear();
    //     console.log("sss");
    // }
    // else{
    //     dispatch(createPosts({ ...postData, name : user?.result?.name }));
    //     clear();
    // }
  };

  const clear = () => {
    // setCurrentId(null);
    setPlaceData({
      personal_note: "",
      review: "",
      rating: -1,
    });
  };

  return (
    <Paper className={classes.paper}>
      <Typography variant="h4">{location.state.name}</Typography>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        id="add-place-tovisited-form"
      >
        <Typography variant="h6">Creating a Memory</Typography>
        <TextField
          name="personal_note"
          variant="outlined"
          label="Message"
          fullWidth
          multiline
          rows={4}
          value={placeData.personal_note}
          onChange={(e) =>
            setPlaceData({ ...placeData, personal_note: e.target.value })
          }
        />
        <TextField
          name="review"
          variant="outlined"
          label="Review"
          fullWidth
          multiline
          rows={4}
          value={placeData.review}
          onChange={(e) =>
            setPlaceData({ ...placeData, review: e.target.value })
          }
        />
        <TextField
          name="rating"
          label="Rating"
          type="number"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          value={placeData.rating}
          onChange={(e) =>
            setPlaceData({ ...placeData, rating: e.target.value })
          }
        />
        <Grid>
          <Grid item xs={4}>
            SSS
          </Grid>
          <Grid item xs={8}>
            SSS
          </Grid>
        </Grid>
        <input
          accept="*"
          className={classes.input}
          style={{ display: "none" }}
          id="raised-button-file"
          multiple
          type="file"
          onChange={handleFileInput}
          name="image_files"
        />
        <label htmlFor="raised-button-file">
          <Button
            variant="contained"
            component="span"
            sx={{
              m: 2,
            }}
          >
            Upload
          </Button>
        </label>
        {/* <div className="classes.fileInput">
                   
                </div> */}
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
}

export default Form;
