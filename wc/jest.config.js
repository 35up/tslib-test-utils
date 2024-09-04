export default {
  setupFilesAfterEnv: ['./src/setup-tests.ts'],
  transformIgnorePatterns: [
    '/node_modules/(?!lit|@lit)',
  ],
  moduleNameMapper: {
    '^(?!lit)(.*)\.js$': '$1',
  },
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
    '^.+\\.ts$': ['ts-jest', {babelConfig: true, tsconfig: 'tsconfig.test.json'}],
  },
  testEnvironment: 'jsdom',
};
