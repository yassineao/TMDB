import React from 'react';
import YouTube from 'react-youtube';

const TrailerPopup = ({ showPopup, handleTogglePopup, videoKey, opts }) => (
    <>
        <div className="column1">
            <button className='Trailer' onClick={handleTogglePopup}>
                <i className="icon solid fa-play"></i>Watch trailer</button>
            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <button className="popup-close-button" onClick={handleTogglePopup}>&times;</button>
                        <YouTube videoId={videoKey} opts={opts} />
                    </div>
                </div>
            )}
        </div>
    </>
);

export default TrailerPopup;
