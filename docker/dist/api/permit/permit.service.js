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
exports.PermitService = void 0;
const common_1 = require("@nestjs/common");
const enums_1 = require("../../core/constants/enums");
const messages_1 = require("../../core/constants/messages");
const typeorm_1 = require("@nestjs/typeorm");
const student_entity_1 = require("../../entities/student.entity");
const typeorm_2 = require("typeorm");
const payment_service_1 = require("../payment/payment.service");
const permit_entity_1 = require("../../entities/permit.entity");
const general_1 = require("../../core/helpers/general");
const functions_helpers_1 = require("../../core/helpers/functions.helpers");
const constants_1 = require("../../core/constants/constants");
const audit_trail_entity_1 = require("../../entities/audit-trail.entity");
let PermitService = class PermitService {
    constructor(permitRepository, studentRepository, paymentService, auditTrailRepository) {
        this.permitRepository = permitRepository;
        this.studentRepository = studentRepository;
        this.paymentService = paymentService;
        this.auditTrailRepository = auditTrailRepository;
    }
    async stats(data) {
        const response = { success: false, message: '', data: null };
        try {
            const stats = {};
            stats.totalPermits = await this.permitRepository.count();
            if (!data.permitClassId ||
                (data.permitClassId && +data.permitClassId == enums_1.PermitClassType.LearnersPermit)) {
                stats.learnersPermits = await this.permitRepository.count({
                    where: { permitClassId: enums_1.PermitClassType.LearnersPermit },
                });
            }
            if (!data.permitClassId ||
                (data.permitClassId && +data.permitClassId == enums_1.PermitClassType.CoverNote)) {
                stats.coverNotePermits = await this.permitRepository.count({
                    where: { permitClassId: enums_1.PermitClassType.CoverNote },
                });
            }
            response.data = stats;
            response.success = true;
            response.message = messages_1.MESSAGES.recordFound;
        }
        catch (error) {
            console.log(error);
            response.message = error.message;
        }
        return response;
    }
    async findAll(data, user) {
        const response = { success: false, message: '', data: null };
        const search = data.search || null;
        const limit = Number(data.resultPerPage || 10);
        const page = Number(data.page || 1);
        const offset = (page - 1) * limit;
        const queryBuilder = this.permitRepository
            .createQueryBuilder('permits')
            .leftJoinAndSelect('permits.student', 'students')
            .select(['permits', 'students.id', 'students.studentNo', 'students.certificateNo']);
        if (data.permitClassId) {
            queryBuilder.where('permits.permitClassId = :permitClassId', {
                permitClassId: data.permitClassId,
            });
        }
        if (search) {
            queryBuilder.andWhere(new typeorm_2.Brackets((qb) => {
                qb.where('permits.permitNo ILIKE :search', { search: `%${search}%` })
                    .orWhere('permits.firstName ILIKE :search', { search: `%${search}%` })
                    .orWhere('permits.lastName ILIKE :search', { search: `%${search}%` });
            }));
        }
        queryBuilder.skip(offset);
        queryBuilder.take(limit);
        queryBuilder.orderBy('permits.id', 'DESC');
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
    async details(permitNo) {
        const response = { success: false, message: '', data: null };
        try {
            const permit = await this.permitRepository
                .createQueryBuilder('permits')
                .where('permits.permitNo = :permitNo', { permitNo })
                .leftJoinAndSelect('permits.student', 'students')
                .leftJoinAndSelect('students.application', 'dsa')
                .leftJoinAndSelect('dsa.applicantFiles', 'af')
                .leftJoinAndSelect('af.file', 'f')
                .select([
                'permits',
                'students.id',
                'students.studentNo',
                'students.certificateNo',
                'dsa.id',
                'dsa.trainingDurationId',
                'dsa.bloodGroupId',
                'dsa.maritalStatusId',
                'dsa.placeOfBirth',
                'dsa.nextOfKinName',
                'dsa.nextOfKinPhone',
                'dsa.nextOfKinRelationshipId',
                'dsa.nextOfKinNationalityId',
                'dsa.courseLevel',
                'dsa.occupationId',
                'af.id',
                'af.fileId',
                'af.documentType',
                'af.drivingSchoolApplicationId',
                'f',
            ])
                .getOne();
            if (!permit) {
                throw new common_1.BadRequestException(messages_1.MESSAGES.recordNotFound);
            }
            response.success = true;
            response.message = messages_1.MESSAGES.recordFound;
            response.data = permit;
        }
        catch (error) {
            console.log(error);
            response.message = error.message;
        }
        return response;
    }
    async issuePermit(data, user) {
        const response = { success: false, message: '', data: null };
        try {
            const payment = await this.paymentService.findPaymentBy({
                reference: data.reference,
                type: enums_1.TransactionType.permitIssuance,
                status: enums_1.PaymentStatus.Completed,
                used: enums_1.Reference.Unused,
            });
            if (!payment) {
                throw new common_1.NotFoundException('Payment reference not found or has been used');
            }
            const student = await this.studentRepository.findOne({
                where: { studentNo: data.studentNo },
                relations: ['application', 'drivingSchool'],
            });
            if (!student) {
                throw new common_1.BadRequestException('Student Record with supplied studentNo not found!');
            }
            if (!student.graduated) {
                throw new common_1.BadRequestException('Student yet to complete driving school training');
            }
            data.requestType = enums_1.PermitRequestType.New;
            const permitData = await this.buildPermitPayload(data, student, user);
            await this.auditTrailRepository.insert({
                userId: user.id,
                dbAction: constants_1.auditAction.RECORD_ADD,
                tableName: 'permits',
                resourceId: permitData.id,
                description: `Permit issuance with no ${permitData.permitNo} created successfully`,
            });
            payment.used = enums_1.Reference.Used;
            payment.status = enums_1.PaymentStatus.Used;
            await this.paymentService.update(payment.id, payment);
            response.success = true;
            response.message = messages_1.MESSAGES.recordAdded;
            response.data = { ...permitData, studentNo: data.studentNo };
        }
        catch (error) {
            console.log(error);
            response.message = error.message;
        }
        return response;
    }
    async buildPermitPayload(data, student, user) {
        const transaction = await this.paymentService.findPaymentBy({
            reference: data.reference,
        });
        const permitIssuanceData = await (0, general_1.getPermitIssuanceData)(data, this.permitRepository);
        const permitData = new permit_entity_1.Permit();
        permitData.studentId = student.id;
        permitData.reference = data.reference;
        permitData.transactionId = transaction.id;
        permitData.titleId = student.application.titleId;
        permitData.firstName = student.application.firstName;
        permitData.lastName = student.application.lastName;
        permitData.middleName = student.application.middleName;
        permitData.maidenName = student.application.maidenName;
        permitData.email = student.application.email;
        permitData.phone = student.application.phone;
        permitData.address = student.application.address;
        permitData.dateOfBirth = student.application.dateOfBirth;
        permitData.genderId = student.application.genderId;
        permitData.lgaId = student.drivingSchool.lgaId;
        permitData.stateId = student.drivingSchool.stateId;
        permitData.nationalityId = student.application.nationalityId;
        permitData.requestType = data.requestType;
        permitData.years = data.years;
        permitData.permitClassId = data.permitClassId;
        permitData.issuedById = user.id;
        permitData.permitNo = permitIssuanceData.permitNo;
        permitData.issuedAt = permitIssuanceData.issuedAt;
        permitData.expiryAt = permitIssuanceData.expiryAt;
        return await this.permitRepository.save(permitData);
    }
};
exports.PermitService = PermitService;
exports.PermitService = PermitService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(permit_entity_1.Permit)),
    __param(1, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __param(3, (0, typeorm_1.InjectRepository)(audit_trail_entity_1.AuditTrail)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        payment_service_1.PaymentService,
        typeorm_2.Repository])
], PermitService);
//# sourceMappingURL=permit.service.js.map