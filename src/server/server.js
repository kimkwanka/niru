import express from 'express';

const app = express();

const path = require('path');

const handleReactRoutes = require('./handleReactRoutes').default;

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

app.get('*', handleReactRoutes);

app.use(express.static(path.join(__dirname, '../../dist/public')));

export default app;
