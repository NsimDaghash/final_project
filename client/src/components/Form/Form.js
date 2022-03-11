import React, { useState, useEffect } from 'react';   
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { useNavigate } from 'react-router-dom';

import { createPost, updatePost } from '../../actions/posts';
import useStyles from './styles';

const Form = ({ currentId, setCurrentId , editPost, setEditPost,}) => {
   // the next line spacify the object properities that we would use
  const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' });
  const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const navigate = useNavigate();

  const refreshpage =() =>{
   // console.log("need to be refreshed");
   // window.location.reload(false);
  }

  const clear = () => {
    setCurrentId(0);
    setPostData({ title: '', message: '', tags: '', selectedFile: '' });
    setEditPost(false)
    window.location.reload(false);
   // refreshpage();
  };

  useEffect(() => {
  //  if (!post?.title) clear();
    if (post) setPostData(post);
  }, [post]);
  
  const handleSubmit = async (e) => {
    // send all the data that the user typed in 
    //this will take me to the actions folders that will take me to api folder for the fuunction call
    console.log("1 step creating post");
    e.preventDefault();
    setEditPost(false) ;
    
        let flag = true;

          if (currentId === 0) {
              dispatch(createPost({ ...postData, name: user?.result?.name }, navigate));  // in case of id = 0 : its anew post needed to be created
            }
             else 
             {
              dispatch(updatePost(currentId, { ...postData, name: user?.result?.name })); //in case of existing id : update the post

              } 
          clear();  // clear the form after the create/update
         // window.location.reload(false);         
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own posts and like other's posts.
          </Typography>
          <Typography variant="h6" align="center">
          If you don't have an account you can sign up for free .
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper} elevation={6}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6" >{currentId ? `Editing "${post.title}"` : 'Create Post'}</Typography>
        <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />  
        <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
		
        <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
		
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" >Submit</Button>
        <Button className={classes.buttonSubmit} variant="contained" color="secondary" size="large" onClick={clear} >Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;