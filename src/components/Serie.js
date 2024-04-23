import React from 'react';
import "../styles/style.css"
import Cover from './Cover';

function Serie({  serie }) { // Receive props as a single object argument














  
  return (
    <div className="movie_card" id="bright" key={serie.id}>
    <div className="info_section">
      <div className="movie_header">
      <Cover Type="tv" Id={serie.id} number={1} />
        <h1>{serie.name}</h1>
        <h3>.</h3>
        <span className="minutes">222 </span>
        <p className="type">{serie.first_air_date}</p>
      </div>
      <div className="movie_desc">
        <p className="text">
          {serie.overview}
        </p>
        <p className="director">
          Director: {serie.created_by && serie.created_by.length > 0 ? serie.created_by[0].name : 'No Data'}

        </p>
        <p className="genre">
                          Genre: {serie.genres}
                        </p>

      </div>
    </div>
    <div className="blur_back">
      <Cover Type="tv" Id={serie.id} number={2} />
    </div>
  </div>
  );
}

export default Serie;
