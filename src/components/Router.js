
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import PopSer from '../pages/PopularSeries';
import PopMov from '../pages/PopularMovies';
import Search from '../pages/Search'
import Signin from '../pages/Signin';
import Signup from '../pages/Signup'; 
function RouteComponent() {
  
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/popularMovies" element={<PopMov />} />
      <Route path="/popularSerie" element={<PopSer />} />
      <Route path="/search" element={<Search />} />
      <Route path="/login" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default RouteComponent;
