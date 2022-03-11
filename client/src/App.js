/* import packages npm */
import React from 'react';  
import { Container } from '@material-ui/core';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

/* import my components  */
import PostDetails from './components/PostDetails/PostDetails';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';

//        <Route path="/" exact element={(<Home />)} />
const App = () => {
 const user = JSON.parse(localStorage.getItem('profile'));
  return (
  <BrowserRouter>
    <Container maxWidth="xl">
      <Navbar />
      <Routes>
        <Route path="/" exact element={(<Home />)} />
        <Route path="/posts" exact element={(<Home />)} />
        <Route path="/posts/search" exact element={(<Home />)} />
        <Route path= "/posts/:id" element={<PostDetails />} />
        <Route path="/auth" exact element={<Auth />} />
      </Routes> 
    </Container>
  </BrowserRouter>
  );
};

export default App;
