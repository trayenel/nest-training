"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoleProviders = void 0;
const userRole_entity_1 = require("../entities/userRole.entity");
exports.userRoleProviders = [
    {
        provide: 'USER_ROLE_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(userRole_entity_1.UserRoleEntity),
        inject: ['DATA_SOURCE'],
    },
];
//# sourceMappingURL=userRole.providers.js.map