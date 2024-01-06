
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import PopSer from '../api/PopularSeries';
import PopMov from '../api/App';
import Search from '../api/theSearch';

function RouteComponent() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/popularFilm" element={<PopMov />} />
      <Route path="/popularSerie" element={<PopSer />} />
      <Route path="/search" element={<Search />} />
    </Routes>
  );
}

export default RouteComponent;
