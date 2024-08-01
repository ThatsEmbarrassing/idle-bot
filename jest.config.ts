import type { Config } from 'jest';

const config: Config = {
    clearMocks: true,
    coverageDirectory: 'coverage',
    collectCoverageFrom: ['src/**/*.ts', '!src/**/*.module.ts'],
    passWithNoTests: true,
    coveragePathIgnorePatterns: [
        'node_modules',
        'dist',
        'constants',
        'enums',
        'types',
        'errors',
        'index.ts',
    ],
    coverageThreshold: {
        global: {
            lines: 90,
            statements: 90,
            functions: 80,
            branches: 60,
        },
    },
    testEnvironment: 'node',
    preset: 'ts-jest',
    testMatch: ['**/*.+(spec|test).ts'],
    testPathIgnorePatterns: ['node_modules', 'dist', 'coverage'],
};

export default config;
