"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleModule = void 0;
const common_1 = require("@nestjs/common");
const database_module_1 = require("../../typeorm/database.module");
const action_module_1 = require("../actions/action.module");
const role_controller_1 = require("./role.controller");
const role_service_1 = require("./role.service");
const action_service_1 = require("../actions/action.service");
const role_providers_1 = require("../../typeorm/providers/role.providers");
const action_providers_1 = require("../../typeorm/providers/action.providers");
const roleAction_providers_1 = require("../../typeorm/providers/roleAction.providers");
let RoleModule = class RoleModule {
};
exports.RoleModule = RoleModule;
exports.RoleModule = RoleModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule, action_module_1.ActionModule],
        controllers: [role_controller_1.RoleController],
        providers: [
            role_service_1.RoleService,
            action_service_1.ActionService,
            ...role_providers_1.roleProviders,
            ...action_providers_1.actionProviders,
            ...roleAction_providers_1.roleActionProviders,
        ],
    })
], RoleModule);
//# sourceMappingURL=role.module.js.map