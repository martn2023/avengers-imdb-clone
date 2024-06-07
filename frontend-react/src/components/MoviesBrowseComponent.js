import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../App.css'; // Import the CSS file

function MoviesBrowseComponent() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        axios.get('{apiUrl}/browse-movies')
            .then(response => {
                setMovies(response.data);
            })
            .catch(error => {
                console.error('Error fetching movies:', error);
            });
    }, []);

    return (
        <div>
            <h1 className="header">Browsing All Movies</h1>
            <div className="moviesGrid">
                {movies.map((movie, index) => (
                    <div key={index} className="movieCell">
                        <img
                            src={`/images/movies/${movie.id}/movie_poster_${movie.id}.jpg`}
                            alt="Movie Poster"
                            className="moviePoster"
                            onError={(e) => { e.target.onerror = null; e.target.src="/images/movies/movie_poster_placeholder_marvel.jpg"; }}
                        />
                        <Link to={`/movie_details/${movie.id}`} className="movieTitleLink">
                            <h2 className="movieTitle">{movie.title}</h2>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MoviesBrowseComponent;
