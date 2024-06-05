import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // Import the consolidated CSS file

function NavigationPaneComponent() {
    return (
        <nav className="navigationContainer">
            <div className="navigationLinks">
                <Link to="/browse-movies" className="navigationLink">Browse Movies</Link>
                <Link to="/browse-actors" className="navigationLink">Browse Actors</Link>
            </div>
        </nav>
    );
}

export default NavigationPaneComponent;
