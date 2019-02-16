/* eslint-disable no-console */
import http from 'http';
import ip from 'ip';

import app from './app';

const PORT = process.env.PORT || 8080;
const serverIP = ip.address();

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`\nExpress server running in ${process.env.NODE_ENV || 'development'} mode`);
  console.log(`Local:            http://localhost:${PORT}/`);
  console.log(`On Your Network:  http://${serverIP}:${PORT}/\n`);
});
