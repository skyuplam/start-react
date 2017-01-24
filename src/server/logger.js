/* eslint-disable no-console */

import chalk from 'chalk';


const logger = {
  info: (info) => console.log(chalk.blue(info)),
  error: (err) => console.error(chalk.red(err)),
  debug: (msg) => console.log(chalk.green(msg)),
  warn: (msg) => console.log(chalk.yellow(msg)),
};


export default logger;
