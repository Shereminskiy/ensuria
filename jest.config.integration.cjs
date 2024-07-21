const commonConfig = require("./jest.config.cjs");

module.exports = {
  ...commonConfig,
  transform: {},
  testMatch: ["**/specs/integration/**/?(*.)+(spec|test).[jt]s?(x)"],
  collectCoverageFrom: ["services/**/*.js", "routes/**/*.js", "database/repositories/*.js"],
  testTimeout: 30000,
  coverageDirectory: "coverage/integration"
};
