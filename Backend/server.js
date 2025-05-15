const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
const gameRoutes = require('./routes/gameRoutes');

const app = express();
const server = http.createServer(app);

// Setup Socket.IO
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // React app
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// Connect MongoDB
require('./config/db')();

// API Routes
app.use('/api/games', gameRoutes);

// Socket.IO Connection
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('move', (data) => {
    console.log('Game move:', data);
    socket.broadcast.emit('updateMove', data); // send to all except sender
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Start Server
server.listen(5000, () => {
  console.log('Server is running on port 5000');
});
