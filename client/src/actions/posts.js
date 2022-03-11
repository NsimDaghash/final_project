// get the data from client/api/posts.js
// send the data to client/reducers/posts.js

import { START_LOADING, END_LOADING, FETCH_ALL, FETCH_POST, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, LIKE ,COMMENT} from '../constants/actionTypes';
import * as api from '../api'; //import every thibg from the actions as api
//import * as api from '../api/index.js'
//Action creators - function that return actions
export const getPost = (id) => async (dispatch) => { //its async data to actually fitch all the posts we need (use redux-thunk) 
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchPost(id);

    dispatch({ type: FETCH_POST, payload: { post: data } }); // in react redux you need to dispatch instide of return ,payload is usually the data where we store our posts .
  } catch (error) {
    console.log(error);
  }
};

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data, currentPage, numberOfPages } } = await api.fetchPosts(page);

    dispatch({ type: FETCH_ALL, payload: { data, currentPage, numberOfPages } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data } } = await api.fetchPostsBySearch(searchQuery);

    dispatch({ type: FETCH_BY_SEARCH, payload: { data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

/*
export const getPostsByCreator = (name) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data } } = await api.fetchPostsByCreator(name);

    dispatch({ type: FETCH_BY_CREATOR, payload: { data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};
*/

export const createPost = (post, navigate) => async (dispatch) => {    // dispatch comes from redux-thunk
    console.log("2 step creating post - src/actions/posts.js");
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createPost(post);  //this make a post  api request to the server and we are sending a post to it

    dispatch({ type: CREATE, payload: data });
	// check this :
   navigate(`/posts/${data._id}`);  
  } catch (error) {
    console.log(error);
  }
};
// update the selected post 
export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};  // after this go to reducers to - posts.js

export const likePost = (id) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem('profile'));

  try {
    const { data } = await api.likePost(id, user?.token);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const commentPost = (value,id) => async (dispatch) => {
    try{
      const {data} = await api.comment(value,id);
       
      dispatch({ type: COMMENT,payload : data });
      console.log(value);
      console.log(data);
      return data.comments;
    } catch(error){
      console.log(error); 
    }
};
// delete the post 
export const deletePost = (id) => async (dispatch) => {
  try {
    await await api.deletePost(id);

    dispatch({ type: DELETE, payload: id });
    window.location.reload(false);
  } catch (error) {
    console.log(error);
  }
};