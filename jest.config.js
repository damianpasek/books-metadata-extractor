module.exports = {
  moduleFileExtensions: ['js'],
  testMatch: ['**/*.test.js'],
  "transform": {
    "^.+\\.[t|j]sx?$": "babel-jest"
  },
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: 'coverage',
}
