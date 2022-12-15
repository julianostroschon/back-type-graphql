/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/../src/$1',
  },
  preset: 'ts-jest',
  rootDir: './tests',
  setupFiles: ['<rootDir>/index.ts'],
  collectCoverageFrom: ['<rootDir>/../../src/**/*.ts'],
  coverageReporters: ['json', 'text', 'lcov', 'clover', 'html'],
  modulePathIgnorePatterns: ['<rootDir>/../../src/.*/__mocks__'],
};
