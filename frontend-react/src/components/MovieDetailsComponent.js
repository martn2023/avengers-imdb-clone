import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../App.css'; // Import the CSS file

function MovieDetailsComponent() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/movies/${id}`);
                setMovie(response.data);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        fetchMovieDetails();
    }, [id]);

    if (!movie) return <div>Loading...</div>;

    return (
        <div className="movieDetailsContainer">
            <div className="movieDetailsContent">
                <div className="movieDetailsLeft">
                    <img
                        src={`/images/movies/${movie.movie.id}/movie_poster_${movie.movie.id}.jpg`}
                        alt={`${movie.movie.title} Poster`}
                        className="moviePosterDetails"
                        onError={(e) => { e.target.onerror = null; e.target.src="/images/movies/movie_poster_placeholder_marvel.jpg"; }}
                    />
                </div>
                <div className="movieDetailsRight">
                    <div className="movieDetailsTop">
                        <div className="detailsTitle">{movie.movie.title}</div>
                        <div className="detailsDate">Released: {new Date(movie.movie.release_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                    </div>
                    <div className="movieDetailsBottom">
                        <div className="detailsTitle">Actors</div>
                        <ul>
                            {movie.actors.map(actor => (
                                <li key={actor.id}>
                                    <a href={`/actor_details/${actor.id}`} className="actorLink">
                                        {actor.first_name} {actor.last_name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieDetailsComponent;
