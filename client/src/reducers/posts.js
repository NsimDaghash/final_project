// get the data from client/action/posts.js
// sned the data to client/src/components/posts/post/post.js to be fatched

import { FETCH_ALL, FETCH_BY_SEARCH, FETCH_POST, CREATE, UPDATE, DELETE, LIKE, COMMENT } from '../constants/actionTypes';

// reducer is a function that excepts the posts and an action and based on the action return the action or the state changed by the action
// in our case state = posts
export default (state = { isLoading: true, posts: [] }, action) => {  // we use this function in combineReducers

  switch (action.type) {
    case 'START_LOADING':
      return { ...state, isLoading: true };
    case 'END_LOADING':
      return { ...state, isLoading: false };
      // get all the posts
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
      // get the posts by search arguments from the search box 
    case FETCH_BY_SEARCH:
      return { ...state, posts: action.payload.data };
      // get a spicifice post
    case FETCH_POST:
      return { ...state, post: action.payload.post };
      // add like / remove like  to/from the likes
    case LIKE:
      return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
      // add comment to the post 
      case COMMENT:
      return{
        ...state ,
        posts : state.posts.map((post)=>{
          // change the relevant post
          if (post._id === action.payload._id) {
            return action.payload;
          }
          // return all other posts as is 
          return post;
        })
      }
      // create new post
    case CREATE:
      console.log("3 step creating post src/reducers/posts.js");
      return { ...state, posts: [...state.posts, action.payload] };
    case UPDATE:
      //if the current post id equal to the updated post id(payload) return the updated post else return the current post 
      
      return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
    case DELETE:
      // keep all the post , but filter out the one that need to be deleted
      return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };
    default:
      return state;
  }
};