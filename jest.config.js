module.exports = {
  // do not activate notifications. Tests running inside WSL will freeze in the end
  notify: false,
  coverageReporters: ['json', 'lcov', 'text', 'clover', 'text-summary'],
  // coverageThreshold: {
  //   global: {
  //     branches: 80,
  //     functions: 80,
  //     lines: 80,
  //     statements: -10
  //   }
  // },
  coverageDirectory: '<rootDir>/coverage'
};
