// get the data from server/controllers/posts. or from the src/components/form/form.js
// send the data to client/src/action/posts.js

import axios from 'axios'; // make API calls

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

//console.log("2 step ctearting post -api/index.js");
export const fetchPost = (id) => API.get(`/posts/${id}`);     
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);      // fetch all posts ( 8 in each page) 
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createPost = (newPost) => API.post('/posts', newPost);      // create anew post send the data from the form .
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const comment = (value ,id) => API.post(`/posts/${id}/commentPost`,{ value });
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);   // update post route
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);