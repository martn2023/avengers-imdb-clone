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

    return (
        <div>
            <h1 className="header">Browsing All Movies</h1>
            <div className="moviesGrid">
                {movies.map((movie, index) => (
                    <div key={index} className="movieCell">
                        <img src="/images/movie_poster_placeholder_marvel.jpg" alt="Movie Poster" className="moviePoster" />
                        <h2 className="movieTitle">{movie.title}</h2>
                        <p className="movieDate">{new Date(movie.release_date).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MoviesBrowseComponent;
