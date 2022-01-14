import 'babel-polyfill';

import process from 'process';

import {server} from 'src/exes/webServer/server';
import {logger} from 'src/libs/js/logger';

// TODO: read from config instead of cli?
const port = parseInt(process.argv[2], 10);
server.listen(port, () =>
  logger(`[${new Date()}] Now listening on port: ${port}`),
);
