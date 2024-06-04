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

console.log('Database pool created with configuration:', dbConfig);

// Route to get a movie by ID along with its actors, like urls.py in Django
app.get('/movies/:id', async (req, res) => {
    console.log('Received request for movie details with ID:', req.params.id); // Debug log
    const movieId = req.params.id; // The ID of the movie to fetch

    try {
        // Fetching movie details by ID
        console.log('Fetching movie details by ID:', movieId);
        const movieQuery = await dbPool.query('SELECT * FROM movies WHERE id = $1', [movieId]);
        const movie = movieQuery.rows[0];

        // Fetching actors associated with the movie
        console.log('Fetching actors associated with the movie ID:', movieId);
        const actorsQuery = await dbPool.query(`
            SELECT a.* FROM actors a
            JOIN movie_actor_linkage ma ON a.id = ma.actor_id
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
        console.log('Fetching actor details by ID:', actorId);
        const actorQuery = await dbPool.query('SELECT * FROM actors WHERE id = $1', [actorId]);
        const actor = actorQuery.rows[0];

        // Fetching movies associated with the actor
        console.log('Fetching movies associated with the actor ID:', actorId);
        const moviesQuery = await dbPool.query(`
            SELECT m.* FROM movies m
            JOIN movie_actor_linkage ma ON m.id = ma.movie_id
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

// Route to get all movies, ordered by release date
app.get('/browse-movies', async (req, res) => {
    try {
        const moviesQuery = await dbPool.query('SELECT id, title, release_date FROM movies ORDER BY release_date ASC');
        res.json(moviesQuery.rows);
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Route to get all actors, ordered by last name
app.get('/browse-actors', async (req, res) => {
    console.log('Received request to browse all actors'); // Debug log
    try {
        console.log('Fetching all actors ordered by last name');
        const actorsQuery = await dbPool.query('SELECT first_name, last_name, sex, date_of_birth FROM actors ORDER BY last_name ASC');
        console.log('Actors fetched successfully');
        res.json(actorsQuery.rows);
    } catch (error) {
        console.error('Error fetching actors:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to get all rows and dimensions from the movie_actor_linkage table
app.get('/browse-movie-actor-linkage', async (req, res) => {
    console.log('Received request to browse all movie-actor linkages'); // Debug log
    try {
        console.log('Fetching all movie-actor linkages');
        const linkageQuery = await dbPool.query('SELECT * FROM movie_actor_linkage');
        console.log('Movie-actor linkages fetched successfully');
        res.json(linkageQuery.rows);
    } catch (error) {
        console.error('Error fetching movie-actor linkages:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server and listen on port 3000
// This means the server will wait for incoming requests on port 3000
app.listen(3000, () => {
    console.log('Server running on port 3000'); // Log message when server starts
});
