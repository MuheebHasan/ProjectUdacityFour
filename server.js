// Importing necessary modules
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // To make external API calls

const app = express();
const port = 8000;

// Middleware
app.use(cors());
app.use(express.static('public'));  // Serve static files from 'public' folder

// Project Data Object
let projectData = {};

// Personal API Key for OpenWeatherMap API
const apiKey = '<your_api_key>&units=imperial';

// Server running feedback
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

