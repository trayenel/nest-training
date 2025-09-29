"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("./modules/auth/guards/jwt-auth.guard");
const role_guard_1 = require("./modules/auth/guards/role.guard");
const microservices_1 = require("@nestjs/microservices");
const path_1 = require("path");
const dotenv = __importStar(require("dotenv"));
async function bootstrap() {
    const envPath = (0, path_1.resolve)(__dirname, '../.env.auth-service');
    dotenv.config({ path: envPath });
    const app = await core_1.NestFactory.createMicroservice(app_module_1.AppModule, {
        transport: microservices_1.Transport.TCP,
        options: {
            host: '127.0.0.1',
            port: 3301,
        },
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