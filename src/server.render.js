import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './modules/routes';

const express = require('express');

const renderPage = appHtml => (
  `<!doctype html>
    <html>
    <meta charset=utf-8/>
    <title>My First React Router App</title>
    <link rel=stylesheet href='https://cdnjs.cloudflare.com/ajax/libs/milligram/1.3.0/milligram.min.css'>
    <div id=app>${appHtml}</div>
    <script src="/bundle.js"></script>
   `);

function serverRenderer() {
  return (req, res, next) => {
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
        res.status(200).send(renderPage(appHtml));
      } else {
        // no errors, no redirect, we just didn't match anything
        res.status(404).send('Not Found');
      }
    });    
  }
};

module.exports = {
  serverRenderer,
};