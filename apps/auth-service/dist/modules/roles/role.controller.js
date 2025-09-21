"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleController = void 0;
const actions_decorator_1 = require("../../shared/decorators/actions.decorator");
const common_1 = require("@nestjs/common");
const role_service_1 = require("./role.service");
const action_service_1 = require("../actions/action.service");
const actions_enum_1 = require("../../shared/models/enums/actions.enum");
const role_dto_1 = require("./dto/role.dto");
let RoleController = class RoleController {
    roleService;
    actionService;
    constructor(roleService, actionService) {
        this.roleService = roleService;
        this.actionService = actionService;
    }
    async getAllRoles() {
        return await this.roleService.getAllRoles();
    }
    async getRoleById(roleUUID) {
        return await this.roleService.getRoleById(roleUUID);
    }
    async createRole(newRole) {
        return await this.roleService.createRole(newRole);
    }
    async updateRole(roleUUID, modifiedRole) {
        return await this.roleService.updateRole(roleUUID, modifiedRole);
    }
    async addRoleAction(roleUUID, actionUUID) {
        const action = await this.actionService.getActionById(actionUUID);
        if (!action) {
            throw new common_1.BadRequestException('Action Not Found');
        }
        return await this.roleService.addRoleAction(roleUUID, actionUUID);
    }
    async removeRoleAction(roleUUID, actionUUID) {
        const action = await this.actionService.getActionById(actionUUID);
        if (!action) {
            throw new common_1.BadRequestException('Action Not Found');
        }
        return await this.roleService.removeRoleAction(roleUUID, actionUUID);
    }
    async deleteRole(roleUUID) {
        await this.roleService.deleteRole(roleUUID);
    }
};
exports.RoleController = RoleController;
__decorate([
    (0, actions_decorator_1.RequireAction)(actions_enum_1.ActionsEnum.READ_ROLE),
    (0, common_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "getAllRoles", null);
__decorate([
    (0, actions_decorator_1.RequireAction)(actions_enum_1.ActionsEnum.READ_ROLE),
    (0, common_1.Get)(':roleUUID'),
    __param(0, (0, common_1.Param)('roleUUID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "getRoleById", null);
__decorate([
    (0, actions_decorator_1.RequireAction)(actions_enum_1.ActionsEnum.CREATE_ROLE),
    (0, common_1.Post)('/'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [role_dto_1.RoleDto]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "createRole", null);
__decorate([
    (0, actions_decorator_1.RequireAction)(actions_enum_1.ActionsEnum.UPDATE_ROLE),
    (0, common_1.Post)(':roleUUID'),
    __param(0, (0, common_1.Param)('roleUUID', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, role_dto_1.RoleDto]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "updateRole", null);
__decorate([
    (0, common_1.Post)(':roleUUID/action/:actionUUID'),
    __param(0, (0, common_1.Param)('roleUUID', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Param)('actionUUID', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "addRoleAction", null);
__decorate([
    (0, common_1.Delete)(':roleUUID/action/:actionUUID'),
    __param(0, (0, common_1.Param)('roleUUID', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Param)('actionUUID', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "removeRoleAction", null);
__decorate([
    (0, actions_decorator_1.RequireAction)(actions_enum_1.ActionsEnum.DELETE_ROLE),
    (0, common_1.Delete)(':roleUUID'),
    __param(0, (0, common_1.Param)('roleUUID', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "deleteRole", null);
exports.RoleController = RoleController = __decorate([
    (0, common_1.Controller)('role'),
    __metadata("design:paramtypes", [role_service_1.RoleService,
        action_service_1.ActionService])
], RoleController);
//# sourceMappingURL=role.controller.js.map