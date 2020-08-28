module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    // Do not activate notifications. Tests running inside WSL will freeze in the end
    notify: false,
    // CoverageReporters: ['json', 'lcov', 'text', 'clover', 'text-summary'],
    coverageDirectory: '<rootDir>/coverage',
    modulePathIgnorePatterns: ['<rootDir>/test.old'],
};
