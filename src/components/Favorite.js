import { useState, useEffect } from 'react';
import Card from './Card';
function MovieSerieF({ t,Id }) {
    const apiKey = '831a4bb8a39f71fea9d3c2efe8fb5ab2';
    const [item, setItem] = useState(null);
    var response =null;
    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
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
    }, [Id, apiKey]);

    return (
        <div>
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
