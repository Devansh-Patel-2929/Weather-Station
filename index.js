const express = require('express');
const app = express();
const port = 3000;

let latestData = {
  temperature: null,
  humidity: null
};

app.get('/update', (req, res) => {
  const temp = req.query.temp;
  const humidity = req.query.humidity;

  if (temp && humidity) {
    latestData.temperature = temp;
    latestData.humidity = humidity;
    res.send('Data received');
  } else {
    res.status(400).send('Invalid data');
  }
});

app.get('/data', (req, res) => {
  res.json(latestData);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
