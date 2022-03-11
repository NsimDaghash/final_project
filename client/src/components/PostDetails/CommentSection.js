import React, { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@material-ui/core/';
import { useDispatch } from 'react-redux';

import { commentPost } from '../../actions/posts';
import useStyles from './styles';


const CommentSection = ({post}) => {
    
    const classes = useStyles();
    const [comments,setComments] = useState(post?.comments);
    const [comment,setComment] = useState('');
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));      // pull the user out of the local Storage
    const commentsRef = useRef();

    const handleClick =  async () =>{
        
        const finalComment = `${user.result.name}:${comment}`   // contain the user name and the comment 
        const newComments = await dispatch(commentPost(finalComment , post._id)) ;      // the comment and witch post it belong to 
        //console.log("handle click");
        console.log(finalComment);
        setComments(newComments);
        setComment('');

        commentsRef.current.scrollIntoView({ behavior : 'smooth'});  // scroll to the end of the posts slowly
    }

    return(
        <div>
            <div className={classes.commentOuterContainer} >
            {user?.result?.name &&(
                <div >
                <Typography gutterBottom variant="h6">Share a comment</Typography>  
                <TextField
                    fullWidth
                    rows={4}
                    variant='outlined'
                    label='Comment'
                    multiline
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <Button style={{marginTop:'10px'}} fullWidth disabled={!comment} variant='contained' color="primary" onClick={handleClick}>
                    Comment
                </Button>
                </div>
                )}
                <div className={classes.commentInnerContainer} >
                    <Typography gutterBottom variant="h6">Comments</Typography>
                    {comments.map((c,i)=>(
                        <Typography key={i} gutterBottom variant='subtitle1'>
                            <strong >{c.split(':')[0]}</strong> : {c.split(':')[1]}
                        </Typography>
                    ))}
                    <div ref={commentsRef} />
                </div>

            </div>
        </div>
    )
}

export default CommentSection