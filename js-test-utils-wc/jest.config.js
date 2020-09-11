module.exports = {
  setupFilesAfterEnv: ['./src/setup-tests.ts'],
  transformIgnorePatterns: [
    '/node_modules/(?!lit-element|lit-html)',
  ],
  coverageDirectory: './coverage',
  coverageReporters: ['lcov'],
  collectCoverageFrom: ['src/**/*.ts'],
  transform: {
    '^.+\\.m?js$': 'babel-jest',
    '^.+\\.ts$': ['ts-jest', {babelConfig: true}],
  },
  testEnvironment: 'jsdom-sixteen',
};
