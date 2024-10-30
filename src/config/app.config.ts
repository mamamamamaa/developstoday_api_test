import * as process from 'process';

export const appConfig = () => ({
  port: parseInt(process.env.API_PORT) || 3333,
  prefix: process.env.API_PREFIX || 'api',
});
