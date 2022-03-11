import React, { useState} from 'react';  
import { Container, Grow, Grid, Paper,AppBar,TextField,Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useNavigate ,useLocation  } from 'react-router-dom';

import {  getPostsBySearch } from '../../actions/posts';
import Pagination from '../paginations';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
//import { mergeClasses } from '@material-ui/styles';

import useStyles from './styles';

function useQuery(){         
  return new URLSearchParams(useLocation().search)
}

const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const [editPost,setEditPost] = useState(false);
  const dispatch = useDispatch();
  const query = useQuery();
  const navigat =useNavigate();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');
  const classes = useStyles();
  const [search ,setSearch ] = useState('') ;
  //const [tags, setTags] = useState([]);

  const handleKeyPress =(e) =>{
    if (e.keyCode === 13){
      searchPost();
    }
  };

  const searchPost =() =>{
    if (search.trim()) {
      dispatch(getPostsBySearch({ search }));
      navigat(`/posts/search?searchQuery=${search}`);
    } else {
      navigat('/');
    }
  }

  return (
    <Grow in>
      <Container maxWidth="xl">

        <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>        
          <Grid item xs={12} sm={6} md={3}>

            {/* creat/ update post */}
            <Form currentId={currentId} setCurrentId={setCurrentId} editPost={editPost} setEditPost={setEditPost} />
            {/* search */}
            <AppBar className={classes.appBarSearch} position="sticky" color="inherit">
              <TextField onKeyDown={handleKeyPress} className={classes.searchInput} name="search" variant="outlined" label="Search Posts" value={search} onChange={(e) => setSearch(e.target.value)} />
              <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
            </AppBar>          
          </Grid>
          {/*posts */}
          <Grid item xs={12} sm={6} md={9}>
                {/*pagination */}      
              {(!searchQuery) && (
                <Paper className={classes.pagination} elevation={6}>
                  <Pagination page={page} />
                </Paper>
              )}
            <Posts setCurrentId={setCurrentId} setEditPost={setEditPost}/>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;