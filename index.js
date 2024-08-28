const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

let latestData = {
  temperature: null,
  humidity: null
};

app.post('/update', (req, res) => {
    console.log('Request body:', req.body); // Log the incoming data
    
    const { temperature, humidity } = req.body;
    console.log(req.body);
    if (temperature !== undefined && humidity !== undefined) {
      if (typeof temperature === 'number' && typeof humidity === 'number') {
        latestData.temperature = temperature;
        latestData.humidity = humidity;
        res.status(200).send('Data received');
      } else {
        res.status(400).send('Invalid data type');
      }
    } else {
      res.status(400).send('Invalid data');
    }
  });
  
app.get('/data', (req, res) => {
  res.json(latestData);
});

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError) {
      console.error('Invalid JSON:', err.message);
      res.status(400).send('Invalid JSON format');
    } else {
      next(err);
    }
  });
  

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
