import express from "express";
import path from "path";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

import modelDataRouter from './routes/modelDataRouter.js';
import ticketsRouter from './routes/ticketsRouter.js';
import usersRouter from './routes/usersRouter.js';
import { users } from './data/mockData.js';
import { setupSocket } from './socket/socket.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Create HTTP + WebSocket server
const server = createServer(app);
const io = new Server(server, {
    cors: { origin: "*" }, // Allow frontend to connect
});
app.set("io", io);

// Basic middleware
app.use(cors());
app.use(express.json());

// Add current user to request
app.use((req, res, next) => {
    const userId = req.header('X-User-Id') || req.query.userId
    if (userId) {
        const user = users.find(u => u.id === userId)
        req.user = user
    }
    next()
});

// API routes
app.use('/api/modeldata', modelDataRouter)
app.use('/api/tickets', ticketsRouter)
app.use('/api/users', usersRouter)

app.get('/api/me', (req, res) => res.json(req.user))

// --- Login endpoint ---
app.post('/api/login', (req, res) => {
    const { email, password } = req.body
    const found = users.find(u => u.email === email)
    if (!found) return res.status(401).json({ error: 'Invalid email' })
    res.json(found.id)
})

// Serve images from the photos folder
app.use('/photos', express.static(path.join(process.cwd(), 'photos')));

// Handle WebSocket connections
setupSocket(io);

// Start server (HTTP + WebSocket)
server.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
);