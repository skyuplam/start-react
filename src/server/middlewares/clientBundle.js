import serve from 'koa-static';
import { resolve } from 'path';



// middleware to serve client bundle
export default serve(
  resolve(process.cwd(), 'static'),
  { maxAge: '200d' }
);

