import Koa from 'koa';
import mount from 'koa-mount';
import compress from 'koa-compress';
import config from './config';
import frontendMiddleware from './middlewares/frontend';


const app = new Koa();

// Gzip compress the response
app.use(compress());

// Frontend Middleware
app.use(mount('/', frontendMiddleware()));

const server = app.listen(config.port, config.host, () =>
  console.log(`Server listening on port ${config.port}`),
);

export default server;
