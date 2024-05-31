import React from 'react';
import Cover from './Cover';

const PhotoGallery = ({ item, t, handleImageClick, showImagePopup, currentImage, setShowImagePopup }) => (
    <section className="fotos">
        <h2>Photos</h2>
        <div className="fotos-container">
            {Array.from({ length: 30 }, (_, i) => (
                <div className="foto-card" key={i} onClick={() => handleImageClick(i)}>
                    {t === 'movie' ? (
                        <Cover Type="movie" Id={item.id} number={i} classN="" PB={"backd"} />
                    ) : (
                        <Cover Type="tv" Id={item.id} number={i} classN="" PB={"backd"} />
                    )}
                </div>
            ))}
        </div>
        {showImagePopup && (
            <div className="image-popup-overlay" onClick={() => setShowImagePopup(false)}>
                <div className="image-popup-content" onClick={(e) => e.stopPropagation()}>
                    <button className="image-popup-close-button" onClick={() => setShowImagePopup(false)}>&times;</button>
                    {currentImage}
                </div>
            </div>
        )}
    </section>
);

export default PhotoGallery;
