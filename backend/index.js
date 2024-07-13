require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('./db/connection'); // Import database connection
const router = require('./routes/router');

const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow only these HTTP methods
    allowedHeaders: 'Content-Type, Authorization', // Allow only these headers
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(router);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.status(200).json('Server running');
});

app.listen(PORT, () => {
    console.log(`Your server is running on port ${PORT}`);
});
