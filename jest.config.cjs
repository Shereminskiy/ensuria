module.exports = {
  testEnvironment: "node",
  collectCoverage: true,
  coverageDirectory: "coverage",
  testMatch: [],
  transformIgnorePatterns: ["[/\\\\\\\\]node_modules[/\\\\\\\\].+\\\\.(js|ts)$"],
  coveragePathIgnorePatterns: ["/node_modules/"],
  globalSetup: "./tests/setup.js",
  globalTeardown: "./tests/setup.js",
  moduleFileExtensions: ["js"]
};
