"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
exports.default = () => ({
    development: {
        type: 'postgres',
        host: process.env.DB_HOST,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: parseInt(process.env.DB_PORT || '5432'),
        autoLoadEntities: true,
        synchronize: false,
        logging: true,
        migrationsRun: Boolean(process.env.AUTO_RUN_MIGRATIONS || true),
        entities: [(0, path_1.join)(__dirname, './../entities/*.entity{.ts,.js}')],
        seeds: [(0, path_1.join)(__dirname, './../database/seeders/*{.ts,.js}')],
        migrations: [(0, path_1.join)(__dirname, './../database/migrations/*{.ts,.js}')],
        factories: [(0, path_1.join)(__dirname, './../factories/*.factory{.ts,.js}')],
        cli: {
            migrationsDir: (0, path_1.join)(__dirname, './../database/migrations/'),
        },
    },
    test: {
        type: 'postgres',
        host: process.env.DB_TEST_HOST,
        username: process.env.DB_TEST_USERNAME,
        password: process.env.DB_TEST_PASSWORD,
        database: process.env.DB_TEST_NAME,
        port: parseInt(process.env.DB_TEST_PORT || '5432'),
        autoLoadEntities: true,
        synchronize: true,
        logging: false,
    },
    staging: {},
    production: {},
});
//# sourceMappingURL=index.js.map