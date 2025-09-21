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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleActionEntity = void 0;
const typeorm_1 = require("typeorm");
let RoleActionEntity = class RoleActionEntity {
    roleUUID;
    actionUUID;
};
exports.RoleActionEntity = RoleActionEntity;
__decorate([
    (0, typeorm_1.PrimaryColumn)('uuid', { name: 'role_id' }),
    __metadata("design:type", String)
], RoleActionEntity.prototype, "roleUUID", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)('uuid', { name: 'action_id' }),
    __metadata("design:type", String)
], RoleActionEntity.prototype, "actionUUID", void 0);
exports.RoleActionEntity = RoleActionEntity = __decorate([
    (0, typeorm_1.Entity)('role_action')
], RoleActionEntity);
//# sourceMappingURL=roleAction.entity.js.map