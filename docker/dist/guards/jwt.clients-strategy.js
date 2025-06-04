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
exports.JwtAPIClientsStrategy = void 0;
const passport_jwt_1 = require("passport-jwt");
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const api_client_entity_1 = require("../entities/api-client.entity");
const constants_1 = require("../core/constants/constants");
const enums_1 = require("../core/constants/enums");
let JwtAPIClientsStrategy = class JwtAPIClientsStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt-strategy-api') {
    constructor(apiClientRepository) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: constants_1.jwtConstants.apiClientSecret,
        });
        this.apiClientRepository = apiClientRepository;
    }
    async validate(payload) {
        const client = await this.apiClientRepository.findOneBy({
            id: payload.id,
            isActive: enums_1.Status.Active,
        });
        if (!client) {
            throw new common_1.UnauthorizedException('Invalid Authorization key');
        }
        return {
            id: payload.id,
            clientName: payload.clientName,
            clientEmail: payload.clientEmail,
            clientPhone: payload.clientPhone,
        };
    }
};
exports.JwtAPIClientsStrategy = JwtAPIClientsStrategy;
exports.JwtAPIClientsStrategy = JwtAPIClientsStrategy = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(api_client_entity_1.ApiClient)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], JwtAPIClientsStrategy);
//# sourceMappingURL=jwt.clients-strategy.js.map