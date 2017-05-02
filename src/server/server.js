import express from 'express';
import reactRoutes from './reactRoutes';

const app = express();

app.use('*', reactRoutes);

export default app;
