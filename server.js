const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Define the path to the weather.json file
const weatherDataPath = path.join(__dirname, 'data', 'weather.json');

// Read the weather data from the weather.json file
const weatherData = JSON.parse(fs.readFileSync(weatherDataPath, 'utf8'));

// Enable CORS to allow requests from any origin
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Create the /weather API endpoint
app.get('/weather', (req, res) => {
  // Get lat, lon, and searchQuery from the query parameters
  const { lat, lon, searchQuery } = req.query;

  // Filter the weatherData array based on the provided lat, lon, and searchQuery
  const filteredWeatherData = weatherData.filter((weather) => {
    return (
      weather.lat.toString() === lat &&
      weather.lon.toString() === lon &&
      weather.searchQuery.toLowerCase() === searchQuery.toLowerCase()
    );
  });

  res.json(filteredWeatherData);
});

// Start the server to listen on the defined port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
