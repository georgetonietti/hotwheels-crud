/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: 'jest-environment-jsdom',
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
