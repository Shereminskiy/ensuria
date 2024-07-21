const commonConfig = require("./jest.config.cjs");

module.exports = {
  ...commonConfig,
  transform: {},
  testMatch: ["**/specs/unit/**/?(*.)+(spec|test).[jt]s?(x)"],
  collectCoverageFrom: ["services/**/*.js", "routes/**/*.js", "database/repositories/*.js"],
  coverageDirectory: "coverage/unit",
  testTimeout: 30000
};
