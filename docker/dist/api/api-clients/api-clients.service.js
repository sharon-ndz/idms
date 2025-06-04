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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiClientsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const api_client_entity_1 = require("../../entities/api-client.entity");
const bcryptjs = __importStar(require("bcryptjs"));
const jwt_1 = require("@nestjs/jwt");
const messages_1 = require("../../core/constants/messages");
const constants_1 = require("../../core/constants/constants");
const enums_1 = require("../../core/constants/enums");
const functions_helpers_1 = require("../../core/helpers/functions.helpers");
const audit_trail_entity_1 = require("../../entities/audit-trail.entity");
let ApiClientsService = class ApiClientsService {
    constructor(apiClientRepository, auditTrailRepository, jwtService) {
        this.apiClientRepository = apiClientRepository;
        this.auditTrailRepository = auditTrailRepository;
        this.jwtService = jwtService;
    }
    async findAll(data) {
        const search = data.search || null;
        const limit = Number(data.resultPerPage || 10);
        const page = Number(data.page || 1);
        const offset = (page - 1) * limit;
        const whereCondition = {
            where: [
                { clientName: (0, typeorm_2.Like)(`%${search}%`) },
                { clientIdentity: (0, typeorm_2.Like)(`%${search}%`) },
                { clientEmail: (0, typeorm_2.Like)(`%${search}%`) },
                { clientPhone: (0, typeorm_2.Like)(`%${search}%`) },
            ],
        };
        const [result, count] = await this.apiClientRepository.findAndCount(whereCondition);
        return {
            result: result,
            pagination: (0, functions_helpers_1.getPagination)(count, page, offset, limit),
        };
    }
    async authenticate(clientData) {
        const client = await this.apiClientRepository.findOne({
            where: {
                clientIdentity: clientData.identity,
                isActive: enums_1.Status.Active,
            },
        });
        if (!client) {
            throw new common_1.NotFoundException('No client found with given credentials');
        }
        const isMatch = await bcryptjs.compare(clientData.secret, client.token);
        if (isMatch) {
            await this.auditTrailRepository.insert({
                userId: client.id,
                dbAction: constants_1.auditAction.LOGIN,
                tableName: 'api_clients',
                resourceId: client.id,
                description: `API client logged in successfully`,
            });
            const { token, createdAt, updatedAt, hash, ...data } = client;
            const jwtToken = this.jwtService.sign(data);
            const decodedJwt = this.jwtService.decode(jwtToken);
            const expiryTimestamp = new Date(decodedJwt.exp * 1000);
            return {
                success: true,
                access_token: jwtToken,
                expires: expiryTimestamp,
            };
        }
        throw new common_1.NotAcceptableException('Incorrect client credentials');
    }
    async create(data, user) {
        const response = { success: false, message: '', data: null };
        const hash = (0, functions_helpers_1.createConsistentHash)(`${data.clientName}.${data.clientEmail}.${data.clientPhone}.client`);
        const secret = (0, functions_helpers_1.hexCode)({ count: 8 });
        const token = await bcryptjs.hash(secret, 10);
        try {
            const record = this.apiClientRepository.create({
                clientIdentity: hash,
                clientEmail: data.clientEmail,
                clientPhone: data.clientPhone,
                clientName: data.clientName,
                isActive: enums_1.Status.Active,
                permissions: data.permissions,
                token: token,
                hash: hash,
            });
            if (record) {
                await this.auditTrailRepository.insert({
                    userId: user.id,
                    dbAction: constants_1.auditAction.RECORD_ADD,
                    tableName: 'api_clients',
                    resourceId: record.id,
                    description: `created new api client record`,
                });
            }
            response.success = true;
            response.message = messages_1.MESSAGES.recordAdded;
            response.data = record;
        }
        catch (error) {
            console.log(error);
            response.message = error.message;
            throw new common_1.InternalServerErrorException(response);
        }
        return response;
    }
    async changeStatus(data, user) {
        const success = true;
        const message = messages_1.MESSAGES.updateSuccessful;
        try {
            const record = await this.apiClientRepository.findOne({
                where: { id: data.id },
            });
            record.isActive = data.status;
            await this.apiClientRepository.save(record);
            await this.auditTrailRepository.insert({
                userId: user.id,
                dbAction: constants_1.auditAction.RECORD_MODIFIED,
                tableName: 'api_clients',
                resourceId: record.id,
                description: `updated api client status to ${data.status == 1 ? enums_1.sStatus.Active : enums_1.sStatus.Inactive}`,
            });
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException(error.message);
        }
        return { success, message };
    }
    async update(data, user) {
        let success = true;
        let message = messages_1.MESSAGES.updateSuccessful;
        try {
            const record = await this.apiClientRepository.findOne({
                where: { id: data.id },
            });
            if (record) {
                const formattedData = (0, functions_helpers_1.removeNullAndEmpty)(data);
                Object.assign(record, formattedData);
                await this.apiClientRepository.save(record);
                await this.auditTrailRepository.insert({
                    userId: user.id,
                    dbAction: constants_1.auditAction.RECORD_MODIFIED,
                    tableName: 'api_clients',
                    resourceId: record.id,
                    description: `updated api client record`,
                });
            }
            else {
                success = false;
                message = 'Record not found.';
            }
        }
        catch (err) {
            console.log(err);
            message = err.message;
            throw new common_1.InternalServerErrorException(message);
        }
        return { success, message };
    }
    async resetPassword(data, user) {
        const success = true;
        let message = messages_1.MESSAGES.updateSuccessful;
        const secret = (0, functions_helpers_1.hexCode)({ count: 8 });
        const token = await bcryptjs.hash(secret, 10);
        try {
            const record = await this.apiClientRepository.findOne({
                where: { id: data.id },
            });
            if (!record) {
                throw new common_1.NotFoundException('No API client found');
            }
            record.token = token;
            await this.apiClientRepository.save(record);
            await this.auditTrailRepository.insert({
                userId: user.id,
                dbAction: constants_1.auditAction.RECORD_MODIFIED,
                tableName: 'api_clients',
                resourceId: record.id,
                description: `Updated an API's client password`,
            });
        }
        catch (error) {
            console.log(error);
            message = error.message;
            throw new common_1.InternalServerErrorException(message);
        }
        return { success, message };
    }
};
exports.ApiClientsService = ApiClientsService;
exports.ApiClientsService = ApiClientsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(api_client_entity_1.ApiClient)),
    __param(1, (0, typeorm_1.InjectRepository)(audit_trail_entity_1.AuditTrail)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService])
], ApiClientsService);
//# sourceMappingURL=api-clients.service.js.map