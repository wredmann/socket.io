const express = require('express');
const socket = require('socket.io');

const app = express();
const server = app.listen(4440, () => {
    console.log('listening on port 4440');
});

app.use(express.static('public'));

// socket setup
const io = socket(server);
io.on('connection', (socket) => {
    console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

    // Handle chat event
    socket.on('chat', (data) => {
        io.sockets.emit('chat', data);
    });

    //Handle typing event
    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);
    });
});
