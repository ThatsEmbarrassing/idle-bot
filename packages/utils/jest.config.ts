import baseConfig from '../../jest.config';

import type { Config } from 'jest';

const config: Config = {
    ...baseConfig,
    rootDir: '.',
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
};

export default config;
