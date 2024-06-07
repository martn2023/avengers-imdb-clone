import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../App.css'; // Import the CSS file

const apiUrl = process.env.REACT_APP_API_BASE_URL;

function ActorsBrowseComponent() {
    const [actors, setActors] = useState([]);

    useEffect(() => {
        axios.get(`${apiUrl}/browse-actors`)
            .then(response => {
                setActors(response.data);
            })
            .catch(error => {
                console.error('Error fetching actors:', error);
            });
    }, []);

    return (
        <div>
            <h1 className="header">Browsing All Actors</h1>
            <div className="actorsGrid">
                {actors.map((actor, index) => (
                    <div key={index} className="actorCell">
                        <img
                            src={`/images/actors/${actor.id}/portrait_${actor.id}.jpg`}
                            alt={`${actor.first_name} ${actor.last_name}`}
                            className="actorPortrait"
                            onError={(e) => { e.target.onerror = null; e.target.src="/images/actors/portrait_placeholder.jpg"; }}
                        />
                        <Link to={`/actor_details/${actor.id}`} className="actorNameLink">
                            <div className="actorName">{actor.first_name} {actor.last_name}</div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ActorsBrowseComponent;
