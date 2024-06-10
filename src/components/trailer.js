import React from 'react';
import YouTube from 'react-youtube';
import SlidingButton from './slidingButton';
const TrailerPopup = ({ showPopup, handleTogglePopup, videoKey, opts }) => (
    <>
        <div className="column1">
            <SlidingButton name={"Trailer"} handleClick={handleTogglePopup}/>
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
