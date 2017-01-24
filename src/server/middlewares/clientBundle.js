import serve from 'koa-static';
import { resolve } from 'path';



// middleware to serve client bundle
export default serve(
  resolve(process.cwd(), 'build'),
  { maxAge: '200d' }
);

