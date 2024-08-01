import { pathsToModuleNameMapper } from 'ts-jest';

import baseConfig from '../../jest.config';

import { compilerOptions } from './tsconfig.json';

import type { Config } from 'jest';

const config: Config = {
    ...baseConfig,
    rootDir: '.',
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>' }),
};

export default config;
