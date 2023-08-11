import { Server } from "socket.io"

export const createSocketServer = (server) => {
    const io = new Server(server);
    io.on('connection', (socket) => {
        io.emit('connection');
        console.log('A client connected');

        socket.on('disconnect', () => {
            console.log('A client disconnected');
        });
    });
    return io;
};

