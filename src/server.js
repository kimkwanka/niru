/* eslint-disable react/jsx-filename-extension */
const serverRenderer = require('../srender.bundle.js').serverRenderer;
const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 8080;

// Serve static assets
app.use(express.static(path.join(__dirname, '../public')));

// Render server-side React + React-Routes
app.use(serverRenderer());

app.listen(PORT, () => {
  console.log(`Express server running at ${PORT}`);
});
