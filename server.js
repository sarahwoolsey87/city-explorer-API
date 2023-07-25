

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

  // Find the city in the weatherData that matches the provided lat, lon, and searchQuery
  const cityWeatherData = weatherData.find((weather) => {
    return (
      weather.lat.toString() === lat &&
      weather.lon.toString() === lon &&
      weather.searchQuery.toLowerCase() === searchQuery.toLowerCase()
    );
  });

  // If the city is not found, return an error
  if (!cityWeatherData) {
    return res.status(404).json({ error: 'City not found in the weather data.' });
  }

  // If the city is found, you can proceed with creating the Forecast objects in the next steps.
  // For now, you can return the cityWeatherData as a response to verify it is coming through correctly.

  res.json({ cityWeatherData });
});

// Start the server to listen on the defined port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
