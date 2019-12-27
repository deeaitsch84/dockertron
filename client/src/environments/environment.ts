import sharedEnvironment from './base';

export const AppConfig = {
  ...sharedEnvironment,
  production: false,
  environment: 'LOCAL'
};
