import type { Config } from '@jest/types'
import dotenv from 'dotenv'
dotenv.config()

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  bail: 0,
  clearMocks: true,
  collectCoverage: false,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/'],
  moduleDirectories: ['node_modules', 'src'],
  coverageProvider: 'v8',
  coverageReporters: ['json', 'text', 'lcov', 'clover'],
  moduleFileExtensions: ['js', 'ts', 'json', 'node'],
  verbose: true,
  modulePaths: ['<rootDir>'],
  moduleNameMapper: {
    '@config/(.*)': '<rootDir>/src/config/$1',
    '@controllers/(.*)': '<rootDir>/src/controllers/$1',
    '@middlewares/(.*)': '<rootDir>/src/middlewares/$1',
    '@routes/(.*)': '<rootDir>/src/routes/$1',
    '@core/(.*)': '<rootDir>/src/core/$1',
    '@test/(.*)': '<rootDir>/test/$1'
  }
}

export default config
