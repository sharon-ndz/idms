"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiClientsModule = void 0;
const common_1 = require("@nestjs/common");
const api_clients_service_1 = require("./api-clients.service");
const api_clients_controller_1 = require("./api-clients.controller");
const typeorm_1 = require("@nestjs/typeorm");
const api_client_entity_1 = require("../../entities/api-client.entity");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const jwt_strategy_1 = require("../../guards/jwt.strategy");
const users_module_1 = require("../users/users.module");
const constants_1 = require("../../core/constants/constants");
const audit_trail_entity_1 = require("../../entities/audit-trail.entity");
let ApiClientsModule = class ApiClientsModule {
};
exports.ApiClientsModule = ApiClientsModule;
exports.ApiClientsModule = ApiClientsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule,
            users_module_1.UsersModule,
            typeorm_1.TypeOrmModule.forFeature([api_client_entity_1.ApiClient, audit_trail_entity_1.AuditTrail]),
            jwt_1.JwtModule.register({
                secret: constants_1.jwtConstants.secret,
                signOptions: { expiresIn: '24h' },
            }),
        ],
        controllers: [api_clients_controller_1.ApiClientsController],
        providers: [api_clients_service_1.ApiClientsService, jwt_strategy_1.JwtStrategy],
        exports: [api_clients_service_1.ApiClientsService],
    })
], ApiClientsModule);
//# sourceMappingURL=api-clients.module.js.map