/**
 *
 * A Koa middleware that is capable of serving react appcaition.
 *
 */


import React from 'react';
import { renderToString } from 'react-dom/server';
import helmet from 'react-helmet';
import webpack from 'webpack';
import { StaticRouter } from 'react-router';
import { devMiddleware, hotMiddleware } from 'koa-webpack-middleware';
import HTMLGenerator from './HTMLGenerator';
import logger from '../../logger';
import App from '../../../client/containers/App';


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
  const context = {};

  // render the first time
  const contentToBeRender = (
    <StaticRouter
      location={request.url}
      context={context}
    >
      <App />
    </StaticRouter>
  );
  const renderedString = renderToString(contentToBeRender);


  // The result will tell you if it redirected, if so. we ignore
  // the markup and send a proper redirect
  if (context.url) {
    response.status = 302;
    response.header.location = context.url;

    await next();
  }

  // the result will tell you if there were any misses, if so
  // we can send a 404 and then do a second render pass with
  // the context to clue the <Miss> components into rendering
  // this time (on the client they know from componentDidMount)
  response.status = 200;
  response.type = 'text/html; charset=utf-8';
  response.body = HTMLGenerator({ renderedString, helmet: helmet.rewind() });

  await next();
};

export default middleware;
