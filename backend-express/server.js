// Importing necessary libraries
const express = require('express'); // Express framework for handling routes
const { Pool } = require('pg'); // PostgreSQL client library
const cors = require('cors'); // Middleware for handling Cross-Origin Resource Sharing (CORS)

const app = express();
app.use(cors()); // Enable CORS for all routes

// Note: Replace these values with your actual PostgreSQL connection details
const dbConfig = {
    user: 'postgres', // Your PostgreSQL username
    host: 'localhost', // Your PostgreSQL host
    database: 'avengers_movies_db_in_pg', // Your PostgreSQL database name
    password: 'postgres', // Your PostgreSQL password
    port: 5432 // Your PostgreSQL port
};

// Creating a new PostgreSQL pool with the configuration
const dbPool = new Pool(dbConfig);

// Route to get a movie by ID along with its actors, like urls.py in Django
app.get('/movies/:id', async (req, res) => {
    console.log('Received request for movie details with ID:', req.params.id); // Debug log
    const movieId = req.params.id; // The ID of the movie to fetch

    try {
        // Fetching movie details by ID
        const movieQuery = await dbPool.query('SELECT * FROM Movies WHERE id = $1', [movieId]);
        const movie = movieQuery.rows[0];

        // Fetching actors associated with the movie
        const actorsQuery = await dbPool.query(`
            SELECT a.* FROM Actors a
            JOIN Movie_Actors ma ON a.id = ma.actor_id
            WHERE ma.movie_id = $1
        `, [movieId]);
        const actors = actorsQuery.rows;

        console.log('Sending response with movie details and actors'); // Debug log
        res.json({ movie, actors });
    } catch (error) {
        console.error('Error fetching movie details:', error); // Error log
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to get an actor by ID along with related movies, like urls.py in Django
app.get('/actors/:id', async (req, res) => {
    console.log('Received request for actor details with ID:', req.params.id); // Debug log
    const actorId = req.params.id; // The ID of the actor to fetch

    try {
        // Fetching actor details by ID
        const actorQuery = await dbPool.query('SELECT * FROM Actors WHERE id = $1', [actorId]);
        const actor = actorQuery.rows[0];

        // Fetching movies associated with the actor
        const moviesQuery = await dbPool.query(`
            SELECT m.* FROM Movies m
            JOIN Movie_Actors ma ON m.id = ma.movie_id
            WHERE ma.actor_id = $1
        `, [actorId]);
        const movies = moviesQuery.rows;

        console.log('Sending response with actor details and movies'); // Debug log
        res.json({ actor, movies });
    } catch (error) {
        console.error('Error fetching actor details:', error); // Error log
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server and listen on port 3000
// This means the server will wait for incoming requests on port 3000
app.listen(3000, () => {
    console.log('Server running on port 3000'); // Log message when server starts
});