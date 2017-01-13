/**
 *
 * A Koa middleware that is capable of serving react appcaition.
 *
 */


import React from 'react';
import { renderToString } from 'react-dom/server';
import helmet from 'react-helmet';
import { ServerRouter, createServerRenderContext } from 'react-router';
import HTMLGenerator from './HTMLGenerator';
import App from '../../../client/containers/App';


const middleware = (options) => {
  return async function frontendMiddleware(ctx, next) {
    const { request, response, res } = ctx;

    // first create a context for <ServerRouter>, it's where we keep the
    // results of rendering for the second pass if necessary
    const context = createServerRenderContext();

    // render the first time
    const contentToBeRender = (
      <ServerRouter
        location={request.url}
        context={context}
      >
        <App />
      </ServerRouter>
    );
    let renderedString = renderToString(contentToBeRender);

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
    response.body = HTMLGenerator({ renderedString, helmet: helmet.rewind() });

    await next();
  };
};

export default middleware;
