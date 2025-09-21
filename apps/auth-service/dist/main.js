"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const dotenv_1 = __importDefault(require("dotenv"));
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("./modules/auth/guards/jwt-auth.guard");
const role_guard_1 = require("./modules/auth/guards/role.guard");
const microservices_1 = require("@nestjs/microservices");
async function bootstrap() {
    dotenv_1.default.config();
    const app = await core_1.NestFactory.createMicroservice(app_module_1.AppModule, {
        transport: microservices_1.Transport.TCP,
    });
    app.useGlobalPipes(new common_1.ValidationPipe());
    const reflector = app.get(core_1.Reflector);
    const jwtAuthGuard = new jwt_auth_guard_1.JwtAuthGuard(reflector);
    const roleGuard = new role_guard_1.RoleGuard(reflector);
    app.useGlobalGuards(jwtAuthGuard, roleGuard);
    await app.listen();
}
bootstrap();
//# sourceMappingURL=main.js.map