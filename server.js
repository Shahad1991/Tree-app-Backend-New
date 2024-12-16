const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const checklistRoutes = require('./routes/checklistRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend URL
  credentials: true // Allow credentials (cookies, authorization headers, etc.)
}));
app.use(express.json());

// Routes
app.use('/api', userRoutes);
app.use('/api', checklistRoutes);
app.use('/api/auth', authRoutes);

// Start serveren
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});