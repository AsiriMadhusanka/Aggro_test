require('dotenv').config();

// server.js

const express = require('express');
const cors = require('cors');
const app = express();
const dataRoutes = require('../src/routs/dataRouts');

app.use(cors());
app.use(express.json());
app.use('/data', dataRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
