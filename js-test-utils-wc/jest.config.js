module.exports = {
  setupFilesAfterEnv: ['./src/setup-tests.ts'],
  transformIgnorePatterns: [
    '/node_modules/(?!lit-element|lit-html)',
  ],
  coverageDirectory: './coverage',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  collectCoverageFrom: ['src/**/*.ts', '!src/index.ts'],
  transform: {
    '^.+\\.m?js$': 'babel-jest',
    '^.+\\.ts$': ['ts-jest', {babelConfig: true}],
  },
  testEnvironment: 'jsdom-sixteen',
};
