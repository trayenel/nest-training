"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const config_1 = require("@nestjs/config");
const typeorm_1 = require("typeorm");
exports.databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        inject: [config_1.ConfigService],
        useFactory: async (configService) => {
            console.log(configService.get('DATABASE_HOST'));
            const dataSource = new typeorm_1.DataSource({
                type: 'postgres',
                host: configService.get('DATABASE_HOST'),
                port: configService.get('DATABASE_PORT'),
                username: configService.get('DATABASE_USERNAME'),
                password: configService.get('DATABASE_PASSWORD'),
                database: configService.get('DATABASE_VENDOR'),
                schema: configService.get('DATABASE_SCHEMA'),
                entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
                migrations: [__dirname + '/../migrations/**/*.ts'],
                synchronize: false,
            });
            return dataSource.initialize();
        },
    },
];
//# sourceMappingURL=database.providers.js.map