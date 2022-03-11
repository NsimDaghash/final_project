import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';    // to fetch tha data from the global redux store

import Post from './Post/Post';
import useStyles from './styles';

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);   //initialize as a hook , state = global redux store
  const classes = useStyles();

  if (!posts.length && !isLoading) {
    return ("the search parameter didn't match any result !");
  } 
  return (
    isLoading ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {posts?.map((post) =>(
          <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>)
        )}
      </Grid>
    )
  );
};

export default Posts;
