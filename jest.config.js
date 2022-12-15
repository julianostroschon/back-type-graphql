/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('node:path');

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
const rootDir = path.resolve(__dirname, '../../');

/** @type {import('jest').Config} */
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
