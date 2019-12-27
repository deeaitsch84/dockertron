import {sharedEnvironment} from "./base";

export const AppConfig = {
  ...sharedEnvironment,
  production: true,
  environment: 'PROD'
};
