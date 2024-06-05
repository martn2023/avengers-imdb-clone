import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationPaneComponent from './components/NavigationPaneComponent';
import MoviesBrowseComponent from './components/MoviesBrowseComponent';
import ActorsBrowseComponent from './components/ActorsBrowseComponent';
import MovieDetailsComponent from './components/MovieDetailsComponent';
import ActorDetailsComponent from './components/ActorDetailsComponent';

function App() {
    return (
        <Router>
            <div>
                <NavigationPaneComponent />
                <Routes>
                    <Route path="/" element={<MoviesBrowseComponent />} />
                    <Route path="/browse-movies" element={<MoviesBrowseComponent />} />
                    <Route path="/browse-actors" element={<ActorsBrowseComponent />} />
                    <Route path="/movie_details/:id" element={<MovieDetailsComponent />} />
                    <Route path="/actor_details/:id" element={<ActorDetailsComponent />} />
                    <Route path="*" element={<div>404 Not Found</div>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
