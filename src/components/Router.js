
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import PopSer from '../pages/PopularSeries';
import PopMov from '../pages/PopularMovies';
import Search from '../pages/Search'
import Login from '../pages/Login';
import UserS from './UserS';
function RouteComponent() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/popularMovies" element={<PopMov />} />
      <Route path="/popularSerie" element={<PopSer />} />
      <Route path="/search" element={<Search />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<UserS />} />
    </Routes>
  );
}

export default RouteComponent;
