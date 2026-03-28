import { useState, useEffect } from 'react';
import Card from './Card';
function MovieSerieF({ t,Id }) {
    const apiKey = process.env.REACT_APP_MOVIE_API_KEY;
    const [item, setItem] = useState(null);
    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                let response = null;
                if(t==="movie"){
                     response = await fetch(`https://api.themoviedb.org/3/movie/${Id}?api_key=${apiKey}`);
                     console.log("89898989898");

                }
                else{
                    console.log("pepepepep");
                     response = await fetch(`https://api.themoviedb.org/3/tv/${Id}?api_key=${apiKey}`);

                }
                if (!response.ok) {
                    throw new Error('Failed to fetch movie details');
                }
                const item = await response.json();
                setItem(item);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        fetchMovieDetails();
    }, [Id, apiKey, t]);

    return (
        <div >
             
        {item ? ( 
            t === 'movie' ? (
            <Card Type={"movie"} movie={item} />
            ) : (
             <Card Type={"serie"} serie={item} movie={null}/>
                             
            )
        ) : (
            <p>Loading...</p>
        )}
        </div>

    );
}

export default MovieSerieF;
