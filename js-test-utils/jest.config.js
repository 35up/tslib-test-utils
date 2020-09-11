module.exports = {
  setupFilesAfterEnv: ['./src/setup-tests.ts'],
  coverageDirectory: './coverage',
  coverageReporters: ['lcov'],
  collectCoverageFrom: ['src/**/*.ts'],
  transform: {
    '^.+\\.m?js$': 'babel-jest',
    '^.+\\.ts$': ['ts-jest', {babelConfig: true}],
  },
};
