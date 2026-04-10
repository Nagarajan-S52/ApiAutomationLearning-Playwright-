import { resolve } from "path";

const urls = require(resolve("./config/urls.json"));

const env = process.env.ENV || "qa";

const currentEnv = urls[env];


export class BaseUrl {
  static readonly restfulBooker = currentEnv.restfulBooker;
}


console.log(`Running tests on: ${env.toUpperCase()} Environment`);
