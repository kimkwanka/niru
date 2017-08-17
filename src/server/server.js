import express from 'express';
import path from 'path';
import reactRoutes from './reactRoutes';

const app = express();

app.use(express.static(path.join(__dirname, '../../dist/public')));
app.use('*', reactRoutes);

export default app;
