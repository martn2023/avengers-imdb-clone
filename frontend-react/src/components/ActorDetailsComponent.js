import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import '../App.css'; // Import the CSS file

const apiUrl = process.env.REACT_APP_API_BASE_URL;

function ActorDetailsComponent() {
    const { id } = useParams();
    const [actor, setActor] = useState(null);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        axios.get(`${apiUrl}/actors/${id}`)
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

    const formattedDateOfBirth = new Date(actor.date_of_birth).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
    });

    const actorSex = actor.sex === 'male' ? 'actor' : 'actress';

    return (
        <div className="actorDetailsContainer">
            <div className="actorDetailsContent">
                <div className="actorDetailsLeft">
                    <img
                        src={`/images/actors/${actor.id}/portrait_${actor.id}.jpg`}
                        alt={`${actor.first_name} ${actor.last_name}`}
                        className="actorPortraitDetails"
                        onError={(e) => { e.target.onerror = null; e.target.src="/images/actors/portrait_placeholder.jpg"; }}
                    />
                </div>
                <div className="actorDetailsRight">
                    <div className="actorDetailsTop">
                        <h2>{`${actor.first_name} ${actor.last_name}`} <span style={{fontSize: '16px'}}>({actorSex})</span></h2>
                        <p>Born {formattedDateOfBirth}</p>
                    </div>
                    <div className="actorDetailsBottom">
                        <h3>Movies</h3>
                        <ul>
                            {movies.map(movie => (
                                <li key={movie.id}>
                                    <Link to={`/movie_details/${movie.id}`} className="movieLink">
                                        {movie.title}
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

export default ActorDetailsComponent;
