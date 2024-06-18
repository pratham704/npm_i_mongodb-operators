module.exports = {
    testEnvironment: 'node',

    testMatch: [
        '**/__tests__/**/*.js',
        '**/?(*.)+(spec|test).js'
    ],

    roots: [
        '<rootDir>/src',
        '<rootDir>/tests'
    ],

    testPathIgnorePatterns: [
        '<rootDir>/node_modules/',
    ],

    transform: {
        '^.+\\.js$': 'babel-jest'
    },

    setupFiles: [
        '<rootDir>/tests/setup.js'
    ],

    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80
        }
    }
};