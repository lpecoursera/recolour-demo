// socket/socket.js
import { users } from '../data/mockData.js';

/**
 * Initializes the Socket.IO server and attaches authentication.
 * @param {Server} io - Socket.IO server instance
 */
export function setupSocket(io) {
    io.use((socket, next) => {
        const userId = socket.handshake.auth.userId || socket.handshake.headers['x-user-id'];

        if (!userId) {
            return next(new Error("Unauthorized: missing userId"));
        }

        const user = users.find(u => u.id === userId);
        if (!user) {
            return next(new Error("Unauthorized: invalid user"));
        }

        socket.user = user;
        next();
    });

    io.on('connection', (socket) => {
        console.log(`+ Socket connected: ${socket.id}, user: ${socket.user.email}`);

        // Example: join a role-based room (for later use)
        //socket.join(`role:${socket.user.role}`);

        socket.on('disconnect', () => {
            console.log(`- Socket disconnected: ${socket.id}`);
        });
    });
}

/**
 * Emits an update only to authorized sockets.
 */
export function emitToAuthorized(io, eventName, payload, options = {}, canUserSeeFn) {
    const { clearEventName } = options;
    try {
        io.sockets.sockets.forEach(socket => {
            if (canUserSeeFn(socket.user, payload)) {
                socket.emit(eventName, payload);
            } else if (clearEventName) {
                socket.emit(clearEventName, { id: payload.id });
            }
        });
    } catch (err) {
        console.error(`Socket emit error for ${socket.id}:`, err);
    }
}
