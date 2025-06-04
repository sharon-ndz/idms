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
exports.InspectionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const inspection_entity_1 = require("../../entities/inspection.entity");
const roles_1 = require("../../middlewares/roles");
const messages_1 = require("../../core/constants/messages");
const constants_1 = require("../../core/constants/constants");
const functions_helpers_1 = require("../../core/helpers/functions.helpers");
const audit_trail_entity_1 = require("../../entities/audit-trail.entity");
const all_dto_1 = require("../../core/interfaces/all.dto");
const enums_1 = require("../../core/constants/enums");
const driving_school_entity_1 = require("../../entities/driving-school.entity");
const helpers_1 = require("../../core/helpers");
const email_notification_entity_1 = require("../../entities/email-notification.entity");
const inspection_question_entity_1 = require("../../entities/inspection-question.entity");
let InspectionService = class InspectionService {
    constructor(inspectionRepository, auditTrailRepository, dataSource, inspectionQuestionRepository) {
        this.inspectionRepository = inspectionRepository;
        this.auditTrailRepository = auditTrailRepository;
        this.dataSource = dataSource;
        this.inspectionQuestionRepository = inspectionQuestionRepository;
    }
    async findAll(data, user) {
        const response = { success: false, message: '', data: null };
        const search = data.search || null;
        const limit = Number(data.resultPerPage || 10);
        const page = Number(data.page || 1);
        const offset = (page - 1) * limit;
        const { roleId, drivingSchoolId } = user;
        const queryBuilder = this.inspectionRepository
            .createQueryBuilder('inspections')
            .leftJoinAndSelect('inspections.drivingSchool', 'drivingSchool');
        if (roleId === roles_1.Role.SchoolAdmin && drivingSchoolId) {
            queryBuilder.where('inspections.drivingSchoolId = :drivingSchoolId', { drivingSchoolId });
        }
        if (search) {
            queryBuilder.andWhere(new typeorm_2.Brackets((qb) => {
                qb.where('inspections.name ILIKE :search', { search: `%${search}%` })
                    .orWhere('drivingSchool.name ILIKE :search', { search: `%${search}%` })
                    .orWhere('drivingSchool.identifier ILIKE :search', { search: `%${search}%` })
                    .orWhere('drivingSchool.email ILIKE :search', { search: `%${search}%` })
                    .orWhere('drivingSchool.phone ILIKE :search', { search: `%${search}%` });
            }));
        }
        queryBuilder.skip(offset);
        queryBuilder.take(limit);
        queryBuilder.orderBy('inspections.id', 'DESC');
        try {
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
            console.log(`Queried by ${user.id}`);
            response.message = error.message;
        }
        return response;
    }
    async create(data, user) {
        const response = { success: false, message: '', data: null };
        try {
            const inspection = await this.inspectionRepository.findOne({
                where: { month: data.month, year: data.year },
            });
            if (inspection) {
                throw new common_1.BadRequestException(messages_1.MESSAGES.recordExists);
            }
            const inspectionRecord = await this.inspectionRepository.insert(data);
            const id = inspectionRecord.raw[0].id;
            await this.auditTrailRepository.insert({
                userId: user.id,
                dbAction: constants_1.auditAction.RECORD_ADD,
                tableName: 'inspections',
                resourceId: id,
                description: `Inspection log with id ${id} created successfully`,
            });
            response.success = true;
            response.message = messages_1.MESSAGES.recordAdded;
            response.data = data;
        }
        catch (error) {
            console.log(error);
            response.message = error.message;
        }
        return response;
    }
    async getUserInspections(userId, data, user) {
        const response = { success: false, message: '', data: null };
        const limit = Number(data.resultPerPage || 10);
        const page = Number(data.page || 1);
        const offset = (page - 1) * limit;
        const queryBuilder = this.inspectionRepository
            .createQueryBuilder('inspections')
            .where('inspections.createdBy = :userId', { userId });
        if (data.status) {
            queryBuilder.andWhere('inspections.status = :status', { status: data.status });
        }
        if (data.createdAtStart && data.createdAtEnd) {
            queryBuilder.andWhere(`inspections.createdAt BETWEEN :start AND :end`, {
                start: data.createdAtStart,
                end: data.createdAtEnd,
            });
        }
        queryBuilder.skip(offset);
        queryBuilder.take(limit);
        queryBuilder.orderBy('inspections.createdAt', data.order || 'DESC');
        try {
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
            console.error(`Error occurred while querying by user ${user.id}:`, error);
            throw new common_1.InternalServerErrorException(error.message);
        }
        return response;
    }
    async getSingle(id) {
        const response = { success: false, message: '', data: null };
        try {
            const inspection = await this.inspectionRepository.findOne({
                where: { id },
                relations: ['drivingSchool'],
            });
            if (!inspection) {
                throw new common_1.BadRequestException(messages_1.MESSAGES.recordNotFound);
            }
            response.success = true;
            response.message = messages_1.MESSAGES.recordFound;
            response.data = inspection;
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException(error.message);
        }
        return response;
    }
    async uploadQuestions(data, user) {
        const response = { success: false, message: '', data: null };
        const queryRunner = await (0, all_dto_1.beginTransaction)(this.dataSource);
        try {
            const uploadedQuestions = await queryRunner.manager.save(inspection_question_entity_1.InspectionQuestion, {
                ...data,
                createdBy: { id: user.id }
            });
            await queryRunner.manager.insert(audit_trail_entity_1.AuditTrail, {
                userId: user.id,
                dbAction: constants_1.auditAction.RECORD_ADD,
                tableName: 'inspection_questions',
                resourceId: uploadedQuestions.id,
                description: `inspection_questions log with id ${uploadedQuestions.id} created successfully`,
            });
            await queryRunner.commitTransaction();
            response.success = true;
            response.message = messages_1.MESSAGES.questionsUploaded;
            response.data = uploadedQuestions;
        }
        catch (error) {
            console.error(`Error occurred while uploading questions by user ${user.id}:`, error);
            await queryRunner.rollbackTransaction();
            throw new common_1.InternalServerErrorException(error.message);
        }
        finally {
            await queryRunner.release();
        }
        return response;
    }
    async getInspectionQuestions(data, stateId, user) {
        const response = { success: false, message: '', data: null };
        const limit = Number(data.resultPerPage || 10);
        const page = Number(data.page || 1);
        const offset = (page - 1) * limit;
        const queryBuilder = this.inspectionQuestionRepository
            .createQueryBuilder('questions')
            .where('questions.stateId = :stateId', { stateId });
        queryBuilder.skip(offset);
        queryBuilder.take(limit);
        queryBuilder.orderBy('questions.createdAt', data.order || 'DESC');
        try {
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
            console.error(`Error occurred while querying by user ${user.id}:`, error);
            throw new common_1.InternalServerErrorException(error.message);
        }
        return response;
    }
    async submitInspection(data, user) {
        const response = { success: false, message: '', data: null };
        let queryReasons = [];
        const queryRunner = await (0, all_dto_1.beginTransaction)(this.dataSource);
        try {
            data.stateId = user.stateId;
            data.status = data.totalScore < 50 ? enums_1.InspectionStatus.Queried : enums_1.InspectionStatus.Approved;
            queryReasons = data.inspectionResult
                .filter((m) => m.choice !== 'Yes')
                .map((m) => m.comment);
            if (queryReasons.length > 0) {
                data.queryReasons = queryReasons;
            }
            const inspectionRecord = await queryRunner.manager.save(inspection_entity_1.Inspection, {
                ...data,
                createdBy: { id: user.id },
                drivingSchool: { id: data.drivingSchoolId },
            });
            const drivingSchoolStatus = data.status === enums_1.InspectionStatus.Queried
                ? enums_1.Reg.InspectionQueried
                : enums_1.Reg.Approved;
            await queryRunner.manager.update(driving_school_entity_1.DrivingSchool, { id: data.drivingSchoolId }, { status: drivingSchoolStatus });
            await queryRunner.manager.insert(audit_trail_entity_1.AuditTrail, {
                userId: user.id,
                dbAction: constants_1.auditAction.RECORD_ADD,
                tableName: 'inspections',
                resourceId: inspectionRecord.id,
                description: `Inspection log with id ${inspectionRecord.id} created successfully`,
            });
            const emailSubject = data.status === enums_1.InspectionStatus.Queried ? messages_1.MESSAGES.inspectionQueried : messages_1.MESSAGES.inspectionApproved;
            const emailContent = data.status === enums_1.InspectionStatus.Queried ? messages_1.MESSAGES.inspectionQueriedEmailBody(queryReasons) : messages_1.MESSAGES.inspectionApprovedEmailBody();
            const drivingSchool = await queryRunner.manager.findOne(driving_school_entity_1.DrivingSchool, {
                where: { id: inspectionRecord.drivingSchoolId },
            });
            await helpers_1.mailer
                .setSubject(emailSubject)
                .setMessage(emailContent)
                .setTo(drivingSchool.email)
                .setEmailNotificationRepository(queryRunner.manager.getRepository(email_notification_entity_1.EmailNotification))
                .sendDefault();
            await queryRunner.commitTransaction();
            response.success = true;
            response.message = messages_1.MESSAGES.recordAdded;
            response.data = data;
        }
        catch (error) {
            console.log(error);
            await queryRunner.rollbackTransaction();
            throw new common_1.InternalServerErrorException(error.message);
        }
        finally {
            await queryRunner.release();
        }
        return response;
    }
};
exports.InspectionService = InspectionService;
exports.InspectionService = InspectionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(inspection_entity_1.Inspection)),
    __param(1, (0, typeorm_1.InjectRepository)(audit_trail_entity_1.AuditTrail)),
    __param(3, (0, typeorm_1.InjectRepository)(inspection_question_entity_1.InspectionQuestion)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource,
        typeorm_2.Repository])
], InspectionService);
//# sourceMappingURL=inspection.service.js.map