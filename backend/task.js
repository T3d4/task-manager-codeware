import express from 'express';
import { config } from './config.js';
import Database from './database.js';
import { io } from './index.js';

const router = express.Router();

router.use(express.json());

// Development only - don't do in production
console.log(config);

// Create database object
const database = new Database(config);

router.get('/', async (_, res) => {
    try {
        // Return a list of tasks
        const tasks = await database.readAll();
        console.log(`tasks: ${JSON.stringify(tasks)}`);
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
});

router.post('/', async (req, res) => {
    try {
        // Create a task 
        const task = req.body;
        console.log(`task: ${JSON.stringify(task)}`);
        const rowsAffected = await database.create(task);
        // Emit newTask event to all connected clients
        io.emit('update');
        res.status(201).json({ rowsAffected });
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        // Get the task with the specified ID
        const taskId = req.params.id;
        console.log(`taskId: ${taskId}`);
        if (taskId) {
            const result = await database.read(taskId);
            console.log(`task: ${JSON.stringify(result)}`);
            res.status(200).json(result);
        } else {
            res.status(404);
        }
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        // Update the person with the specified ID
        const taskId = req.params.id;
        console.log(`taskId: ${taskId}`);
        const task = req.body;
        console.log(req.body)

        if (taskId && task) {
            delete task.id;
            if (taskId && task.hasOwnProperty('isComplete')) {
                // Update the task's completion status in the database
                const rowsAffected = await database.update(taskId, {
                    isComplete: task.isComplete
                });
                console.log(`task-to-patch: ${JSON.stringify(task)}`);
                console.log(`rows-affected:::${rowsAffected}`)
                io.emit('update');
                res.status(200).json({ rowsAffected });
            }
            if (taskId && task.hasOwnProperty('title')) {
                // Update the task's completion status in the database
                const rowsAffected = await database.update(taskId, {
                    title: task.title
                });
                console.log(`task-to-patch: ${JSON.stringify(task)}`);
                console.log(`rows-affected:::${rowsAffected}`)
                io.emit('update');
                res.status(200).json({ rowsAffected });
            }
            else {
                res.status(404);
            }
        }
    }
    catch (err) {
        res.status(500).json({ error: err?.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        // Delete the person with the specified ID
        const taskId = req.params.id;
        console.log(`taskId: ${taskId}`);

        if (!taskId) {
            res.status(404);
        } else {
            const rowsAffected = await database.delete(taskId);
            io.emit('update');
            res.status(204).json({ rowsAffected });
        }
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
});
export default router;