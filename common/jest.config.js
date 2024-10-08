export default {
  setupFilesAfterEnv: ['./src/setup-tests.ts'],
  coverageDirectory: './coverage',
  moduleNameMapper: {
    '(.*).js$': '$1',
  },
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
};
