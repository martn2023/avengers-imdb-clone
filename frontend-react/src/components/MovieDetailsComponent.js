import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import '../App.css'; // Import the CSS file

function MovieDetailsComponent() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [actors, setActors] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3000/movies/${id}`)
            .then(response => {
                setMovie(response.data.movie);
                setActors(response.data.actors);
            })
            .catch(error => {
                console.error('Error fetching movie details:', error);
            });
    }, [id]);

    if (!movie) {
        return <div>Loading...</div>;
    }

    const formattedReleaseDate = new Date(movie.release_date).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
    });

    return (
        <div className="movieDetailsContainer">
            <div className="movieDetailsContent">
                <div className="movieDetailsLeft">
                    <img
                        src={`/images/movies/${movie.id}/movie_poster_${movie.id}.jpg`}
                        alt={`${movie.title}`}
                        className="moviePosterDetails"
                    />
                </div>
                <div className="movieDetailsRight">
                    <div className="movieDetailsTop">
                        <h1 className="movieTitle">{movie.title}</h1>
                        <p className="movieDate">Released: {formattedReleaseDate}</p>
                    </div>
                    <div className="movieDetailsBottom">
                        <h2>Actors</h2>
                        <ul>
                            {actors.map(actor => (
                                <li key={actor.id}>
                                    <Link to={`/actor_details/${actor.id}`} className="actorLink">
                                        {actor.first_name} {actor.last_name}
                                    </Link>
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
