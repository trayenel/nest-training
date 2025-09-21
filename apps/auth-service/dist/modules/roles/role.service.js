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
exports.RoleService = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
let RoleService = class RoleService {
    roleRepository;
    roleActionRepository;
    constructor(roleRepository, roleActionRepository) {
        this.roleRepository = roleRepository;
        this.roleActionRepository = roleActionRepository;
    }
    async getAllRoles() {
        return await this.roleRepository.find({ relations: ['actions'] });
    }
    async getRoleById(id) {
        const role = await this.roleRepository.findOne({
            where: { roleUUID: id },
            relations: ['actions'],
        });
        if (!role) {
            throw new common_1.NotFoundException(`Role with id ${id} not found`);
        }
        return role;
    }
    async createRole(createRoleDto) {
        const existingRole = await this.roleRepository.findOne({
            where: { name: createRoleDto.name },
        });
        if (existingRole) {
            throw new common_1.HttpException(`Role ${existingRole.name} already exists`, common_1.HttpStatus.BAD_REQUEST);
        }
        const roleEntity = this.roleRepository.create(createRoleDto);
        return await this.roleRepository.save(roleEntity);
    }
    async updateRole(id, updatedRole) {
        const roleEntity = await this.roleRepository.findOneBy({
            roleUUID: id,
        });
        if (!roleEntity) {
            throw new common_1.NotFoundException(`Role with id ${id} not found`);
        }
        const updatedUser = this.roleRepository.merge(roleEntity, updatedRole);
        return await this.roleRepository.save(updatedUser);
    }
    async addRoleAction(roleUUID, actionId) {
        const role = await this.roleRepository.findOne({
            where: { roleUUID: roleUUID },
            relations: ['actions'],
        });
        if (!role) {
            throw new common_1.NotFoundException(`Role with id ${roleUUID} not found`);
        }
        role.actions.forEach((curAction) => {
            if (curAction.actionUUID === actionId) {
                throw new common_1.BadRequestException(`Action ${curAction.name} already exists on role ${role.name}`);
            }
        });
        const roleActionEntity = this.roleActionRepository.create({ roleUUID: role.roleUUID, actionUUID: actionId });
        return await this.roleActionRepository.save(roleActionEntity);
    }
    async removeRoleAction(roleUUID, actionId) {
        const role = await this.roleRepository.findOne({
            where: { roleUUID: roleUUID },
            relations: ['actions'],
        });
        if (!role) {
            throw new common_1.NotFoundException(`Role with id ${roleUUID} not found`);
        }
        for (const curAction of role.actions) {
            if (curAction.actionUUID === actionId) {
                await this.roleActionRepository.delete({
                    roleUUID: roleUUID,
                    actionUUID: actionId,
                });
                return {
                    message: `Action ${curAction.name} removed from role ${role.name}`,
                };
            }
        }
        throw new common_1.NotFoundException(`Action with id ${roleUUID} not found on role ${role.name}`);
    }
    async deleteRole(roleUUID) {
        const role = await this.roleRepository.findOne({
            where: { roleUUID: roleUUID },
        });
        if (!role) {
            throw new common_1.NotFoundException(`Role with id ${roleUUID} not found`);
        }
        await this.roleRepository.delete(roleUUID);
    }
};
exports.RoleService = RoleService;
exports.RoleService = RoleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ROLE_REPOSITORY')),
    __param(1, (0, common_1.Inject)('ROLE_ACTION_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], RoleService);
//# sourceMappingURL=role.service.js.map