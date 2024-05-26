
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import PopSer from '../pages/PopularSeries';
import PopMov from '../pages/PopularMovies';
import Search from '../pages/Search'
import Signin from '../pages/Signin';
import Signup from '../pages/Signup'; 
import Profile from '../pages/Profile';
import FavMovies from '../pages/Favorite';
import Test from '../pages/Test';
import Video  from '../pages/video.js';
function RouteComponent() {
  
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/popularMovies" element={<PopMov />} />
      <Route path="/popularSerie" element={<PopSer />} />
      <Route path="/search" element={<Search />} />
      <Route path="/login" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/favmovies" element={<FavMovies />} />
      <Route path="/test" element={<Test />} />
      <Route path="/video" element={<Video />} />
    </Routes>
  );
}

export default RouteComponent;
