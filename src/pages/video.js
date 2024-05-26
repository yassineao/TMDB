import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchVideo } from'../api/getVideo';

function Video() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const [loading, setLoading] = useState(true);
    const [video, setVideo] = useState(null);
    const Id = params.get('id');
    const t = params.get('Type');



    useEffect(() => {
        const loadDetails = async () => {
            try {
                const video = await fetchVideo(Id, t);
                setVideo(video);
           
                setLoading(false);
            } catch (error) {
                console.error('Error loading details:', error);
            }
        };

        loadDetails();
    }, [Id, t]);


    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="unique-container">
         
        </div>
    );
}

export default Video;
