declare const _default: () => {
    development: {
        type: string;
        host: string;
        username: string;
        password: string;
        database: string;
        port: number;
        autoLoadEntities: boolean;
        synchronize: boolean;
        logging: boolean;
        migrationsRun: boolean;
        entities: string[];
        seeds: string[];
        migrations: string[];
        factories: string[];
        cli: {
            migrationsDir: string;
        };
    };
    test: {
        type: string;
        host: string;
        username: string;
        password: string;
        database: string;
        port: number;
        autoLoadEntities: boolean;
        synchronize: boolean;
        logging: boolean;
    };
    staging: {};
    production: {};
};
export default _default;
