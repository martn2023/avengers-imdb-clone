import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css'; // Import the CSS file

function ActorDetailsComponent() {
    const { id } = useParams(); // Get the actor ID from the URL
    const [actor, setActor] = useState(null);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3000/actors/${id}`)
            .then(response => {
                setActor(response.data.actor);
                setMovies(response.data.movies);
            })
            .catch(error => {
                console.error('Error fetching actor details:', error);
            });
    }, [id]);

    if (!actor) {
        return <div>Loading...</div>;
    }

    return (
        <div className="actorDetailsContainer">
            <div className="leftSide">
                <img
                    src={`/images/actors/${actor.id}/portrait_${actor.id}.jpg`}
                    alt={`${actor.first_name} ${actor.last_name}`}
                    className="actorPortraitLarge"
                />
            </div>
            <div className="rightSide">
                <div className="actorBio">
                    <h2 className="actorNameLarge">{actor.first_name} {actor.last_name}</h2>
                    <p>Date of Birth: {new Date(actor.date_of_birth).toLocaleDateString()}</p>
                    <p>Sex: {actor.sex}</p>
                </div>
                <div className="actorMovies">
                    <h3>Movies</h3>
                    <ul>
                        {movies.sort((a, b) => new Date(a.release_date) - new Date(b.release_date)).map((movie, index) => (
                            <li key={index}>
                                <Link to={`/movie_details/${movie.id}`} className="movieLink">{movie.title}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ActorDetailsComponent;
