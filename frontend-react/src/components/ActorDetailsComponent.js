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

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = date.toLocaleDateString(undefined, options);
        const day = date.getDate();
        const suffix = (day % 10 === 1 && day !== 11) ? 'st' : (day % 10 === 2 && day !== 12) ? 'nd' : (day % 10 === 3 && day !== 13) ? 'rd' : 'th';
        return `Born ${formattedDate.split(' ')[0]} ${day}${suffix}, ${formattedDate.split(' ')[2]}`;
    };

    return (
        <div className="actorDetailsContainer">
            <div className="actorDetailsBox">
                <div className="leftSide">
                    <img
                        src={`/images/actors/${actor.id}/portrait_${actor.id}.jpg`}
                        alt={`${actor.first_name} ${actor.last_name}`}
                        className="actorPortraitLarge"
                    />
                </div>
                <div className="rightSide">
                    <div className="actorBio">
                        <h2 className="actorNameLarge">{actor.first_name} {actor.last_name} ({actor.sex === 'male' ? 'actor' : 'actress'})</h2>
                        <p>{formatDate(actor.date_of_birth)}</p>
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
        </div>
    );
}

export default ActorDetailsComponent;
