"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleActionProviders = void 0;
const roleAction_entity_1 = require("../entities/roleAction.entity");
exports.roleActionProviders = [
    {
        provide: 'ROLE_ACTION_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(roleAction_entity_1.RoleActionEntity),
        inject: ['DATA_SOURCE'],
    },
];
//# sourceMappingURL=roleAction.providers.js.map