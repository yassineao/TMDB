
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import PopSer from '../pages/PopularSeries';
import PopMov from '../pages/PopularMovies';
import Search from '../pages/Search';

function RouteComponent() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/popularMovies" element={<PopMov />} />
      <Route path="/popularSerie" element={<PopSer />} />
      <Route path="/search" element={<Search />} />
    </Routes>
  );
}

export default RouteComponent;
