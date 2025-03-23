const express = require('express');
const path = require('path');
const multer = require('multer');

// Create Express app
const app = express();

// Middleware setup
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(multer().none());

// Import routes in priority order
const adminRoutes = require('./admin');
const mainRoutes = require('./app');

// Apply routes in order
app.use('/admin', adminRoutes);
app.use('/', mainRoutes);

// Catch-all route for React app - must be last
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../piefest_frontend/build/index.html'));
});

const LOCAL_PORT = 3001;
const PORT = process.env.PORT || LOCAL_PORT;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});