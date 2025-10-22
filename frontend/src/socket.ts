// socket.ts
import { io, Socket } from 'socket.io-client'
import { SOCKET_BASE_URL } from './config.ts'
import type { Ticket } from './type/Ticket'
import type { User } from './type/User'

// ---- Type definitions ----

// Example of the events your server emits → client
interface ServerToClientEvents {
    'user:update': (user: User) => void
    'user:remove': (data: { id: string }) => void
    'user:create': (user: User) => void
    'ticket:update': (ticket: Ticket) => void
    'ticket:remove': (data: { id: string }) => void
    'ticket:create': (ticket: Ticket) => void
}

// Example of the events your client emits → server
interface ClientToServerEvents {
    'user:create': (user: User) => void
    'user:update': (user: User) => void
    'ticket:create': (ticket: Ticket) => void
    'ticket:update': (ticket: Ticket) => void
}

// ---- Socket Singleton ----

let socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null

/**
 * Connect to the Socket.IO backend for the given userId (or token).
 */
export function connectSocket(userId: string) {
    if (socket) return socket

    socket = io(SOCKET_BASE_URL, {
        auth: { userId },
        transports: ['websocket'],
    })

    socket.on('connect', () => {
        console.log('Connected to socket:', socket?.id)
    })

    socket.on('disconnect', () => {
        console.log('Disconnected from socket')
    })

    return socket
}

/**
 * Disconnect and clear the current socket instance.
 */
export function disconnectSocket(): void {
    if (socket) {
        socket.disconnect()
        socket = null
    }
}

/**
 * Get the active socket instance.
 * Throws an error if called before connectSocket().
 */
export function getSocket(): Socket<ServerToClientEvents, ClientToServerEvents> {
    if (!socket) {
        throw new Error('Socket not connected. Call connectSocket() first.')
    }
    return socket
}
