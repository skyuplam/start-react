/*
 * Koa Middlerware for handling error
 *
 */

const middleware = (options) => async function errorHandlerMiddleware(ctx, next) {
  try {
    await next();
  } catch (err) {
    if (err.status === 400) {
      // Handle 404 error, Note: the frontend middleware has already handle
      // 404 path, but it is a good practise to safe guard here
      ctx.status = 400;
      ctx.body = 'Page not found!';
    } else {
      ctx.status = 500;
      ctx.body = 'Sorry, an unexpected error occurred.';

      await next();
    }
  }
};


export default middleware;
