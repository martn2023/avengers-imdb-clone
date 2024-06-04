import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css'; // Import the CSS file

function MoviesBrowseComponent() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/browse-movies')
            .then(response => {
                setMovies(response.data);
            })
            .catch(error => {
                console.error('Error fetching movies:', error);
            });
    }, []);

    const getImageUrl = (movieId) => {
        return `/images/movies/${movieId}/movie_poster_${movieId}.jpg`;
    };

    return (
        <div>
            <h1 className="header">Browsing All Movies</h1>
            <div className="moviesGrid">
                {movies.map((movie) => (
                    <div key={movie.id} className="movieCell">
                        <img
                            src={getImageUrl(movie.id)}
                            alt={movie.title}
                            className="moviePoster"
                            onError={(e) => {
                                e.target.onerror = null; // Prevents infinite loop in case the placeholder image fails to load
                                e.target.src = '/images/movies/movie_poster_placeholder_marvel.jpg';
                            }}
                        />
                        <h2 className="movieTitle">{movie.title}</h2>
                        <p className="movieDate">{new Date(movie.release_date).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MoviesBrowseComponent;
