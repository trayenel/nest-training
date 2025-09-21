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
exports.RoleEntity = void 0;
const typeorm_1 = require("typeorm");
const action_entity_1 = require("./action.entity");
let RoleEntity = class RoleEntity {
    roleUUID;
    name;
    actions;
};
exports.RoleEntity = RoleEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', { name: 'id' }),
    __metadata("design:type", String)
], RoleEntity.prototype, "roleUUID", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 10, name: 'name' }),
    __metadata("design:type", String)
], RoleEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => action_entity_1.ActionEntity),
    (0, typeorm_1.JoinTable)({
        name: 'role_action',
        joinColumn: { name: 'role_id', referencedColumnName: 'roleUUID' },
        inverseJoinColumn: { name: 'action_id', referencedColumnName: 'actionUUID' },
    }),
    __metadata("design:type", Array)
], RoleEntity.prototype, "actions", void 0);
exports.RoleEntity = RoleEntity = __decorate([
    (0, typeorm_1.Entity)('role')
], RoleEntity);
//# sourceMappingURL=role.entity.js.map