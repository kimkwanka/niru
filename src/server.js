/* eslint-disable react/jsx-filename-extension */
require('babel-register')({
   presets: [ 'es2015', 'react' ]
});
const serverRenderer = require('./server.render.js').default;

const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 8080;

webpackDevHelper = require('./index.dev.js');
webpackDevHelper.useWebpackMiddleware(app);

// Serve static assets
//app.use(express.static(path.join(__dirname, '../public')));

// Render server-side React + React-Routes
app.use(serverRenderer());

app.listen(PORT, () => {
  console.log(`Express server running at ${PORT}`);
});
