/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './modules/routes';

const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 8080;

// Serve static assets
app.use(express.static(path.join(__dirname, '../public')));

const renderPage = appHtml => (
  `<!doctype html>
    <html>
    <meta charset=utf-8/>
    <title>My First React Router App</title>
    <link rel=stylesheet href='https://cdnjs.cloudflare.com/ajax/libs/milligram/1.3.0/milligram.min.css'>
    <div id=app>${appHtml}</div>
    <script src="/bundle.js"></script>
   `);

app.get('*', (req, res) => {
  match({ routes, location: req.url }, (err, redirect, props) => {
    // in here we can make some decisions all at once
    if (err) {
      // there was an error somewhere during route matching
      res.status(500).send(err.message);
    } else if (redirect) {
      // we haven't talked about `onEnter` hooks on routes, but before a
      // route is entered, it can redirect. Here we handle on the server.
      res.redirect(redirect.pathname + redirect.search);
    } else if (props) {
      // if we got props then we matched a route and can render
      const appHtml = renderToString(<RouterContext {...props} />);
      res.send(renderPage(appHtml));
    } else {
      // no errors, no redirect, we just didn't match anything
      res.status(404).send('Not Found');
    }
  });
});

// app.get('*', (req, res) => {
//   // match the routes to the url
//   match({ routes, location: req.url }, (err, redirect, props) => {
//     // `RouterContext` is what the `Router` renders. `Router` keeps these
//     // `props` in its state as it listens to `browserHistory`. But on the
//     // server our app is stateless, so we need to use `match` to
//     // get these props before rendering.
//     const appHtml = renderToString(<RouterContext {...props} />);

//     // dump the HTML into a template, lots of ways to do this, but none are
//     // really influenced by React Router, so we're just using a little
//     // function, `renderPage`
//     res.send(renderPage(appHtml));
//   });
// });

// send all requests to index.html so browserHistory in React Router works
// app.get('*', (req, res) => {
//  res.sendFile(path.join(__dirname, '../public', 'index.html'));
// });

app.listen(PORT, () => {
  console.log(`Express server running at ${PORT}`);
});
