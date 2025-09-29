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
exports.ActionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const action_entity_js_1 = require("../../typeorm/entities/action.entity.js");
const typeorm_2 = require("@nestjs/typeorm");
let ActionService = class ActionService {
    actionRepository;
    constructor(actionRepository) {
        this.actionRepository = actionRepository;
    }
    async getAllActions() {
        return (await this.actionRepository.find());
    }
    async getActionById(id) {
        const action = await this.actionRepository.findOneBy({
            actionUUID: id,
        });
        if (action) {
            return action;
        }
        else {
            throw new common_1.NotFoundException();
        }
    }
    async createAction(action) {
        const existingAction = await this.actionRepository.findOne({
            where: { name: action.name },
        });
        if (existingAction) {
            throw new common_1.HttpException(`Role ${existingAction.name} already exists`, common_1.HttpStatus.BAD_REQUEST);
        }
        const actionEntity = this.actionRepository.create(action);
        return await this.actionRepository.save(actionEntity);
    }
    async updateAction(id, newAction) {
        const oldAction = await this.actionRepository.findOneBy({ actionUUID: id });
        if (!oldAction) {
            throw new common_1.NotFoundException();
        }
        const updatedAction = this.actionRepository.merge(oldAction, newAction);
        return this.actionRepository.save(updatedAction);
    }
    async patchAction(id, partialAction) {
        const oldAction = await this.actionRepository.findOneBy({
            actionUUID: id,
        });
        if (!oldAction) {
            throw new common_1.NotFoundException();
        }
        const updatedAction = this.actionRepository.merge(oldAction, partialAction);
        return this.actionRepository.save(updatedAction);
    }
    async deleteActionById(id) {
        const deleteResult = await this.actionRepository.delete(id);
        if (!deleteResult.affected) {
            throw new common_1.NotFoundException();
        }
        return { message: `Deleted action with id ${id}` };
    }
};
exports.ActionService = ActionService;
exports.ActionService = ActionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(action_entity_js_1.ActionEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], ActionService);
//# sourceMappingURL=action.service.js.map