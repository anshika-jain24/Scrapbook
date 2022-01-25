import React, {useState, useEffect} from 'react';
import { TextField, Button, Typography, Paper} from '@mui/material';
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { addPlacesVisited } from '../../redux/ActionCreators/PlacesVisited';

//GET CURRENTID OF THE POST

function Form() {
    const [placeData, setPlaceData] = useState({
        personal_note: '',
        review: '',
        rating: -1
    });
    // const post = useSelector(state => currentId ? state.posts.find( (p) => p._id === currentId) : null)
    const classes=useStyles();
    const dispatch = useDispatch();
    const location = useLocation();


    // useEffect(() => {
    //     if(post) setPostData(post);
    // }, [post])

    // console.log(location.state);

    const handleSubmit =(e) => {
        e.preventDefault();
        const obj = {
            place : location.state,
            personal_note : placeData.personal_note,
            review : placeData.review,
            rating : placeData.rating
        }
        console.log(obj.place.location);
        // dispatch(addPlacesVisited(obj));
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
    }


    const clear = () => {
        // setCurrentId(null);
        setPlaceData({
            personal_note: '',
            review: '',
            rating: -1
        });
    }

    return (
        <Paper className={classes.paper}>
            <Typography variant="h4">{location.state.name}</Typography>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">Creating a Memory</Typography>
                <TextField 
                name="personal_note" 
                variant="outlined" 
                label="Message" 
                fullWidth
                multiline
                rows={4}
                value={placeData.personal_note}
                onChange={(e) => setPlaceData({ ...placeData, personal_note: e.target.value })}
                />
                <TextField 
                name="review" 
                variant="outlined" 
                label="Review" 
                fullWidth
                multiline
                rows={4}
                value={placeData.review}
                onChange={(e) => setPlaceData({ ...placeData, review: e.target.value })}
                />
                <TextField
                name="rating"
                label="Rating"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                value={placeData.rating}
                onChange={(e) => setPlaceData({ ...placeData, rating: e.target.value })}
                />
                {/* <div className="classes.fileInput">
                   
                </div> */}
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    )
}

export default Form