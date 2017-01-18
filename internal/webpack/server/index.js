import webpack from 'webpack';
import Koa from 'koa'
import { devMiddleware, hotMiddleware } from 'koa-webpack-middleware';
import clientConfig from '../client.dev.config';
import serverConfig from '../server.dev.config';


const clientCompiler = webpack(clientConfig);
const serverCompiler = webpack(serverConfig);

const app = new Koa();

const clientMiddleware = devMiddleware(clientCompiler, {
  quiet: false,
  noInfo: false,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  publicPath: '/',
  stats: { colors: true },
});

app.use(clientMiddleware);
app.use(hotMiddleware(clientCompiler));
app.use(() => serverCompiler.run((err, stats) => console.log(stats)));

const port = 3000;
const clientListener = app.listen(port, 'localhost', () =>
  console.log(`Server is listening on port ${port}`),
);

clientCompiler.plugin('compile', () => console.log('Building new bundle...'));
clientCompiler.plugin('done', (stats) => {
  if (stats.hasErrors()) {
    console.error(stats.toString());
  } else {
    // console.log('Running with latest changes.', stats.toString());
  }
});


