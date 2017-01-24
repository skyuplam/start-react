/**
 *
 * A Koa middleware that is capable of serving react appcaition.
 *
 */


import React from 'react';
import { renderToString } from 'react-dom/server';
import helmet from 'react-helmet';
import webpack from 'webpack';
import { ServerRouter, createServerRenderContext } from 'react-router';
import { devMiddleware, hotMiddleware } from 'koa-webpack-middleware';
import HTMLGenerator from './HTMLGenerator';
import logger from '../../logger';
import App from '../../../client/containers/App';
import ReactHotReloader from '../../../client/components/ReactHotReloader';

// function readFile(fs, path) {
  // return new Promise((resolve, reject) =>
    // fs.readFile(path, (err, file) =>
      // err ? reject(err) : resolve(file)
    // )
  // );
// }

// const getFsMiddleware = (fs, options) => async function fsMiddleware(ctx, next) {
  // const { path } = options;
  // const file = await readFile(fs, path);
  // await next();
  // return file;
// };


// Dev middleware
export const addDevMiddleware = (app, options) => {
  const { webpackConfig } = options;
  const clientBundler = webpack(webpackConfig);
  const clientMiddleware = devMiddleware(clientBundler, {
    quiet: true,
    noInfo: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    publicPath: webpackConfig.output.publicPath,
    index: 'index.html',
    stats: 'error-only',
  });

  clientBundler.plugin('done', (stats) => {
    if (stats.hasErrors()) {
      logger.error(stats.toString());
    } else {
      logger.info('Running the latest changes...');
    }
  });

  app.use(clientMiddleware);
  app.use(hotMiddleware(clientBundler));
};


const middleware = () => async function frontendMiddleware(ctx, next) {
  const { request, response } = ctx;

  // first create a context for <ServerRouter>, it's where we keep the
  // results of rendering for the second pass if necessary
  const context = createServerRenderContext();

  // render the first time
  const contentToBeRender = (
    <ServerRouter
      location={request.url}
      context={context}
    >
      <ReactHotReloader>
        <App />
      </ReactHotReloader>
    </ServerRouter>
  );
  const renderedString = renderToString(contentToBeRender);

  // Get the result
  const result = context.getResult();

  // The result will tell you if it redirected, if so. we ignore
  // the markup and send a proper redirect
  if (result.redirect) {
    response.status = 301;
    response.header.location = result.redirect.pathname;

    await next();
  }

  // the result will tell you if there were any misses, if so
  // we can send a 404 and then do a second render pass with
  // the context to clue the <Miss> components into rendering
  // this time (on the client they know from componentDidMount)
  response.status = result.missed ? 404 : 200;
  response.type = 'text/html; charset=utf-8';
  response.body = HTMLGenerator({ renderedString, helmet: helmet.rewind() });

  await next();
};

export default middleware;
