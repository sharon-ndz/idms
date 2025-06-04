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
exports.AuditTrailService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const audit_trail_entity_1 = require("../../entities/audit-trail.entity");
const roles_1 = require("../../middlewares/roles");
const functions_helpers_1 = require("../../core/helpers/functions.helpers");
let AuditTrailService = class AuditTrailService {
    constructor(auditTrailRepository) {
        this.auditTrailRepository = auditTrailRepository;
    }
    async record(data) {
        await this.auditTrailRepository.insert(data);
    }
    async findAll(data, user) {
        const response = { success: false, message: '', data: null };
        const search = data.search || null;
        const limit = Number(data.resultPerPage || 10);
        const page = Number(data.page || 1);
        const offset = (page - 1) * limit;
        const allowedRoleIds = [roles_1.Role.LASDRI_ADMIN, roles_1.Role.LASDRI];
        if (data.roleId) {
            allowedRoleIds.push(data.roleId);
        }
        const whereCondition = {
            user: {
                roleId: (0, typeorm_2.In)(allowedRoleIds),
            },
        };
        if (search) {
            whereCondition.dbAction = (0, typeorm_2.ILike)(`%${search}%`);
            whereCondition.tableName = (0, typeorm_2.ILike)(`%${search}%`);
            whereCondition.description = (0, typeorm_2.ILike)(`%${search}%`);
        }
        try {
            const [result, count] = await this.auditTrailRepository.findAndCount({
                where: whereCondition,
                relations: {
                    user: true,
                },
                select: {
                    user: {
                        id: true,
                        firstName: true,
                        lastName: true,
                    },
                },
                order: { id: data.order },
                skip: offset,
                take: limit,
            });
            const formattedResult = result.map((item) => ({
                userId: item.userId,
                dbAction: item.dbAction,
                tableName: item.tableName,
                resourceId: item.resourceId,
                description: item.description,
                createdAt: item.createdAt,
                user: {
                    id: item.user.id,
                    firstName: item.user.firstName,
                    lastName: item.user.lastName,
                },
            }));
            response.success = true;
            response.message = 'Audit trail retrieved successfully';
            response.data = {
                result: formattedResult,
                pagination: (0, functions_helpers_1.getPagination)(count, page, offset, limit),
            };
            return response;
        }
        catch (error) {
            console.log(error);
            console.log(`Queried by ${user.id}`);
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
};
exports.AuditTrailService = AuditTrailService;
exports.AuditTrailService = AuditTrailService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(audit_trail_entity_1.AuditTrail)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AuditTrailService);
//# sourceMappingURL=audit-trail.service.js.map