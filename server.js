const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const pointsRoutes = require('./routes/pointsRoutes');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', userRoutes);
app.use('/api', pointsRoutes);

// Start serveren
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});