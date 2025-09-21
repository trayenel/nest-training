"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actionProviders = void 0;
const action_entity_1 = require("../entities/action.entity");
exports.actionProviders = [
    {
        provide: 'ACTION_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(action_entity_1.ActionEntity),
        inject: ['DATA_SOURCE'],
    },
];
//# sourceMappingURL=action.providers.js.map