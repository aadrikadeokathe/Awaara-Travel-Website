const express = require('express');
const cors = require('cors');
const session = require('express-session');
const http = require('http');
const { Server } = require('socket.io');

// Routers
const bookingsRouter = require('./api/bookings');
const contactRouter = require('./api/contact');
const reviewsRouter = require('./api/reviews');
const usersRouter = require('./api/users');


const app = express();
const server = http.createServer(app);

// Debug middleware to log origin and CORS headers
app.use((req, res, next) => {
  console.log('Request Origin:', req.headers.origin);
  const send = res.send;
  res.send = function (body) {
    console.log('Response Headers:', res.getHeaders());
    send.call(this, body);
  };
  next();
});

// Configure allowed origins
const allowedOrigins = ['http://127.0.0.1:5500', 'http://localhost:5500'];

// CORS configuration
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Socket.io configuration
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
    credentials: true
  }
});

const PORT = 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(session({
  secret: 'awaara_travel_secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set to true if using HTTPS
    httpOnly: true,
    sameSite: 'none',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Attach io to app
app.locals.io = io;

// Routes
app.use('/api/bookings', bookingsRouter);
app.use('/api/contact', contactRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/users', usersRouter);

// Basic route
app.get('/', (req, res) => {
  res.send('Awaara Travel API Server is running!');
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({ success: false, message: 'Server error', error: err.message });
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route not found: ${req.url}` });
});

// Socket.io connection
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  socket.on('disconnect', () => console.log('Client disconnected:', socket.id));
});

// Start server
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}).on('error', (err) => {
  console.error('Server error:', err);
  process.exit(1);
});