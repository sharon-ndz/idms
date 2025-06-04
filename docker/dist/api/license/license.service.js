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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LicenseService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const enums_1 = require("../../core/constants/enums");
const student_entity_1 = require("../../entities/student.entity");
const general_1 = require("../../core/helpers/general");
const cbt_service_1 = require("../cbt/cbt.service");
const pre_registration_entity_1 = require("../../entities/pre-registration.entity");
const email_notification_entity_1 = require("../../entities/email-notification.entity");
const license_entity_1 = require("../../entities/license.entity");
const license_file_entity_1 = require("../../entities/license-file.entity");
const all_dto_1 = require("../../core/interfaces/all.dto");
const constants_1 = require("../../core/constants/constants");
const driving_school_service_1 = require("../driving-school/driving-school.service");
const payment_service_1 = require("../payment/payment.service");
const aws_s3_1 = __importDefault(require("../../core/helpers/aws.s3"));
const users_service_1 = require("../users/users.service");
const roles_1 = require("../../middlewares/roles");
const driving_test_service_1 = require("../driving-test/driving-test.service");
const messages_1 = require("../../core/constants/messages");
const functions_helpers_1 = require("../../core/helpers/functions.helpers");
const helpers_1 = require("../../core/helpers");
let LicenseService = class LicenseService {
    constructor(studentRepository, preRegistrationRepository, licenseRepository, licenseFileRepository, emailNotificationRepository, cbtService, drivingTestService, drivingSchoolService, paymentService, userService, dataSource) {
        this.studentRepository = studentRepository;
        this.preRegistrationRepository = preRegistrationRepository;
        this.licenseRepository = licenseRepository;
        this.licenseFileRepository = licenseFileRepository;
        this.emailNotificationRepository = emailNotificationRepository;
        this.cbtService = cbtService;
        this.drivingTestService = drivingTestService;
        this.drivingSchoolService = drivingSchoolService;
        this.paymentService = paymentService;
        this.userService = userService;
        this.dataSource = dataSource;
    }
    async stats(data, user) {
        const response = { success: false, message: '', data: null };
        try {
            const type = data.type;
            const status = data.status;
            const queryBuilder = this.licenseRepository.createQueryBuilder('licenses');
            if (type !== 'all') {
                queryBuilder.where('licenses.request_type = :type', { type });
            }
            if (status) {
                queryBuilder.where('licenses.status = :status', { status });
            }
            const result = await queryBuilder.select('COUNT(*) AS totalLicenses').getRawOne();
            response.data = {
                totalLicenses: parseInt(result.totallicenses, 10) || 0,
            };
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
    async findAll(data, user) {
        const response = { success: false, message: '', data: null };
        const search = data.search || null;
        const limit = Number(data.resultPerPage || 10);
        const page = Number(data.page || 1);
        const offset = (page - 1) * limit;
        const queryBuilder = this.licenseRepository.createQueryBuilder('licenses');
        if (data.stateId) {
            queryBuilder.andWhere('licenses.stateId = :stateId', { stateId: data.stateId });
        }
        if (data.lgaId) {
            queryBuilder.andWhere('licenses.lgaId = :lgaId', { lgaId: data.lgaId });
        }
        if (data.status) {
            queryBuilder.andWhere(`licenses.status = :status`, {
                status: data.status,
            });
        }
        if (search) {
            queryBuilder.andWhere(new typeorm_2.Brackets((qb) => {
                qb.where('licenses.licenseNo LIKE :search', { search: `%${search}%` })
                    .orWhere('licenses.firstName LIKE :search', { search: `%${search}%` })
                    .orWhere('licenses.lastName LIKE :search', { search: `%${search}%` });
            }));
        }
        if (data.type && data.type !== 'all') {
            queryBuilder.andWhere(`licenses.isActive = :isActive`, {
                isActive: data.type === 'active' ? 1 : 0,
            });
        }
        if (data.requestType && data.requestType !== 'all') {
            queryBuilder.andWhere(`licenses.requestType = :requestType`, {
                requestType: data.requestType,
            });
        }
        queryBuilder.skip(offset);
        queryBuilder.take(limit);
        queryBuilder.orderBy('licenses.id', 'DESC');
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
    async preRegistrations(data, user) {
        const response = { success: false, message: '', data: null };
        const search = data.search || null;
        const limit = Number(data.resultPerPage || 10);
        const page = Number(data.page || 1);
        const offset = (page - 1) * limit;
        const queryBuilder = this.preRegistrationRepository.createQueryBuilder('pre_registrations');
        if (search) {
            queryBuilder.andWhere(new typeorm_2.Brackets((qb) => {
                qb.where('pre_registrations.applicationNo LIKE :search', {
                    search: `%${search}%`,
                }).orWhere('pre_registrations.reference LIKE :search', { search: `%${search}%` });
            }));
        }
        queryBuilder.skip(offset);
        queryBuilder.take(limit);
        queryBuilder.orderBy('pre_registrations.id', 'DESC');
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
    async details(data) {
        const response = { success: false, message: '', data: null };
        try {
            const registration = await this.preRegistrationRepository.findOne({
                where: { applicationNo: data.applicationId },
            });
            if (!registration) {
                throw new common_1.BadRequestException('Record with supplied applicationNo not found!');
            }
            const license = await this.licenseRepository.findOne({
                where: { preRegistrationId: registration.id },
                relations: ['licenseFiles.file', 'preRegistration.student.application'],
            });
            if (license.licenseFiles) {
                license.licenseFiles = await this.getBaseRecord(license.licenseFiles);
            }
            const licenseData = this.getLicenseInformation(license);
            response.success = true;
            response.message = messages_1.MESSAGES.recordFound;
            response.data = licenseData;
        }
        catch (error) {
            console.log(error);
            response.message = error.message;
        }
        return response;
    }
    async preRegistrationDetailsByStudent(studentId) {
        const response = { success: false, message: '', data: null };
        try {
            const registration = await this.preRegistrationRepository.findOne({
                where: { studentId: studentId, status: enums_1.PreRegistrationStatus.Processing },
                order: {
                    createdAt: 'DESC',
                },
            });
            if (!registration) {
                throw new common_1.BadRequestException(messages_1.MESSAGES.recordNotFound);
            }
            response.success = true;
            response.message = messages_1.MESSAGES.recordFound;
            response.data = {
                id: registration.id,
                applicationNo: registration.applicationNo,
                studentId: registration.studentId,
                cbtCenterId: registration.cbtCenterId,
                reference: registration.reference,
            };
        }
        catch (error) {
            console.log(error);
            response.message = error.message;
        }
        return response;
    }
    async detailsByLicenseNo(data) {
        const response = { success: false, message: '', data: null };
        try {
            const license = await this.licenseRepository.findOne({
                where: { licenseNo: data.licenseNo },
                relations: ['licenseFiles.file', 'preRegistration.student.application'],
            });
            if (license.licenseFiles) {
                license.licenseFiles = await this.getBaseRecord(license.licenseFiles);
            }
            const licenseData = this.getLicenseInformation(license);
            response.success = true;
            response.message = messages_1.MESSAGES.recordAdded;
            response.data = licenseData;
        }
        catch (error) {
            console.log(error);
            response.message = error.message;
        }
        return response;
    }
    async verifyLicense(data) {
        const response = { success: false, message: '', data: null };
        const certificateNo = data.drivingCertNo;
        if (certificateNo) {
            const student = await this.studentRepository.findOne({
                where: { certificateNo: certificateNo },
                relations: ['application.applicantFiles.file'],
            });
            if (student) {
                const license = await this.licenseRepository.findOne({
                    where: {
                        preRegistration: {
                            student: {
                                id: student.id,
                            },
                        },
                    },
                    relations: ['licenseFiles.file', 'preRegistration.student.application'],
                });
                if (!license) {
                    throw new common_1.BadRequestException('No license found with this certificate number!');
                }
                license.licenseFiles = await this.getBaseRecord(license.licenseFiles);
                response.success = true;
                response.message = messages_1.MESSAGES.recordFound;
                response.data = this.getLicenseInformation(license);
                return response;
            }
        }
        if (!certificateNo && data.licenseNo) {
            const license = await this.licenseRepository.findOne({
                where: { licenseNo: data.licenseNo },
                relations: ['licenseFiles.file', 'preRegistration.student.application'],
            });
            if (!license) {
                throw new common_1.BadRequestException('License with supplied license Number not found!');
            }
            license.licenseFiles = await this.getBaseRecord(license.licenseFiles);
            response.success = true;
            response.message = messages_1.MESSAGES.recordFound;
            response.data = this.getLicenseInformation(license);
            return response;
        }
        throw new common_1.BadRequestException('License with supplied license Number not found!');
    }
    async preRegistration(data, req) {
        const response = { success: false, message: '', data: null };
        const queryRunner = await (0, all_dto_1.beginTransaction)(this.dataSource);
        try {
            const student = await queryRunner.manager.findOne(student_entity_1.Student, {
                where: { certificateNo: data.certificateNo },
                relations: ['application'],
            });
            if (!student) {
                throw new common_1.BadRequestException('Record with certificateNo not found!');
            }
            if (data.direct) {
                data.applicationNo = (0, general_1.generatePreRegApplicationNo)(student);
            }
            data.studentId = student.id;
            data.drivingSchoolId = student.drivingSchoolId;
            if (!data.direct) {
                const cbtScheduleId = await this.cbtService.scheduleTest(student.id, data.cbtCenterId, {
                    lgaId: data.lgaId,
                    stateId: data.stateId,
                    date: data.date,
                    time: data.time,
                });
                if (cbtScheduleId) {
                    data.cbtScheduleId = +cbtScheduleId;
                }
                const center = await this.drivingTestService.findDrivingTestCenter(data.stateId, data.lgaId);
                if (center) {
                    const drivingTestScheduleId = await this.drivingTestService.scheduleTest(student.id, center.id, {
                        lgaId: data.lgaId,
                        stateId: data.stateId,
                        date: data.date,
                        time: data.time,
                        canCreate: true,
                    });
                    if (drivingTestScheduleId) {
                        data.drivingTestScheduleId = +drivingTestScheduleId;
                    }
                }
            }
            const preRegistrationRecord = await queryRunner.manager.insert(pre_registration_entity_1.PreRegistration, data);
            const preRegistrationId = preRegistrationRecord.raw[0].id;
            if (data.drivingTestScheduleId) {
                await this.drivingTestService.updateScheduleWithQueryRunner(data.drivingTestScheduleId, {
                    preRegistrationId: preRegistrationId,
                }, queryRunner);
            }
            if (data.files) {
                await this.savePreRegFileRecord(preRegistrationId, data.files);
            }
            let paymentResp;
            if (!data.direct) {
                const paymentPayload = {
                    type: enums_1.TransactionType.preRegistration,
                    email: student.application.email,
                    description: 'Payment for license pre registration',
                    successRedirectUrl: data.successRedirectUrl,
                    failureRedirectUrl: data.failureRedirectUrl,
                };
                paymentResp = await this.paymentService.initiate(paymentPayload, req);
                await queryRunner.manager.update(pre_registration_entity_1.PreRegistration, { id: preRegistrationId }, { reference: paymentResp.reference });
            }
            const fullName = [
                student.application.firstName,
                student.application.middleName,
                student.application.lastName,
            ].join(' ');
            if (data.applicationNo) {
                await helpers_1.mailer
                    .setSubject(messages_1.MESSAGES.preRegistrationEmailSubject)
                    .setMessage(messages_1.MESSAGES.preRegistrationEmailBody(data.applicationNo, fullName))
                    .setTo(student.application.email)
                    .setEmailNotificationRepository(this.emailNotificationRepository)
                    .sendDefault();
                await queryRunner.manager.update(pre_registration_entity_1.PreRegistration, { id: preRegistrationId }, { status: enums_1.PreRegistrationStatus.Processing });
            }
            response.data = {
                applicationNo: data.applicationNo,
                preRegistrationId: preRegistrationId,
                date: data.date,
                time: data.time,
            };
            if (paymentResp && paymentResp.success) {
                delete paymentResp.success;
                response.data = { ...response.data, ...paymentResp };
            }
            await queryRunner.commitTransaction();
            response.success = true;
            response.message = messages_1.MESSAGES.recordAdded;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            console.log(error);
            response.message = error.message;
        }
        finally {
            await queryRunner.release();
        }
        return response;
    }
    async licenseRenewalPreRegistration(data, req) {
        const response = { success: false, message: '', data: null };
        const queryRunner = await (0, all_dto_1.beginTransaction)(this.dataSource);
        try {
            const license = await queryRunner.manager.findOne(license_entity_1.License, {
                where: { licenseNo: data.oldLicenseNo },
                relations: ['preRegistration.student.application'],
            });
            if (!license) {
                throw new common_1.BadRequestException('Old license record was not found!');
            }
            if (license.isActive === enums_1.Status.Inactive) {
                throw new common_1.BadRequestException('Renewal already done for this license. Use the most recent license number!');
            }
            if (!(0, general_1.hasExpired)(license.issuedAt, license.expiryAt)) {
                throw new common_1.BadRequestException('Existing license is yet to expire. Please try again later.');
            }
            const student = license.preRegistration.student;
            data.applicationNo = (0, general_1.generatePreRegApplicationNo)(student);
            data.studentId = student.id;
            data.drivingSchoolId = student.drivingSchoolId;
            let drivingTestScheduleId;
            if (!data.direct) {
                drivingTestScheduleId = await this.drivingTestService.scheduleTest(student.id, data.drivingTestCenterId, {
                    lgaId: data.lgaId,
                    stateId: data.stateId,
                    date: data.date,
                    time: data.time,
                });
                data.drivingTestScheduleId = +drivingTestScheduleId;
            }
            const preRegistrationRecord = await this.preRegistrationRepository.insert(data);
            const preRegistrationId = preRegistrationRecord.raw[0].id;
            if (data.files) {
                for (const file of data.files) {
                    await queryRunner.manager.save(license_file_entity_1.LicenseFile, {
                        preRegistration: { id: preRegistrationId },
                        file: { id: file.fileId },
                        documentType: file.documentType,
                    });
                }
            }
            const fullName = [
                student.application.firstName,
                student.application.middleName,
                student.application.lastName,
            ].join(' ');
            if (data.applicationNo) {
                await helpers_1.mailer
                    .setSubject(messages_1.MESSAGES.preRegistrationEmailSubject)
                    .setMessage(messages_1.MESSAGES.preRegistrationEmailBody(data.applicationNo, fullName))
                    .setTo(student.application.email)
                    .setEmailNotificationRepository(this.emailNotificationRepository)
                    .sendDefault();
                await queryRunner.manager.update(pre_registration_entity_1.PreRegistration, { id: preRegistrationId }, {
                    status: enums_1.PreRegistrationStatus.Processing,
                });
            }
            await this.drivingTestService.updateScheduleWithQueryRunner(drivingTestScheduleId, {
                preRegistrationId: preRegistrationId,
            }, queryRunner);
            const paymentPayload = {
                type: enums_1.TransactionType.licenseRenewal,
                email: student.application.email,
                description: 'Payment for license renewal',
                successRedirectUrl: data.successRedirectUrl,
                failureRedirectUrl: data.failureRedirectUrl,
            };
            const paymentResp = await this.paymentService.initiate(paymentPayload, req);
            await queryRunner.commitTransaction();
            response.data = {
                applicationNo: data.applicationNo,
                preRegistrationId: preRegistrationId,
                date: data.date,
                time: data.time,
                ...paymentResp,
            };
            response.success = true;
            response.message = messages_1.MESSAGES.recordAdded;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            console.log(error);
            response.message = error.message;
        }
        finally {
            await queryRunner.release();
        }
        return response;
    }
    async getPreRegistration(applicationNo) {
        const response = { success: false, message: '', data: null };
        try {
            const registration = await this.preRegistrationRepository.findOne({
                where: { applicationNo },
                relations: [
                    'student.application',
                    'cbtCenter',
                    'drivingSchool',
                    'cbtSchedule',
                    'drivingTestCenter',
                    'drivingTestSchedule',
                ],
            });
            if (!registration) {
                throw new common_1.BadRequestException(messages_1.MESSAGES.recordNotFound);
            }
            const registrationData = {
                applicationNo: applicationNo,
                studentId: registration.studentId,
                cbtScheduleId: registration.cbtScheduleId,
                cbtCenterId: registration.cbtCenterId,
                drivingTestCenterId: registration.drivingTestCenterId,
                drivingTestScheduleId: registration.drivingTestScheduleId,
                reference: registration.reference,
                licenseClassId: registration.licenseClassId,
                years: registration.years,
                rrr: registration.rrr,
                status: registration.status,
                registrationDate: registration.createdAt,
                cbtSchedule: null,
                drivingTestSchedule: null,
            };
            if (registration.drivingSchool) {
                registrationData.drivingSchoolId = registration.drivingSchool.identifier;
                registrationData.drivingSchoolName = registration.drivingSchool.name;
            }
            if (registration.cbtCenter) {
                registrationData.cbtCenterName = registration.cbtCenter.name;
            }
            if (registration.cbtSchedule) {
                registrationData.cbtSchedule = {
                    cbtCenterId: registration.cbtSchedule.cbtCenterId,
                    lgaId: registration.cbtSchedule.lgaId,
                    stateId: registration.cbtSchedule.stateId,
                    date: registration.cbtSchedule.date,
                    time: registration.cbtSchedule.time,
                };
            }
            if (registration.drivingTestSchedule) {
                registrationData.drivingTestSchedule = registration.drivingTestSchedule;
            }
            if (registration.student) {
                registrationData.studentNo = registration.student.studentNo;
                registrationData.certificateNo = registration.student.certificateNo;
                registrationData.graduated = registration.student.graduated;
                registrationData.applicantData = registration.student.application;
            }
            response.success = true;
            response.message = messages_1.MESSAGES.recordFound;
            response.data = registrationData;
        }
        catch (error) {
            console.log(error);
            response.message = error.message;
        }
        return response;
    }
    async submitNewRequest(data) {
        const response = { success: false, message: '', data: null };
        try {
            const registration = await this.preRegistrationRepository.findOne({
                where: { applicationNo: data.applicationNo },
                relations: ['student.application.applicantFiles', 'drivingSchool', 'cbtSchedule'],
            });
            if (!registration) {
                throw new common_1.BadRequestException('Record with supplied applicationNo not found!');
            }
            if (registration.status === enums_1.PreRegistrationStatus.Pending) {
                throw new common_1.BadRequestException('Pre registration Payment has not been confirmed!');
            }
            data.requestType = enums_1.LicenseRequestType.New;
            const licenseData = await this.buildLicensePayload(data, registration);
            response.success = true;
            response.message = messages_1.MESSAGES.recordAdded;
            response.data = licenseData;
        }
        catch (error) {
            console.log(error);
            response.message = error.message;
        }
        return response;
    }
    async submitRenewalRequest(data, req) {
        const response = { success: false, message: '', data: null };
        try {
            const renewalData = {};
            if (data.isExternal) {
                throw new common_1.BadRequestException('Renewal of driver license issued outside of this system is not yet supported!');
            }
            const license = await this.licenseRepository.findOne({
                where: { licenseNo: data.oldLicenseNo },
            });
            if (!license) {
                throw new common_1.BadRequestException('Old license record was not found!');
            }
            if (license.isActive === enums_1.Status.Inactive) {
                throw new common_1.BadRequestException('Renewal already done for this license. Use the most recent license number!');
            }
            if (!(0, general_1.hasExpired)(license.issuedAt, license.expiryAt)) {
                throw new common_1.BadRequestException('Existing license is yet to expire. Please try again later.');
            }
            const registration = await this.preRegistrationRepository.findOne({
                where: { applicationNo: data.applicationNo },
                relations: [
                    'student.application.applicantFiles',
                    'drivingSchool',
                    'cbtSchedule',
                    'drivingTestSchedule',
                    'drivingTestCenter',
                ],
            });
            renewalData.preRegistrationId = registration.id;
            renewalData.applicationNo = data.applicationNo;
            await this.preRegistrationRepository.update(registration.id, {
                status: enums_1.PreRegistrationStatus.Processing,
            });
            const paymentPayload = {
                type: enums_1.TransactionType.licenseRenewal,
                email: registration.student.application.email,
                description: 'Payment for license renewal',
                successRedirectUrl: data.successRedirectUrl,
                failureRedirectUrl: data.failureRedirectUrl,
            };
            const paymentResp = await this.paymentService.initiate(paymentPayload, req);
            data.requestType = enums_1.LicenseRequestType.Renewal;
            data.reference = paymentResp.reference;
            const licenseData = await this.buildLicensePayload(data, registration);
            await this.licenseRepository.update({ id: license.id }, {
                isActive: enums_1.Status.Inactive,
            });
            response.success = true;
            response.message = messages_1.MESSAGES.recordAdded;
            response.data = { ...licenseData, ...paymentResp };
        }
        catch (error) {
            console.log(error);
            response.message = error.message;
        }
        return response;
    }
    async mobileSubmitRenewalRequest(data, req) {
        const response = { success: false, message: '', data: null };
        try {
            const renewalData = {};
            if (data.isExternal) {
                throw new common_1.BadRequestException('Renewal of driver license issued outside of this system is not yet supported!');
            }
            const payment = await this.paymentService.findPaymentBy({
                reference: data.reference,
                type: enums_1.TransactionType.licenseRenewal,
                status: enums_1.PaymentStatus.Completed,
                used: enums_1.Reference.Unused,
            });
            if (!payment) {
                throw new common_1.NotFoundException('Payment reference not found or has been used');
            }
            const license = await this.licenseRepository.findOne({
                where: { licenseNo: data.oldLicenseNo },
            });
            if (!license) {
                throw new common_1.BadRequestException('Old license record was not found!');
            }
            if (license.isActive === enums_1.Status.Inactive) {
                throw new common_1.BadRequestException('Renewal already done for this license. Use the most recent license number!');
            }
            if (!(0, general_1.hasExpired)(license.issuedAt, license.expiryAt)) {
                throw new common_1.BadRequestException('Existing license is yet to expire. Please try again later.');
            }
            const registration = await this.preRegistrationRepository.findOne({
                where: { applicationNo: data.applicationNo },
                relations: [
                    'student.application.applicantFiles',
                    'drivingSchool',
                    'cbtSchedule',
                    'drivingTestSchedule',
                    'drivingTestCenter',
                ],
            });
            renewalData.preRegistrationId = registration.id;
            renewalData.applicationNo = data.applicationNo;
            data.requestType = enums_1.LicenseRequestType.Renewal;
            data.status = enums_1.LicenseStatus.Processing;
            const licenseData = await this.buildLicensePayload(data, registration);
            await this.licenseRepository.update({ id: license.id }, {
                isActive: enums_1.Status.Inactive,
            });
            payment.used = enums_1.Reference.Used;
            payment.status = enums_1.PaymentStatus.Used;
            await this.paymentService.update(payment.id, payment);
            response.success = true;
            response.message = messages_1.MESSAGES.recordAdded;
            response.data = licenseData;
        }
        catch (error) {
            console.log(error);
            response.message = error.message;
        }
        return response;
    }
    async submitReplacementRequest(data, req) {
        const response = { success: false, message: '', data: null };
        try {
            const replacementData = {};
            if (data.isExternal) {
                throw new common_1.BadRequestException('Renewal of driver license issued outside of this system is not yet supported!');
            }
            const license = await this.licenseRepository.findOne({
                where: { licenseNo: data.oldLicenseNo },
                relations: ['preRegistration.student'],
            });
            if (!license) {
                throw new common_1.BadRequestException('Old license record was not found!');
            }
            if (license.isActive === enums_1.Status.Inactive) {
                throw new common_1.BadRequestException('Replacement already done for this license. Use the most recent license number!');
            }
            replacementData.reference = data.reference;
            replacementData.lgaId = data.lgaId;
            replacementData.stateId = data.stateId;
            replacementData.direct = true;
            if (license) {
                replacementData.studentId = license.preRegistration.studentId;
                replacementData.certificateNo = license.preRegistration.student.certificateNo;
            }
            const preRegistrationResp = await this.preRegistration(replacementData, req);
            if (!preRegistrationResp.success) {
                throw new common_1.BadRequestException(preRegistrationResp.message);
            }
            const registration = await this.preRegistrationRepository.findOne({
                where: { id: preRegistrationResp.data.preRegistrationId },
                relations: ['student.application.applicantFiles', 'drivingSchool', 'cbtSchedule'],
            });
            replacementData.preRegistrationId = preRegistrationResp.data.preRegistrationId;
            replacementData.applicationNo = preRegistrationResp.data.applicationNo;
            await this.licenseRepository.update({ id: license.id }, {
                status: enums_1.LicenseStatus.Expired,
                isActive: enums_1.Status.Inactive,
            });
            const paymentPayload = {
                type: enums_1.TransactionType.licenseReplacement,
                email: registration.student.application.email,
                description: 'Payment for license replacement',
                successRedirectUrl: data.successRedirectUrl,
                failureRedirectUrl: data.failureRedirectUrl,
            };
            const paymentResp = await this.paymentService.initiate(paymentPayload, req);
            data.requestType = enums_1.LicenseRequestType.Replacement;
            data.reference = paymentResp.reference;
            const licenseData = await this.buildLicensePayload(data, registration);
            response.success = true;
            response.message = messages_1.MESSAGES.recordAdded;
            response.data = { ...licenseData, ...paymentResp };
        }
        catch (error) {
            console.log(error);
            response.message = error.message;
        }
        return response;
    }
    async mobileSubmitReplacementRequest(data, req) {
        const response = { success: false, message: '', data: null };
        try {
            const replacementData = {};
            if (data.isExternal) {
                throw new common_1.BadRequestException('Renewal of driver license issued outside of this system is not yet supported!');
            }
            const payment = await this.paymentService.findPaymentBy({
                reference: data.reference,
                type: enums_1.TransactionType.licenseReplacement,
                status: enums_1.PaymentStatus.Completed,
                used: enums_1.Reference.Unused,
            });
            if (!payment) {
                throw new common_1.NotFoundException('Payment reference not found or has been used');
            }
            const license = await this.licenseRepository.findOne({
                where: { licenseNo: data.oldLicenseNo },
                relations: ['preRegistration.student'],
            });
            if (!license) {
                throw new common_1.BadRequestException('Old license record was not found!');
            }
            if (license.isActive === enums_1.Status.Inactive) {
                throw new common_1.BadRequestException('Replacement already done for this license. Use the most recent license number!');
            }
            replacementData.reference = data.reference;
            replacementData.lgaId = data.lgaId;
            replacementData.stateId = data.stateId;
            replacementData.direct = true;
            replacementData.studentId = license.preRegistration.studentId;
            replacementData.certificateNo = license.preRegistration.student.certificateNo;
            replacementData.status = enums_1.PreRegistrationStatus.Processing;
            const preRegistrationResp = await this.preRegistration(replacementData, req);
            if (!preRegistrationResp.success) {
                throw new common_1.BadRequestException(preRegistrationResp.message);
            }
            const registration = await this.preRegistrationRepository.findOne({
                where: { id: preRegistrationResp.data.preRegistrationId },
                relations: ['student.application.applicantFiles', 'drivingSchool', 'cbtSchedule'],
            });
            replacementData.preRegistrationId = preRegistrationResp.data.preRegistrationId;
            replacementData.applicationNo = preRegistrationResp.data.applicationNo;
            await this.licenseRepository.update({ id: license.id }, {
                status: enums_1.LicenseStatus.Expired,
                isActive: enums_1.Status.Inactive,
            });
            data.requestType = enums_1.LicenseRequestType.Replacement;
            data.status = enums_1.LicenseStatus.Processing;
            const licenseData = await this.buildLicensePayload(data, registration);
            payment.used = enums_1.Reference.Used;
            payment.status = enums_1.PaymentStatus.Used;
            await this.paymentService.update(payment.id, payment);
            response.success = true;
            response.message = messages_1.MESSAGES.recordAdded;
            response.data = licenseData;
        }
        catch (error) {
            console.log(error);
            response.message = error.message;
        }
        return response;
    }
    async approveLicense(data, user) {
        const response = { success: false, message: '', data: null };
        try {
            const license = await this.licenseRepository.findOne({
                where: { id: data.licenseId },
                relations: ['preRegistration.student.application'],
            });
            if (!license) {
                throw new common_1.BadRequestException(messages_1.MESSAGES.recordNotFound);
            }
            if (license.status === enums_1.LicenseStatus.Pending) {
                throw new common_1.BadRequestException('License payment has not been verified');
            }
            if (license.status === enums_1.LicenseStatus.Completed) {
                response.message = 'License already approved!';
            }
            else {
                const approvalData = await (0, general_1.getLicenseApprovalData)(data, this.licenseRepository);
                approvalData.issuedById = user.id;
                approvalData.licenseClassId = data.licenseClassId;
                approvalData.years = data.years;
                approvalData.status = enums_1.LicenseStatus.Completed;
                approvalData.isActive = enums_1.Status.Active;
                await this.licenseRepository.update({ id: license.id }, approvalData);
                await this.preRegistrationRepository.update({
                    id: license.preRegistrationId,
                }, { status: enums_1.PreRegistrationStatus.Completed });
                const fullName = [license.firstName, license.middleName, license.lastName].join(' ');
                await helpers_1.mailer
                    .setSubject(messages_1.MESSAGES.licenseApproved)
                    .setMessage(messages_1.MESSAGES.licenseEmailBody(license.preRegistration.applicationNo, approvalData.licenseNo, fullName))
                    .setTo(license.email)
                    .setEmailNotificationRepository(this.emailNotificationRepository)
                    .sendDefault();
                response.data = approvalData;
                response.success = true;
                response.message = messages_1.MESSAGES.approvedSuccessful;
            }
        }
        catch (error) {
            console.log(error);
            response.message = error.message;
        }
        return response;
    }
    async updateLicense(data) {
        const response = { success: false, message: '', data: null };
        try {
            const license = await this.licenseRepository.findOne({
                where: { id: data.licenseId },
                relations: ['preRegistration.student.application'],
            });
            if (!license) {
                throw new common_1.BadRequestException(messages_1.MESSAGES.recordNotFound);
            }
            const payload = {
                ...license,
                status: data.status ?? enums_1.LicenseStatus.Completed,
                isActive: data.isActive,
            };
            await this.licenseRepository.update({ id: license.id }, payload);
            await this.preRegistrationRepository.update({
                id: license.preRegistrationId,
            }, { status: enums_1.PreRegistrationStatus.Processing });
            response.success = true;
            response.message = messages_1.MESSAGES.recordUpdated;
        }
        catch (error) {
            console.log(error);
            response.message = error.message;
        }
        return response;
    }
    async expireLicense(data) {
        const response = { success: false, message: '', data: null };
        try {
            const license = await this.licenseRepository.findOne({
                where: { id: data.licenseId },
                relations: ['preRegistration.student.application'],
            });
            if (!license) {
                throw new common_1.BadRequestException(messages_1.MESSAGES.recordNotFound);
            }
            if (license.status === enums_1.LicenseStatus.Expired) {
                throw new common_1.BadRequestException('License has already expired');
            }
            if (license.status === enums_1.LicenseStatus.Pending) {
                await this.licenseRepository.update({ id: license.id }, { status: enums_1.LicenseStatus.Processing });
            }
            const user = await this.userService.findUserBy({ roleId: roles_1.Role.Admin });
            if (!user) {
                throw new common_1.BadRequestException('No Admin found to authorize this request');
            }
            if (!license.licenseNo) {
                await this.approveLicense({ licenseId: data.licenseId, licenseClassId: 3, years: 5 }, {
                    id: user.id,
                    roleId: user.roleId,
                    email: user.email,
                    stateId: user.stateId,
                    lgaId: user.lgaId,
                });
            }
            const today = new Date();
            const yesterday = new Date(today);
            yesterday.setDate(today.getDate() - 1);
            license.status = enums_1.LicenseStatus.Expired;
            license.expiryAt = yesterday;
            await this.licenseRepository.update({ id: license.id }, license);
            await this.preRegistrationRepository.update({
                id: license.preRegistrationId,
            }, { status: enums_1.PreRegistrationStatus.Completed });
            response.success = true;
            response.message = messages_1.MESSAGES.recordUpdated;
            response.data = { id: license.id, licenseNo: license.licenseNo, status: license.status };
        }
        catch (error) {
            console.log(error);
            response.message = error.message;
        }
        return response;
    }
    async buildLicensePayload(data, registration) {
        const reference = data.reference ?? registration.reference;
        const transaction = await this.paymentService.findPaymentBy({
            reference: reference,
        });
        const licenseData = new license_entity_1.License();
        licenseData.preRegistrationId = registration.id;
        licenseData.reference = reference;
        licenseData.transactionId = transaction.id;
        licenseData.titleId = registration.student.application.titleId;
        licenseData.firstName = registration.student.application.firstName;
        licenseData.lastName = registration.student.application.lastName;
        licenseData.middleName = registration.student.application.middleName;
        licenseData.maidenName = registration.student.application.maidenName;
        licenseData.email = registration.student.application.email;
        licenseData.phone = registration.student.application.phone;
        licenseData.address = registration.student.application.address;
        licenseData.dateOfBirth = registration.student.application.dateOfBirth;
        licenseData.genderId = registration.student.application.genderId;
        licenseData.lgaId = data.lgaId;
        licenseData.stateId = data.stateId;
        licenseData.nationalityId = data.nationalityId;
        licenseData.height = data.height;
        licenseData.weight = data.weight;
        licenseData.eyes = data.eyes;
        licenseData.requestType = data.requestType;
        licenseData.status = enums_1.LicenseStatus.Pending;
        licenseData.approvalLevel = enums_1.ApprovalLevel.LevelOne;
        if (data.source) {
            licenseData.source = data.source;
        }
        if (data.years) {
            licenseData.years = data.years;
        }
        if (data.licenseClassId) {
            licenseData.licenseClassId = data.licenseClassId;
        }
        if (data.email) {
            licenseData.email = data.email;
        }
        if (data.phone) {
            licenseData.phone = data.phone;
        }
        if (data.affidavitNo) {
            licenseData.affidavitNo = data.affidavitNo;
        }
        if (data.replacementReason) {
            licenseData.replacementReason = data.replacementReason;
        }
        const licenseRecord = await this.licenseRepository.insert(licenseData);
        await this.saveFileRecord(licenseRecord.raw[0].id, registration);
        const preRegistrationUpdate = {
            status: enums_1.PreRegistrationStatus.Processing,
        };
        if (data.licenseClassId) {
            preRegistrationUpdate.licenseClassId = data.licenseClassId;
        }
        if (data.years) {
            preRegistrationUpdate.years = data.years;
        }
        await this.preRegistrationRepository.update({
            id: registration.id,
        }, preRegistrationUpdate);
        return licenseData;
    }
    async submitPreRegistrationFiles(data) {
        const response = { success: false, message: '', data: null };
        try {
            const preRegistration = await this.preRegistrationRepository.findOne({
                where: { applicationNo: data.applicationNo },
                relations: ['student.application.applicantFiles'],
            });
            if (!preRegistration) {
                throw new common_1.BadRequestException(messages_1.MESSAGES.recordNotFound);
            }
            await this.savePreRegFileRecord(preRegistration.id, data.files);
            response.success = true;
            response.message = messages_1.MESSAGES.recordUpdated;
        }
        catch (error) {
            console.log(error);
            response.message = error.message;
        }
        return response;
    }
    async saveFileRecord(id, registration) {
        const preRegistrationFiles = await this.licenseFileRepository.find({
            where: { preRegistration: registration },
        });
        for (const file of preRegistrationFiles) {
            await this.licenseFileRepository.update({ id: file.id }, {
                license: { id },
            });
        }
    }
    async saveLicenseFileRecord(id, files) {
        for (const file of files) {
            await this.licenseFileRepository.save({
                license: { id },
                file: { id: file.fileId },
                documentType: file.documentType,
            });
        }
    }
    async savePreRegFileRecord(id, files) {
        for (const file of files) {
            await this.licenseFileRepository.save({
                preRegistration: { id },
                file: { id: file.fileId },
                documentType: file.documentType,
            });
        }
    }
    async getBaseRecord(files) {
        for (const file of files) {
            if (file.file.bucketKey) {
                const awsS3bucket = new aws_s3_1.default();
                file.file.base64String = await awsS3bucket.getPreSignedUrl(file.file.bucketKey);
            }
        }
        return files;
    }
    getLicenseInformation(license) {
        const data = {
            title: (0, general_1.getMapValue)(constants_1.salutations, 'id', license.titleId, 'name'),
            gender: (0, general_1.getMapValue)(constants_1.genders, 'id', license.genderId, 'name'),
            licenseClass: (0, general_1.getMapValue)(constants_1.licenseClasses, 'id', license.licenseClassId, 'name'),
            state: (0, general_1.getMapValue)(constants_1.states, 'id', license.stateId, 'name'),
            lga: (0, general_1.getMapValue)(constants_1.lgas, 'id', license.lgaId, 'name'),
            nationality: (0, general_1.getMapValue)(constants_1.nationalities, 'id', license.nationalityId, 'name'),
            ...license,
        };
        if (license.preRegistration &&
            license.preRegistration.student &&
            license.preRegistration.student.application) {
            data.occupationId = license.preRegistration.student.application.occupationId;
            data.maritalStatusId = license.preRegistration.student.application.maritalStatusId;
            data.bloodGroupId = license.preRegistration.student.application.bloodGroupId;
            data.nextOfKinName = license.preRegistration.student.application.nextOfKinName;
            data.nextOfKinRelationshipId =
                license.preRegistration.student.application.nextOfKinRelationshipId;
            data.nextOfKinNationalityId =
                license.preRegistration.student.application.nextOfKinNationalityId;
            data.nextOfKinPhone = license.preRegistration.student.application.nextOfKinPhone;
        }
        return data;
    }
    async getLicenseSummary() {
        const result = await this.licenseRepository
            .createQueryBuilder('licenses')
            .select([
            'COUNT(*) AS totalLicense',
            "COUNT(CASE WHEN licenses.requestType = 'renewal' THEN 1 END) AS totalRenewed",
            "COUNT(CASE WHEN licenses.requestType = 'replacement' THEN 1 END) AS totalReplaced",
            'COUNT(CASE WHEN licenses.expiryAt < NOW() THEN 1 END) AS totalExpired',
        ])
            .getRawOne();
        return {
            totalLicense: parseInt(result.totallicense, 10) || 0,
            totalRenewed: parseInt(result.totalrenewed, 10) || 0,
            totalReplaced: parseInt(result.totalreplaced, 10) || 0,
            totalExpired: parseInt(result.totalexpired, 10) || 0,
        };
    }
    async getMonthlyLicenseVolume(data) {
        let year = new Date().getFullYear();
        if (data.year) {
            year = new Date(new Date().setFullYear(+data.year)).getFullYear();
        }
        const qb = this.licenseRepository.createQueryBuilder('licenses');
        qb.select(['EXTRACT(MONTH FROM licenses.created_at) AS month', 'COUNT(*) AS count'])
            .where(`EXTRACT(YEAR FROM licenses.created_at) = :year`, { year })
            .groupBy('month')
            .orderBy('month');
        if (data.status) {
            if (data.status === 'expired') {
                qb.andWhere('licenses.expiryAt < NOW()');
            }
            else {
                qb.andWhere(`licenses.status = :status`, { status: data.status });
            }
        }
        if (data.type !== 'all') {
            qb.andWhere(`licenses.requestType = :type`, { type: data.type });
        }
        return qb.getRawMany();
    }
    async getRenewalRate(startDate, endDate) {
        const [renewed, expired] = await Promise.all([
            this.licenseRepository.count({
                where: { requestType: 'renewal', createdAt: (0, typeorm_2.Between)(startDate, endDate) },
            }),
            this.licenseRepository.count({ where: { expiryAt: (0, typeorm_2.Between)(startDate, endDate) } }),
        ]);
        return expired > 0 ? (renewed / expired) * 100 : 0;
    }
    async getTopExpiredLicensesByLga(startDate, endDate) {
        return this.licenseRepository
            .createQueryBuilder('licenses')
            .select(['licenses.lgaId AS lgaId', 'COUNT(*) AS count'])
            .where('licenses.expiryAt BETWEEN :startDate AND :endDate', { startDate, endDate })
            .groupBy('licenses.lgaId')
            .orderBy('count', 'DESC')
            .limit(5)
            .getRawMany();
    }
    async getGenderDistribution(startDate, endDate) {
        return this.licenseRepository
            .createQueryBuilder('licenses')
            .select(['licenses.genderId AS genderId', 'COUNT(*) AS count'])
            .where('licenses.createdAt BETWEEN :startDate AND :endDate', { startDate, endDate })
            .groupBy('licenses.genderId')
            .getRawMany();
    }
};
exports.LicenseService = LicenseService;
exports.LicenseService = LicenseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __param(1, (0, typeorm_1.InjectRepository)(pre_registration_entity_1.PreRegistration)),
    __param(2, (0, typeorm_1.InjectRepository)(license_entity_1.License)),
    __param(3, (0, typeorm_1.InjectRepository)(license_file_entity_1.LicenseFile)),
    __param(4, (0, typeorm_1.InjectRepository)(email_notification_entity_1.EmailNotification)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        cbt_service_1.CbtService,
        driving_test_service_1.DrivingTestService,
        driving_school_service_1.DrivingSchoolService,
        payment_service_1.PaymentService,
        users_service_1.UsersService,
        typeorm_2.DataSource])
], LicenseService);
//# sourceMappingURL=license.service.js.map