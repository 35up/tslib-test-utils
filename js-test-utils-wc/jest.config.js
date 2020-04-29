module.exports = {
  setupFilesAfterEnv: ['./src/setup-tests.ts'],
  transformIgnorePatterns: [
    '/node_modules/(?!lit-element|lit-html)',
  ],
  coverageDirectory: './coverage',
  coverageReporters: ['lcov'],
  collectCoverageFrom: ['src/**/*.ts'],
  transform: {
    '^.+\\.[jt]s$': 'babel-jest',
  },
  testEnvironment: 'jsdom-sixteen',
};
