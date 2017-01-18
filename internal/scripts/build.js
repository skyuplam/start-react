import webpack from 'webpack';
import clientConfig from '../webpack/client.prod.config';

const compiler = webpack(clientConfig);


compiler.run((err, stats) => {
  if (err) {
    return console.error(err);
  }

  console.log(stats.toString({ colors: true }));
});
