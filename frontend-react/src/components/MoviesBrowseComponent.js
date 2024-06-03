import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function BrowseMovies() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/browse-movies')
            .then(response => {
                setMovies(response.data);
            })
            .catch(error => {
                console.error('Error fetching movies:', error);
            });
    }, []);

    return (
        <div>
            <h1>Browse Movies</h1>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Release Date</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map(movie => (
                        <tr key={movie.id}>
                            <td><Link to={`/movie/${movie.id}`}>{movie.title}</Link></td>
                            <td>{new Date(movie.release_date).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default BrowseMovies;
