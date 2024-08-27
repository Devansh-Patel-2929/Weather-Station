// index.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

let latestData = {
  temperature: null,
  humidity: null
};

// Middleware to parse JSON
app.use(express.json());

// Route to receive data from ESP8266
app.post('/update', (req, res) => {
  const { temperature, humidity } = req.body;

  if (temperature !== undefined && humidity !== undefined) {
    latestData.temperature = temperature;
    latestData.humidity = humidity;
    res.status(200).send('Data received');
  } else {
    res.status(400).send('Invalid data');
  }
});

// Route to get the latest data
app.get('/data', (req, res) => {
  res.json(latestData);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
