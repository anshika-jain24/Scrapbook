import React, {useState, useEffect} from 'react';
import { TextField, Button, Typography, Paper} from '@mui/material';
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';


//GET CURRENTID OF THE POST

function Form() {
    // const [postData, setPostData] = useState({
    //     title: '',
    //     message: '',
    //     tags: '',
    //     selectedFile:''
    // });
    // const post = useSelector(state => currentId ? state.posts.find( (p) => p._id === currentId) : null)
    const classes=useStyles();
    const dispatch = useDispatch();


    // useEffect(() => {
    //     if(post) setPostData(post);
    // }, [post])

    const handleSubmit =(e) => {
        e.preventDefault();

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
        // setPostData({
        //     title: '',
        //     message: '',
        //     tags: '',
        //     selectedFile:''
        // });
    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">Creating a Memory</Typography>
                <TextField 
                name="title" 
                variant="outlined" 
                label="Title" 
                fullWidth
                // value={postData.title}
                // onChange={}
                />
                <TextField 
                name="message" 
                variant="outlined" 
                label="Message" 
                fullWidth
                // value={postData.message}
                // onChange={}
                />
                <TextField 
                name="tags" 
                variant="outlined" 
                label="Tags" 
                fullWidth
                // value={postData.tags}
                // onChange={}
                />
                <div className="classes.fileInput">
                   
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    )
}

export default Form