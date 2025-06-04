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
exports.DeviceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const device_entity_1 = require("../../entities/device.entity");
const node_entity_1 = require("../../entities/node.entity");
const device_dto_1 = require("./device.dto");
const class_transformer_1 = require("class-transformer");
const general_1 = require("../../core/helpers/general");
const enums_1 = require("../../core/constants/enums");
const users_service_1 = require("../users/users.service");
const audit_trail_entity_1 = require("../../entities/audit-trail.entity");
const all_dto_1 = require("../../core/interfaces/all.dto");
const messages_1 = require("../../core/constants/messages");
const constants_1 = require("../../core/constants/constants");
const functions_helpers_1 = require("../../core/helpers/functions.helpers");
let DeviceService = class DeviceService {
    constructor(deviceRepository, nodeRepository, usersService, auditTrailRepository, dataSource) {
        this.deviceRepository = deviceRepository;
        this.nodeRepository = nodeRepository;
        this.usersService = usersService;
        this.auditTrailRepository = auditTrailRepository;
        this.dataSource = dataSource;
    }
    async devices(data) {
        const response = { success: false, message: '', data: null };
        const search = data.search || null;
        const limit = Number(data.resultPerPage || 10);
        const page = Number(data.page || 1);
        const offset = (page - 1) * limit;
        try {
            const queryBuilder = this.deviceRepository.createQueryBuilder('devices');
            if (data.status) {
                queryBuilder.andWhere('devices.status = :status', { status: data.status });
            }
            if (search) {
                queryBuilder.andWhere(new typeorm_2.Brackets((qb) => {
                    qb.where('devices.license LIKE :search', { search: `%${search}%` })
                        .orWhere('devices.deviceId LIKE :search', { search: `%${search}%` })
                        .orWhere('devices.organizationCode LIKE :search', { search: `%${search}%` })
                        .orWhere('devices.deviceImei LIKE :search', { search: `%${search}%` });
                }));
            }
            queryBuilder.skip(offset);
            queryBuilder.take(limit);
            queryBuilder.orderBy('devices.id', 'DESC');
            const [result, count] = await queryBuilder.getManyAndCount();
            if (result) {
                response.data = {
                    result,
                    pagination: (0, functions_helpers_1.getPagination)(count, page, offset, limit),
                };
            }
            response.success = true;
            response.message = messages_1.MESSAGES.recordFound;
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException(error.message);
        }
        return response;
    }
    async create(data, user) {
        const response = { success: false, message: '' };
        try {
            const device = await this.deviceRepository.findOne({
                where: { deviceImei: data.deviceImei },
            });
            if (device) {
                throw new common_1.BadRequestException('Device already exists with an organization');
            }
            const organization = (0, general_1.findOrganizationByCode)(data.organizationCode);
            const payload = (0, class_transformer_1.plainToInstance)(device_entity_1.Device, data);
            payload.organizationName = organization.name;
            payload.status = enums_1.DeviceStatus.PENDING;
            await this.deviceRepository.save(payload);
            await this.auditTrailRepository.insert({
                userId: user.id,
                dbAction: constants_1.auditAction.RECORD_ADD,
                tableName: 'devices',
                resourceId: payload.id,
                description: `Added a new device`,
            });
            response.success = true;
            response.message = 'Device added successfully.';
        }
        catch (error) {
            console.log(error);
            response.message = error.message;
        }
        return response;
    }
    async preActivation(data) {
        const response = { success: false, message: '', data: null };
        try {
            const device = await this.deviceRepository.findOne({
                where: {
                    deviceImei: data.deviceImei,
                    organizationCode: data.organizationCode,
                    license: data.license,
                },
            });
            if (!device) {
                throw new common_1.BadRequestException('Device not found');
            }
            const user = await this.usersService.findUserBy({ email: data.requesterEmail });
            if (!user) {
                throw new common_1.BadRequestException('Requester with given information not found');
            }
            if (!device.deviceId) {
                device.deviceId = data.deviceId;
                await this.deviceRepository.update({ id: device.id }, device);
            }
            if (device.deviceId != data.deviceId) {
                throw new common_1.BadRequestException('License used');
            }
            const organization = (0, general_1.findOrganizationByCode)(data.organizationCode);
            const node = await this.nodeRepository.findOne({ where: { deviceId: data.deviceId } });
            if (!node) {
                const nodePayload = (0, class_transformer_1.plainToInstance)(node_entity_1.Node, data);
                nodePayload.organizationName = organization.name;
                nodePayload.status = enums_1.DeviceStatus.PENDING;
                await this.nodeRepository.save(nodePayload);
            }
            response.data = { deviceId: data.deviceId, hasNode: true };
            response.success = true;
            response.message = 'Pre activation request submitted successfully.';
        }
        catch (error) {
            console.log(error);
            response.message = error.message;
        }
        return response;
    }
    async checkActivationStatus(deviceId) {
        const response = { success: false, message: '', data: null };
        try {
            const node = await this.nodeRepository.findOne({
                where: { deviceId: deviceId },
                relations: { agents: true },
            });
            if (!node) {
                throw new common_1.BadRequestException('Pre activation request node not found.');
            }
            response.data = {
                status: node.status,
                deviceId: node.deviceId,
                noOfAgents: `${node.agents.length}`,
            };
            response.success = true;
            response.message = 'Query ok';
        }
        catch (error) {
            console.log(error);
            response.message = error.message;
        }
        return response;
    }
    async toggleApprovalStatus(data, user) {
        const response = { success: false, message: '' };
        try {
            const node = await this.nodeRepository.findOne({
                where: { id: +data.id },
            });
            if (!node) {
                throw new common_1.BadRequestException('Pre activation request node not found.');
            }
            node.status = data.status;
            if (data.status == enums_1.DeviceStatus.APPROVED) {
                node.activatedBy = { id: +user.id };
            }
            await this.nodeRepository.save(node);
            if (node.deviceId) {
                const device = await this.deviceRepository.findOne({ where: { deviceId: node.deviceId } });
                if (device) {
                    device.status = data.status;
                    await this.deviceRepository.update({ id: device.id }, device);
                }
            }
            response.success = true;
            response.message = 'Status updated successfully';
        }
        catch (error) {
            console.log(error);
            response.message = error.message;
        }
        return response;
    }
    async unlinkDevice(deviceImei) {
        const response = { success: false, message: '' };
        try {
            const device = await this.deviceRepository.findOne({ where: { deviceImei } });
            if (!device) {
                throw new common_1.BadRequestException('Device not found');
            }
            device.deviceId = null;
            await this.deviceRepository.save(device);
            const node = await this.nodeRepository.exists({ where: { deviceId: device.deviceId } });
            if (node) {
                await this.nodeRepository.softDelete({ deviceId: device.deviceId });
            }
            response.success = true;
            response.message = 'Device unlinked successfully';
        }
        catch (error) {
            console.log(error);
            response.message = error.message;
        }
        return response;
    }
    async deviceStats(user) {
        const response = { success: false, message: '', data: null };
        try {
            const stats = await this.deviceRepository
                .createQueryBuilder('device')
                .select([
                'COUNT(*)::int AS "totalDevices"',
                `SUM(CASE WHEN device.status = :approved THEN 1 ELSE 0 END)::int AS "activeDevices"`,
                `SUM(CASE WHEN device.status = :pending THEN 1 ELSE 0 END)::int AS "pendingDevices"`,
                `SUM(CASE WHEN device.status = :deactivated THEN 1 ELSE 0 END)::int AS "deactivatedDevices"`,
            ])
                .setParameters({
                approved: enums_1.DeviceStatus.APPROVED,
                pending: enums_1.DeviceStatus.PENDING,
                deactivated: enums_1.DeviceStatus.DEACTIVATED,
            })
                .getRawOne();
            response.data = {
                totalDevices: stats.totalDevices ?? 0,
                activeDevices: stats.activeDevices ?? 0,
                pendingDevices: stats.pendingDevices ?? 0,
                deactivatedDevices: stats.deactivatedDevices ?? 0,
            };
            response.success = true;
            response.message = 'Device statistics retrieved successfully.';
        }
        catch (error) {
            console.error(error);
            console.log('Queried by userId: ' + user.id);
            throw new common_1.InternalServerErrorException(error.message);
        }
        return response;
    }
    async getDeviceDetails(id) {
        const response = {
            success: false,
            message: '',
            data: null,
        };
        try {
            const device = await this.deviceRepository.findOne({
                where: { id },
            });
            if (!device) {
                throw new common_1.BadRequestException('Device not found');
            }
            const node = await this.nodeRepository.findOne({
                where: { deviceId: device.deviceId },
                relations: { agents: true },
            });
            const agents = node?.agents.map((agent) => ({
                id: agent.id,
                firstName: agent.firstName,
                lastName: agent.lastName,
                email: agent.email,
                phone: agent.phone,
                createdAt: agent.createdAt,
            })) || [];
            const agentActivityLogs = await Promise.all(node?.agents.map(async (agent) => {
                const auditTrails = await this.auditTrailRepository.find({
                    where: { userId: agent.id },
                    order: { createdAt: 'DESC' },
                });
                return {
                    logs: auditTrails.map((log) => ({
                        nameOfUser: `${agent.firstName} ${agent.lastName}`,
                        action: log.dbAction,
                        description: log.description,
                        createdAt: log.createdAt,
                    })),
                };
            }) || []);
            const deviceDetails = (0, class_transformer_1.plainToInstance)(device_dto_1.DeviceDetailDto, {
                id: device.id,
                deviceImei: device.deviceImei,
                license: device.license,
                type: device.type,
                organizationCode: device.organizationCode,
                organizationName: device.organizationName,
                status: device.status,
                createdAt: device.createdAt,
                agents,
                agentActivityLogs,
            });
            response.success = true;
            response.message = 'Device details retrieved successfully';
            response.data = deviceDetails;
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException(error.message);
        }
        return response;
    }
    async deactivateDevice(deviceImei) {
        const response = { success: false, message: '' };
        const queryRunner = await (0, all_dto_1.beginTransaction)(this.dataSource);
        try {
            const device = await queryRunner.manager.findOne(device_entity_1.Device, { where: { deviceImei } });
            if (!device) {
                throw new common_1.BadRequestException('Device not found');
            }
            device.status = enums_1.DeviceStatus.DEACTIVATED;
            await queryRunner.manager.save(device_entity_1.Device, device);
            const nodeExists = await queryRunner.manager.exists(node_entity_1.Node, {
                where: { deviceId: device.deviceId },
            });
            if (nodeExists) {
                await queryRunner.manager.softDelete(node_entity_1.Node, { deviceId: device.deviceId });
            }
            await queryRunner.commitTransaction();
            response.success = true;
            response.message = 'Device deactivated successfully.';
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            console.log(error);
            throw new common_1.InternalServerErrorException(error.message);
        }
        finally {
            await queryRunner.release();
        }
        return response;
    }
};
exports.DeviceService = DeviceService;
exports.DeviceService = DeviceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(device_entity_1.Device)),
    __param(1, (0, typeorm_1.InjectRepository)(node_entity_1.Node)),
    __param(3, (0, typeorm_1.InjectRepository)(audit_trail_entity_1.AuditTrail)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        users_service_1.UsersService,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], DeviceService);
//# sourceMappingURL=device.service.js.map