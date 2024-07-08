import React from 'react';

const MovieDetails = ({ item, t }) => (
    <section className="redaktion">
        <ul className="redaktion-list">
            <div id="">
                <h2 className="red">Original Language : <h1 className="extra">{item.original_language}</h1></h2>
                {t === 'movie' ? (
                    <h2 className="red">Release Date : <h1 className="extra">{item.release_date}</h1></h2>
                ) : (
                    <h2 className="red">Release Date : <h1 className="extra">{item.first_air_date}</h1></h2>
                )}
                <h2 className="red">Popularity : <h1 className="extra">{item.popularity}</h1></h2>
                <h2 className="red">Vote Average : <h1 className="extra">{item.vote_average}</h1></h2>
                {t === 'movie' && (
                    <>
                        <h2 className="red">Runtime : <h1 className="extra">{item.runtime} minutes</h1></h2>
                        <h2 className="red">Budget : <h1 className="extra">${item.budget.toLocaleString()}</h1></h2>
                        <h2 className="red">Revenue :<h1 className="extra">${item.revenue.toLocaleString()}</h1></h2>
                    </>
                )}
                {item.production_companies && item.production_companies.length > 0 && (
                    <div className="production-companies">
                        <h2>Production Companies:</h2>
                        <ul>
                            {item.production_companies.map((company) => (
                                <li key={company.id}>
                                    {company.logo_path && (
                                        <img
                                            src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                                            alt={company.name}
                                            className="company-logo"
                                        />
                                    )}
                                    <span>{company.name}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </ul>
    </section>
);

export default MovieDetails;
