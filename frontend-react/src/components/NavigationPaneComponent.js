import React from 'react';
import { Link } from 'react-router-dom';

function NavigationPaneComponent() {
    return (
        <nav>
            <ul>
                <li><Link to="/browse-movies">Browse Movies</Link></li>
                <li><Link to="/browse-actors">Browse Actors</Link></li>
            </ul>
        </nav>
    );
}

export default NavigationPaneComponent;
