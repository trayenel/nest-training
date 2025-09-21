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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let UserService = class UserService {
    usersRepository;
    userRoleRepository;
    constructor(usersRepository, userRoleRepository) {
        this.usersRepository = usersRepository;
        this.userRoleRepository = userRoleRepository;
    }
    async getAllUsers() {
        const users = await this.usersRepository.find({
            relations: ['roles'],
        });
        if (!users || users.length === 0) {
            throw new common_1.NotFoundException();
        }
        return users.map(({ password, ...rest }) => {
            return rest;
        });
    }
    async getUserById(id) {
        const user = await this.usersRepository.findOne({
            where: {
                userUUID: id,
            },
            relations: ['roles', 'roles.actions'],
        });
        if (!user)
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        const { password, ...results } = user;
        return results;
    }
    async getUserByName(name) {
        const user = await this.usersRepository.findOneBy({
            name: name,
        });
        if (!user)
            throw new common_1.NotFoundException(`User ${name} not found`);
        const { password, ...results } = user;
        return results;
    }
    async createUser(user) {
        const userEntity = this.usersRepository.create(user);
        const savedUser = await this.usersRepository.save(userEntity);
        return savedUser;
    }
    async deleteUserById(id) {
        const result = await this.usersRepository.delete(id);
        if (!result.affected)
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
    }
    async updateUser(id, modifiedUser) {
        const userEntity = await this.usersRepository.findOneBy({
            userUUID: id,
        });
        if (!userEntity)
            throw new common_1.NotFoundException(`User with id ${id} not found`);
        const updatedUser = this.usersRepository.merge(userEntity, modifiedUser);
        await this.usersRepository.save(updatedUser);
        const { password, ...results } = updatedUser;
        return results;
    }
    async patchUser(id, partialUser) {
        const user = await this.usersRepository.findOneBy({
            userUUID: id,
        });
        if (!user)
            throw new common_1.NotFoundException(`User with id ${id} not found`);
        const updatedUser = this.usersRepository.merge(user, partialUser);
        await this.usersRepository.save(updatedUser);
        const { password, ...results } = updatedUser;
        return results;
    }
    async addUserRole(userId, roleId) {
        const user = await this.usersRepository.findOne({
            where: { userUUID: userId },
            relations: ['roles'],
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with id ${roleId} not found`);
        }
        user.roles.forEach((role) => {
            if (role.roleUUID === roleId) {
                throw new common_1.NotFoundException(`User ${user.name} already has ${role.name} role`);
            }
        });
        const userRole = this.userRoleRepository.create({
            userId: userId,
            roleId: roleId,
        });
        await this.userRoleRepository.save(userRole);
        return user;
    }
    async removeUserRole(userId, roleId) {
        const user = await this.usersRepository.findOne({
            where: { userUUID: userId },
            relations: ['roles'],
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID $ {userId} not found`);
        }
        for (const role of user.roles) {
            if (role.roleUUID === roleId) {
                await this.userRoleRepository.delete({
                    userId: userId,
                    roleId: roleId,
                });
                return {
                    message: `Role ${role.name} removed from user ${user.name}`,
                };
            }
        }
        throw new common_1.NotFoundException(`Role with id ${roleId} not found on user ${user.name}`);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('USER_REPOSITORY')),
    __param(1, (0, common_1.Inject)('USER_ROLE_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map