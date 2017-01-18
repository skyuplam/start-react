import 'babel-polyfill';
import Koa from 'koa';
import mount from 'koa-mount';
import compress from 'koa-compress';
import config from './config';
import frontendMiddleware, { addDevMiddleware } from './middlewares/frontend';
import errorHandlerMiddleware from './middlewares/errorHandler';
import webpackClientConfig from '../../internal/webpack/client.dev.config';
import clientBundle from './middlewares/clientBundle';


const app = new Koa();

// Gzip compress the response
app.use(compress());

// Frontend Middleware
addDevMiddleware(app, { webpackConfig: webpackClientConfig });

// Config for serving client bundle
app.use(mount('/static', clientBundle));

app.use(mount('/', frontendMiddleware()));

// Error Handler
app.use(errorHandlerMiddleware);

const server = app.listen(config.port, config.host, () =>
  console.log(`Server listening on port ${config.port}`),
);

export default server;
