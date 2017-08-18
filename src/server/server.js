import express from 'express';
import path from 'path';
import reactRoutes from './reactRoutes';
import api from './api';

const app = express();

// Serve static assets
app.use(express.static(path.join(__dirname, '../../dist/public')));

// Server side rendering of React pages
app.use('*', reactRoutes);

// Example api route
api(app);

// 404
app.get('*', (req, res) => {
  res.status(404).end();
});

export default app;
