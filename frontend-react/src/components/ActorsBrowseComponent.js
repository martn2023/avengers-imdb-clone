import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css'; // Import the CSS file

function ActorsBrowseComponent() {
    const [actors, setActors] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/browse-actors')
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
                        <img src={`/images/actors/${actor.id}/portrait_${actor.id}.jpg`} alt={`${actor.first_name} ${actor.last_name}`} className="actorPortrait" />
                        <h2 className="actorName">{actor.first_name} {actor.last_name}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ActorsBrowseComponent;
