import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  bail: 0,
  clearMocks: true,
  collectCoverage: false,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/'],
  coverageProvider: 'v8',
  coverageReporters: ['json', 'text', 'lcov', 'clover'],
  verbose: false,
  moduleNameMapper: {
    '@config/(.*)': '<rootDir>/src/config/$1',
    '@controllers/(.*)': '<rootDir>/src/controllers/$1',
    '@middlewares/(.*)': '<rootDir>/src/middlewares/$1',
    '@routes/(.*)': '<rootDir>/src/routes/$1'
  }
}

export default config
