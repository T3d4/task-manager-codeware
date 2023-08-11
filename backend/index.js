import express from 'express';
import { config } from './config.js';
import Database from './database.js';
import http from 'http';
import { createSocketServer } from './socketServer.js';


// Import App routes
import task from './task.js';

const port = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app)

// Development only - don't do in production
// Run this to create the table in the database
if (process.env.NODE_ENV === 'development') {
    const database = new Database(config);
    database
        .executeQuery(
            `CREATE TABLE Task (id int NOT NULL IDENTITY, title text, dateCreated date, isComplete bit NOT NULL);`
        )
        .then(() => {
            console.log('Table created');
        })
        .catch((err) => {
            // Table may already exist
            console.error(`Error creating table: ${err}`);
        });
}

// Connect App routes
app.use(express.static('../build'))
app.use(express.json())
app.use('/api/v1/tasks', task);

// Start the server
server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

export const io = createSocketServer(server);