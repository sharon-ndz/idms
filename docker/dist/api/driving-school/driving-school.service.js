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
exports.DrivingSchoolService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const driving_school_entity_1 = require("../../entities/driving-school.entity");
const training_duration_entity_1 = require("../../entities/training-duration.entity");
const driving_school_application_entity_1 = require("../../entities/driving-school-application.entity");
const student_entity_1 = require("../../entities/student.entity");
const payment_entity_1 = require("../../entities/payment.entity");
const enums_1 = require("../../core/constants/enums");
const general_1 = require("../../core/helpers/general");
const applicant_file_entity_1 = require("../../entities/applicant-file.entity");
const all_dto_1 = require("../../core/interfaces/all.dto");
const class_transformer_1 = require("class-transformer");
const auth_service_1 = require("../auth/auth.service");
const aws_s3_1 = __importDefault(require("../../core/helpers/aws.s3"));
const users_service_1 = require("../users/users.service");
const users_dto_1 = require("../users/users.dto");
const roles_1 = require("../../middlewares/roles");
const helpers_1 = require("../../core/helpers");
const user_entity_1 = require("../../entities/user.entity");
const email_notification_entity_1 = require("../../entities/email-notification.entity");
const inspection_entity_1 = require("../../entities/inspection.entity");
const driving_school_instructor_entity_1 = require("../../entities/driving-school-instructor.entity");
const audit_trail_entity_1 = require("../../entities/audit-trail.entity");
const date_fns_1 = require("date-fns");
const driving_school_application_query_entity_1 = require("../../entities/driving-school-application-query.entity");
const pre_registration_entity_1 = require("../../entities/pre-registration.entity");
const messages_1 = require("../../core/constants/messages");
const constants_1 = require("../../core/constants/constants");
const functions_helpers_1 = require("../../core/helpers/functions.helpers");
let DrivingSchoolService = class DrivingSchoolService {
    constructor(drivingSchoolRepository, trainingDurationRepository, drivingSchoolApplicationRepository, studentRepository, paymentRepository, applicantFileRepository, auditTrailRepository, authService, usersService, userRepository, drivingSchoolInstructorRepository, emailNotificationRepository, dataSource, inspectionRepository) {
        this.drivingSchoolRepository = drivingSchoolRepository;
        this.trainingDurationRepository = trainingDurationRepository;
        this.drivingSchoolApplicationRepository = drivingSchoolApplicationRepository;
        this.studentRepository = studentRepository;
        this.paymentRepository = paymentRepository;
        this.applicantFileRepository = applicantFileRepository;
        this.auditTrailRepository = auditTrailRepository;
        this.authService = authService;
        this.usersService = usersService;
        this.userRepository = userRepository;
        this.drivingSchoolInstructorRepository = drivingSchoolInstructorRepository;
        this.emailNotificationRepository = emailNotificationRepository;
        this.dataSource = dataSource;
        this.inspectionRepository = inspectionRepository;
    }
    async stats(user) {
        const response = { success: false, message: '', data: null };
        try {
            const result = await this.drivingSchoolRepository
                .createQueryBuilder('driving_schools')
                .select([
                'COUNT(*) AS totalSchools',
                'COUNT(CASE WHEN driving_schools.isActive = 0 THEN 1 END) AS inactiveSchools',
            ])
                .getRawOne();
            response.data = {
                totalSchools: parseInt(result.totalschools, 10) || 0,
                inactiveSchools: parseInt(result.inactiveschools, 10) || 0,
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
        const queryBuilder = this.drivingSchoolRepository.createQueryBuilder('driving_schools');
        if (data.isActive) {
            queryBuilder.andWhere('driving_schools.isActive = :isActive', { isActive: data.isActive });
        }
        if (data.stateId) {
            queryBuilder.andWhere('driving_schools.stateId = :stateId', { stateId: data.stateId });
        }
        if (data.lgaId) {
            queryBuilder.andWhere('driving_schools.lgaId = :lgaId', { lgaId: data.lgaId });
        }
        if (data.regStatus) {
            queryBuilder.andWhere(`driving_schools.status = :status`, {
                status: data.regStatus,
            });
        }
        if (data.createdAtStart && data.createdAtEnd) {
            queryBuilder.andWhere(`driving_schools.createdAt BETWEEN :start AND :end`, {
                start: data.createdAtStart,
                end: data.createdAtEnd,
            });
        }
        if (search) {
            queryBuilder.andWhere(new typeorm_2.Brackets((qb) => {
                qb.where('driving_schools.email LIKE :search', { search: `%${search}%` })
                    .orWhere('driving_schools.name LIKE :search', { search: `%${search}%` })
                    .orWhere('driving_schools.phone LIKE :search', { search: `%${search}%` })
                    .orWhere('driving_schools.identifier LIKE :search', { search: `%${search}%` });
            }));
        }
        queryBuilder.skip(offset);
        queryBuilder.take(limit);
        queryBuilder.orderBy('driving_schools.id', 'DESC');
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
    async getSingle(drivingSchoolId, user) {
        const response = { success: false, message: '', data: null };
        try {
            const drivingSchool = await this.drivingSchoolRepository.findOne({
                where: { id: drivingSchoolId },
            });
            if (!drivingSchool) {
                throw new common_1.BadRequestException(messages_1.MESSAGES.recordNotFound);
            }
            response.data = (0, class_transformer_1.plainToInstance)(driving_school_entity_1.DrivingSchool, drivingSchool);
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
    async createSchool(data, user) {
        const response = { success: false, message: '', data: null };
        try {
            const existingSchool = await this.drivingSchoolRepository.findOne({
                where: [{ email: data.email }, { phone: data.phone }, { name: data.name }],
            });
            if (existingSchool) {
                throw new common_1.BadRequestException(messages_1.MESSAGES.recordExists);
            }
            const schoolData = (0, class_transformer_1.plainToInstance)(driving_school_entity_1.DrivingSchool, data);
            schoolData.identifier = await (0, general_1.generateDrivingSchoolId)(this.drivingSchoolRepository);
            schoolData.isActive = enums_1.Status.Active;
            const schoolRecord = await this.drivingSchoolRepository.save(schoolData);
            for (const duration of data.trainingDurations) {
                await this.trainingDurationRepository.insert({
                    drivingSchoolId: schoolData.id,
                    duration: duration,
                    durationText: duration + ' Months',
                    isActive: enums_1.Status.Active,
                });
            }
            await this.auditTrailRepository.insert({
                userId: user.id,
                dbAction: constants_1.auditAction.RECORD_ADD,
                tableName: 'driving_schools',
                resourceId: schoolRecord.id,
                description: `Driving school ${schoolRecord.identifier} created successfully`,
            });
            response.data = (0, class_transformer_1.plainToInstance)(driving_school_entity_1.DrivingSchool, schoolRecord);
            response.success = true;
            response.message = messages_1.MESSAGES.recordAdded;
        }
        catch (error) {
            console.log(error);
            response.message = error.message;
        }
        return response;
    }
    async selfServiceCreateSchool(data) {
        const response = { success: false, message: '', data: null };
        const queryRunner = await (0, all_dto_1.beginTransaction)(this.dataSource);
        try {
            const existingSchool = await queryRunner.manager.findOne(driving_school_entity_1.DrivingSchool, {
                where: [{ email: data.email }, { phone: data.phone }, { name: data.name }],
            });
            if (existingSchool) {
                throw new common_1.BadRequestException(messages_1.MESSAGES.recordExists);
            }
            const schoolData = (0, class_transformer_1.plainToInstance)(driving_school_entity_1.DrivingSchool, data);
            schoolData.identifier = await (0, general_1.generateDrivingSchoolId)(this.drivingSchoolRepository);
            schoolData.isActive = enums_1.Status.Inactive;
            schoolData.status = enums_1.Reg.Initiated;
            const schoolRecord = await queryRunner.manager.save(driving_school_entity_1.DrivingSchool, schoolData);
            const durations = [3, 6, 9];
            for (const duration of durations) {
                await queryRunner.manager.insert(training_duration_entity_1.TrainingDuration, {
                    drivingSchoolId: schoolData.id,
                    duration: duration,
                    durationText: duration + ' Months',
                    isActive: enums_1.Status.Active
                });
            }
            const user = new user_entity_1.User();
            user.firstName = 'School';
            user.lastName = 'Admin';
            user.email = data.email;
            user.phone = data.phone;
            user.password = data.password;
            user.roleId = roles_1.Role.SchoolAdmin;
            user.drivingSchoolId = schoolRecord.id;
            user.stateId = data.stateId;
            user.lgaId = data.lgaId;
            user.address = data.address;
            user.isActive = enums_1.Status.Active;
            await queryRunner.manager.save(user_entity_1.User, user);
            await helpers_1.mailer
                .setSubject(messages_1.MESSAGES.schoolApplicationSubmitted)
                .setMessage(messages_1.MESSAGES.drivingSchoolApplicationCreated(data.name, data.email, data.password))
                .setTo(data.email)
                .setEmailNotificationRepository(queryRunner.manager.getRepository(email_notification_entity_1.EmailNotification))
                .sendDefault();
            await queryRunner.commitTransaction();
            response.data = {
                name: schoolRecord.name,
                identifier: schoolRecord.identifier,
            };
            response.success = true;
            response.message = messages_1.MESSAGES.schoolApplicationSubmitted;
        }
        catch (error) {
            console.log(error);
            await queryRunner.rollbackTransaction();
            response.message = error.message;
        }
        finally {
            await queryRunner.release();
        }
        return response;
    }
    async updateSchool(data, user) {
        const response = { success: false, message: '' };
        try {
            const exists = await this.drivingSchoolRepository.findOne({
                where: { id: data.id },
            });
            if (!exists) {
                throw new common_1.BadRequestException(messages_1.MESSAGES.recordNotFound);
            }
            const schoolData = (0, class_transformer_1.plainToInstance)(driving_school_entity_1.DrivingSchool, data);
            await this.drivingSchoolRepository.update({ id: data.id }, schoolData);
            await this.auditTrailRepository.insert({
                userId: user.id,
                dbAction: constants_1.auditAction.RECORD_MODIFIED,
                tableName: 'driving_schools',
                resourceId: exists.id,
                description: `Driving school ${exists.identifier} updated successfully`,
            });
            response.success = true;
            response.message = messages_1.MESSAGES.recordUpdated;
        }
        catch (error) {
            console.log(error);
            response.message = error.message;
        }
        return response;
    }
    async minimalList(data) {
        const response = { success: false, message: '', data: null };
        const limit = Number(data.resultPerPage || 10);
        const page = Number(data.page || 1);
        const offset = (page - 1) * limit;
        try {
            const whereClause = {
                select: {
                    id: true,
                    name: true,
                    address: true,
                },
                where: undefined,
                skip: offset,
                take: limit,
            };
            const whereConditions = { isActive: enums_1.Status.Active };
            if (data.stateId) {
                whereConditions.stateId = data.stateId;
            }
            if (data.lgaId) {
                whereConditions.lgaId = data.lgaId;
            }
            whereClause.where = whereConditions;
            const [result, count] = await this.drivingSchoolRepository.findAndCount(whereClause);
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
            response.message = error.message;
        }
        return response;
    }
    async findOne(id) {
        const response = { success: false, message: '', data: null };
        try {
            const result = await this.drivingSchoolRepository.findOne({ where: { id } });
            if (result) {
                response.data = result;
            }
            response.success = true;
            response.message = messages_1.MESSAGES.recordFound;
        }
        catch (error) {
            console.log(error);
            response.message = error.message;
        }
        return response;
    }
    async trainingDurations(id) {
        const response = { success: false, message: '', data: null };
        try {
            const result = await this.trainingDurationRepository.find({
                where: { drivingSchoolId: id, isActive: enums_1.Status.Active },
                select: ['id', 'drivingSchoolId', 'duration', 'durationText'],
            });
            if (result) {
                response.data = result;
            }
            response.success = true;
            response.message = messages_1.MESSAGES.recordFound;
        }
        catch (error) {
            console.log(error);
            response.message = error.message;
        }
        return response;
    }
    async singleTrainingDuration(id) {
        const response = { success: false, message: '', data: null };
        try {
            const result = await this.trainingDurationRepository.find({
                where: { id: id },
                select: ['id', 'drivingSchoolId', 'duration', 'durationText'],
            });
            if (result) {
                response.data = result;
            }
            response.success = true;
            response.message = messages_1.MESSAGES.recordFound;
        }
        catch (error) {
            console.log(error);
            response.message = error.message;
        }
        return response;
    }
    async submitApplication(data) {
        const response = { success: false, message: '', data: null };
        try {
            const payment = await this.paymentRepository.findOne({
                where: {
                    reference: data.reference,
                    type: enums_1.TransactionType.drivingSchoolApplication,
                    status: enums_1.PaymentStatus.Completed,
                    used: enums_1.Reference.Unused,
                },
            });
            if (!payment) {
                throw new common_1.NotFoundException('Payment reference not found or has been used');
            }
            const validateNinResp = await this.authService.verifyNIN(data.nin);
            if (!validateNinResp.success) {
                throw new common_1.BadRequestException(messages_1.MESSAGES.invalidValue('NIN'));
            }
            const validateNin = validateNinResp.data;
            const ninNames = [
                validateNin.firstname.toLowerCase(),
                validateNin.lastname.toLowerCase(),
                validateNin.middlename?.toLowerCase() || '',
            ];
            const suppliedNames = [
                data.firstName.toLowerCase(),
                data.lastName.toLowerCase(),
                data.middleName?.toLowerCase() || '',
            ];
            const namesMatch = suppliedNames.every((name) => ninNames.includes(name));
            if (!namesMatch) {
                throw new common_1.BadRequestException(messages_1.MESSAGES.ninNameMismatch);
            }
            const drivingSchool = await this.drivingSchoolRepository.findOne({
                where: { id: data.drivingSchoolId },
            });
            if (!drivingSchool) {
                throw new common_1.BadRequestException('Driving School not found');
            }
            const applicationNumber = (0, general_1.generateDrivingSchoolApplicationNo)(drivingSchool);
            if (!data.courseLevel) {
                data.courseLevel = enums_1.CourseLevel.Beginner;
            }
            const applicantData = {
                ...data,
                applicationNo: applicationNumber,
            };
            const createdApplication = await this.drivingSchoolApplicationRepository.insert(applicantData);
            if (data.files) {
                await this.saveFileRecord(createdApplication.raw[0].id, data.files);
            }
            await this.paymentRepository.update({ id: payment.id }, { used: enums_1.Reference.Used, status: enums_1.PaymentStatus.Used });
            response.success = true;
            response.message = messages_1.MESSAGES.recordAdded;
            response.data = {
                applicationId: applicantData.applicationNo,
            };
        }
        catch (error) {
            console.log(error);
            response.message = error.message;
        }
        return response;
    }
    async updateApplication(data) {
        const response = { success: false, message: '', data: null };
        try {
            const application = await this.drivingSchoolApplicationRepository.findOne({
                where: { id: data.id },
            });
            if (!application) {
                throw new common_1.BadRequestException('Application does not exist');
            }
            const applicantData = {
                ...data,
                status: enums_1.Reg.Pending,
                updatedAt: new Date(),
            };
            await this.drivingSchoolApplicationRepository.update({ id: data.id }, applicantData);
            response.success = true;
            response.message = messages_1.MESSAGES.recordUpdated;
            response.data = {
                applicationId: application.applicationNo,
                status: application.status,
            };
        }
        catch (error) {
            console.log(error);
            response.message = error.message;
        }
        return response;
    }
    async checkApplication(data) {
        const response = { success: false, message: '', data: null };
        try {
            const result = await this.drivingSchoolApplicationRepository
                .createQueryBuilder('dsa')
                .where({ applicationNo: data.applicationId })
                .leftJoinAndSelect('dsa.drivingSchool', 'ds')
                .leftJoinAndSelect('dsa.trainingDuration', 'td')
                .leftJoinAndSelect('dsa.applicantFiles', 'af')
                .leftJoinAndSelect('dsa.student', 'student')
                .leftJoinAndSelect('af.file', 'f')
                .select([
                'dsa',
                'student.id',
                'student.studentNo',
                'student.certificateNo',
                'ds.id',
                'ds.identifier',
                'ds.name',
                'ds.address',
                'td.id',
                'td.duration',
                'td.durationText',
                'af',
                'f.id',
                'f.fileName',
                'f.bucketKey',
                'f.bucketName',
                'f.mimeType',
                'f.checksum',
            ])
                .getOne();
            if (result) {
                if (result.applicantFiles) {
                    result.applicantFiles = await this.getBaseRecord(result.applicantFiles);
                }
                response.data = result;
                response.success = true;
                response.message = messages_1.MESSAGES.recordFound;
            }
            else {
                response.message = messages_1.MESSAGES.recordNotFound;
            }
        }
        catch (error) {
            console.log(error);
            response.message = error.message;
        }
        return response;
    }
    async changeApplicationStatus(data, user) {
        const response = { success: false, message: '', data: null };
        try {
            if (!user.drivingSchoolId) {
                throw new common_1.BadRequestException('Sorry! You are not a school administrator!');
            }
            const application = await this.drivingSchoolApplicationRepository.findOne({
                where: { applicationNo: data.applicationId },
                relations: ['drivingSchool'],
            });
            if (!application) {
                throw new common_1.BadRequestException('Application does not exist');
            }
            if (application.status == enums_1.Reg.Approved) {
                throw new common_1.BadRequestException('Application already approved');
            }
            if (application.status == enums_1.Reg.Queried) {
                throw new common_1.BadRequestException('Application already queried and yet to be updated');
            }
            const studentNumber = (0, general_1.generateStudentNo)(application.drivingSchool);
            const studentData = {
                applicationId: application.id,
                drivingSchoolId: application.drivingSchoolId,
                isActive: enums_1.Status.Active,
                approvedBy: user.id,
                studentNo: studentNumber,
            };
            await this.studentRepository.insert(studentData);
            await this.drivingSchoolApplicationRepository.update({
                id: application.id,
            }, {
                status: enums_1.Reg.Approved,
                approvedById: user.id,
                approvedAt: new Date(),
            });
            response.success = true;
            response.message = 'Application approved successfully';
            response.data = {
                studentNo: studentData.studentNo,
            };
        }
        catch (error) {
            console.log(error);
            response.message = error.message;
        }
        return response;
    }
    async issueCert(studentNo) {
        const response = { success: false, message: '', data: null };
        try {
            const student = await this.studentRepository.findOne({
                where: { studentNo: studentNo },
                relations: ['drivingSchool', 'application.trainingDuration'],
            });
            if (!student) {
                throw new common_1.BadRequestException('Student does not exist');
            }
            if (student.graduated) {
                throw new common_1.BadRequestException('Student already graduated and certificate issued.');
            }
            if (process.env.NODE_ENV === 'production') {
                if (!(0, general_1.hasCompletedTraining)(student.createdAt, student.application.trainingDuration.duration)) {
                    throw new common_1.BadRequestException('Student has not completed training duration!');
                }
            }
            const certificateNo = (0, general_1.generateCertificateNo)(student);
            await this.studentRepository.update({ id: student.id }, {
                certificateNo: certificateNo,
                graduated: true,
                updatedAt: new Date(),
            });
            response.success = true;
            response.message = messages_1.MESSAGES.recordUpdated;
            response.data = {
                certificateNo: certificateNo,
                studentNo: studentNo,
            };
        }
        catch (error) {
            console.log(error);
            response.message = error.message;
        }
        return response;
    }
    async validateCertNo(certificateNo) {
        const response = { success: false, message: '', data: null };
        try {
            const student = await this.studentRepository.findOne({
                where: { certificateNo: certificateNo },
                relations: ['drivingSchool', 'application.applicantFiles.file'],
            });
            if (!student) {
                throw new common_1.BadRequestException('Student with supplied certificate number does not exist');
            }
            if (student.application.applicantFiles) {
                student.application.applicantFiles = await this.getBaseRecord(student.application.applicantFiles);
            }
            response.success = true;
            response.message = messages_1.MESSAGES.recordFound;
            response.data = { ...student, dateOfIssuance: student.updatedAt };
        }
        catch (error) {
            console.log(error);
            response.message = error.message;
        }
        return response;
    }
    async applicationsStats(data, user) {
        const response = { success: false, message: '', data: null };
        try {
            const stats = {};
            const roleId = user.roleId;
            if (roleId === roles_1.Role.LASDRI_ADMIN) {
                stats.totalApplications = await this.drivingSchoolRepository.count();
                stats.totalInspections = await this.inspectionRepository.count();
            }
            else if (roleId === roles_1.Role.SchoolAdmin) {
                stats.totalApplications = await this.drivingSchoolApplicationRepository.count({
                    where: { drivingSchoolId: user.drivingSchoolId },
                });
            }
            if (!data.status || (data.status && +data.status == enums_1.Reg.Pending)) {
                stats.pendingApplications = await this.drivingSchoolApplicationRepository.count({
                    where: { status: enums_1.Reg.Pending, drivingSchoolId: user.drivingSchoolId },
                });
            }
            if (!data.status || (data.status && +data.status == enums_1.Reg.Approved)) {
                stats.acknowledgedApplicaitons = await this.drivingSchoolApplicationRepository.count({
                    where: { status: enums_1.Reg.Approved, drivingSchoolId: user.drivingSchoolId },
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
    async applicationsList(data, user) {
        const response = { success: false, message: '', data: null };
        const search = data.search || null;
        const limit = Number(data.resultPerPage || 10);
        const page = Number(data.page || 1);
        const offset = (page - 1) * limit;
        const queryBuilder = this.drivingSchoolApplicationRepository.createQueryBuilder('driving_school_applications');
        if (data.regStatus) {
            queryBuilder.andWhere(`driving_school_applications.status = :status`, {
                status: data.regStatus,
            });
        }
        if (data.createdAtStart && data.createdAtEnd) {
            queryBuilder.andWhere(`driving_school_applications.createdAt BETWEEN :start AND :end`, {
                start: data.createdAtStart,
                end: data.createdAtEnd,
            });
        }
        if (search) {
            queryBuilder.andWhere(new typeorm_2.Brackets((qb) => {
                qb.where('driving_school_applications.applicationNo LIKE :search', {
                    search: `%${search}%`,
                })
                    .orWhere('driving_school_applications.firstName LIKE :search', {
                    search: `%${search}%`,
                })
                    .orWhere('driving_school_applications.lastName LIKE :search', { search: `%${search}%` })
                    .orWhere('driving_school_applications.reference LIKE :search', {
                    search: `%${search}%`,
                })
                    .orWhere('driving_school_applications.email LIKE :search', {
                    search: `%${search}%`,
                })
                    .orWhere('driving_school_applications.phone LIKE :search', {
                    search: `%${search}%`,
                });
            }));
        }
        queryBuilder.skip(offset);
        queryBuilder.take(limit);
        queryBuilder.orderBy('driving_school_applications.id', 'DESC');
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
    async getSingleApplication(drivingSchoolId) {
        const response = { success: false, message: '', data: null };
        try {
            const application = await this.drivingSchoolRepository.findOne({
                where: { id: drivingSchoolId },
                relations: ['officer', 'instructors'],
                select: {
                    officer: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        phone: true,
                    },
                },
            });
            if (!application) {
                throw new common_1.BadRequestException(messages_1.MESSAGES.recordNotFound);
            }
            response.success = true;
            response.message = messages_1.MESSAGES.recordFound;
            response.data = application;
        }
        catch (error) {
            console.log(error);
            response.message = error.message;
        }
        return response;
    }
    async studentsStats(data, user) {
        const response = { success: false, message: '', data: null };
        try {
            const stats = {};
            const roleId = user.roleId;
            const condition = {};
            if (roleId !== roles_1.Role.LASDRI_ADMIN) {
                condition.drivingSchoolId = user.drivingSchoolId;
            }
            stats.totalRegisteredStudents = await this.studentRepository.count({ where: condition });
            if (!data.graduated || (data.graduated && +data.graduated == 0)) {
                stats.ongoingStudents = await this.studentRepository.count({
                    where: { ...condition, graduated: false },
                });
            }
            if (!data.graduated || (data.graduated && +data.graduated == 1)) {
                stats.certifiedStudents = await this.studentRepository.count({
                    where: { ...condition, graduated: true },
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
    async studentsList(data, user) {
        const response = { success: false, message: '', data: null };
        const search = data.search || null;
        const limit = Number(data.resultPerPage || 10);
        const page = Number(data.page || 1);
        const offset = (page - 1) * limit;
        const roleId = user.roleId;
        const condition = {};
        if (roleId !== roles_1.Role.LASDRI_ADMIN) {
            condition.drivingSchoolId = user.drivingSchoolId;
        }
        try {
            const queryBuilder = this.studentRepository
                .createQueryBuilder('students')
                .leftJoinAndSelect('students.application', 'applications')
                .where(condition);
            if (data.graduated) {
                const graduated = +data.graduated == 1;
                queryBuilder.andWhere('students.graduated = :graduated', { graduated });
            }
            if (search) {
                queryBuilder.andWhere(new typeorm_2.Brackets((qb) => {
                    qb.where('students.studentNo ILIKE :search', { search: `%${search}%` }).orWhere('students.certificateNo ILIKE :search', { search: `%${search}%` });
                }));
            }
            queryBuilder.skip(offset);
            queryBuilder.take(limit);
            queryBuilder.orderBy('students.id', 'DESC');
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
            console.log(user.id);
            response.message = error.message;
        }
        return response;
    }
    async studentDetails(studentNo) {
        const response = { success: false, message: '', data: null };
        try {
            const student = await this.studentRepository.findOne({
                where: { studentNo: studentNo },
                relations: ['drivingSchool', 'permit', 'application.applicantFiles.file'],
            });
            if (!student) {
                throw new common_1.BadRequestException(messages_1.MESSAGES.recordNotFound);
            }
            response.success = true;
            response.message = messages_1.MESSAGES.recordFound;
            response.data = student;
        }
        catch (error) {
            console.log(error);
            response.message = error.message;
        }
        return response;
    }
    async registerStudent(data, user) {
        const response = { success: false, message: '', data: null };
        try {
            const payment = await this.paymentRepository.findOne({
                where: {
                    reference: data.reference,
                    type: enums_1.TransactionType.drivingSchoolApplication,
                    status: enums_1.PaymentStatus.Completed,
                    used: enums_1.Reference.Unused,
                },
            });
            if (!payment) {
                throw new common_1.NotFoundException('Payment reference not found or has been used');
            }
            const validateNinResp = await this.authService.verifyNIN(data.nin);
            if (!validateNinResp.success) {
                throw new common_1.BadRequestException(messages_1.MESSAGES.invalidValue('NIN'));
            }
            const validateNin = validateNinResp.data;
            const ninNames = [
                validateNin.firstname.toLowerCase(),
                validateNin.lastname.toLowerCase(),
                validateNin.middlename?.toLowerCase() || '',
            ];
            const suppliedNames = [
                data.firstName.toLowerCase(),
                data.lastName.toLowerCase(),
                data.middleName?.toLowerCase() || '',
            ];
            const namesMatch = suppliedNames.every((name) => ninNames.includes(name));
            if (!namesMatch) {
                throw new common_1.BadRequestException(messages_1.MESSAGES.ninNameMismatch);
            }
            if (user.drivingSchoolId !== data.drivingSchoolId) {
                throw new common_1.BadRequestException('You are not authorized to onboard for this school!');
            }
            const school = await this.drivingSchoolRepository.findOneBy({ id: data.drivingSchoolId });
            if (!school) {
                throw new common_1.BadRequestException('Driving School not found');
            }
            if (!data.courseLevel) {
                data.courseLevel = enums_1.CourseLevel.Beginner;
            }
            const applicationNumber = (0, general_1.generateDrivingSchoolApplicationNo)(school);
            const applicantData = {
                ...data,
                applicationNo: applicationNumber,
            };
            const createdApplication = await this.drivingSchoolApplicationRepository.insert(applicantData);
            if (data.files) {
                await this.saveFileRecord(createdApplication.raw[0].id, data.files);
            }
            await this.paymentRepository.update({ id: payment.id }, { used: enums_1.Reference.Used, status: enums_1.PaymentStatus.Used });
            const studentResp = await this.changeApplicationStatus({
                applicationId: applicantData.applicationNo,
                status: enums_1.Reg.Approved,
            }, user);
            if (!studentResp.success) {
                response.message =
                    'Application was created but failed to create student record for some reasons. Attached is application ID to continue the process.';
                response.data = {
                    applicationId: applicantData.applicationNo,
                };
                return response;
            }
            response.success = true;
            response.message = messages_1.MESSAGES.recordAdded;
            response.data = {
                applicationId: applicantData.applicationNo,
                studentNo: studentResp.data.studentNo,
            };
        }
        catch (error) {
            console.log(error);
            response.message = error.message;
        }
        return response;
    }
    async saveFileRecord(id, files) {
        for (const file of files) {
            await this.applicantFileRepository.save({
                drivingSchoolApplication: { id },
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
    async getLasdriStats(user) {
        const response = { success: false, message: '', data: null };
        try {
            const stateId = Number(user.stateId);
            const result = await this.drivingSchoolRepository
                .createQueryBuilder('drivingSchool')
                .select([
                'COUNT(*) AS "totalSchools"',
                'SUM(CASE WHEN drivingSchool.isActive = :active THEN 1 ELSE 0 END) AS "activeSchools"',
                'SUM(CASE WHEN drivingSchool.isActive = :probation THEN 1 ELSE 0 END) AS "probationSchools"',
                'SUM(CASE WHEN drivingSchool.isActive = :suspended THEN 1 ELSE 0 END) AS "suspendedSchools"',
            ])
                .where('drivingSchool.stateId = :stateId', { stateId })
                .setParameters({
                active: enums_1.Status.Active,
                probation: enums_1.Status.Probation,
                suspended: enums_1.Status.Suspended,
            })
                .getRawOne();
            response.data = {
                totalSchools: parseInt(result.totalSchools) || 0,
                activeSchools: parseInt(result.activeSchools) || 0,
                probationSchools: parseInt(result.probationSchools) || 0,
                suspendedSchools: parseInt(result.suspendedSchools) || 0,
            };
            response.success = true;
            response.message = messages_1.MESSAGES.recordFound;
        }
        catch (error) {
            console.error(error);
            console.error(`Queried by user ID: ${user.id}`);
            throw new common_1.InternalServerErrorException(error.message);
        }
        return response;
    }
    async getDrivingSchoolList(query) {
        const dbQuery = {};
        if (query.name) {
            dbQuery.name = (0, typeorm_2.ILike)(`%${query.name}%`);
        }
        if (query.identifier) {
            dbQuery.identifier = (0, typeorm_2.ILike)(`%${query.identifier}%`);
        }
        if (query.email) {
            dbQuery.email = (0, typeorm_2.ILike)(`%${query.email}%`);
        }
        if (query.phone) {
            dbQuery.phone = (0, typeorm_2.ILike)(`%${query.phone}%`);
        }
        if (query.status !== undefined) {
            dbQuery.isActive = query.status;
        }
        const [records, count] = await this.drivingSchoolRepository.findAndCount({
            where: { ...dbQuery },
            ...(0, helpers_1.addPaging)(query.take, query.page),
            order: { createdAt: query.order },
        });
        return {
            records,
            total: count,
        };
    }
    async assignLasdriOfficer(data, user) {
        const response = { success: false, message: '' };
        const queryRunner = await (0, all_dto_1.beginTransaction)(this.dataSource);
        let officer;
        let application;
        try {
            application = await queryRunner.manager.findOne(driving_school_entity_1.DrivingSchool, {
                where: { id: data.drivingSchoolId },
                relations: ['drivingSchool'],
            });
            if (!application) {
                throw new common_1.NotFoundException(messages_1.MESSAGES.recordNotFound);
            }
            if (application.status === enums_1.Reg.Approved) {
                throw new common_1.BadRequestException('Application is already approved');
            }
            officer = await queryRunner.manager.findOne(user_entity_1.User, {
                where: { id: data.officerId, roleId: roles_1.Role.LASDRI },
            });
            if (!officer) {
                throw new common_1.NotFoundException('Assigned officer not found');
            }
            application.status = enums_1.Reg.Assigned;
            application.officerId = officer.id;
            application.inspectionDate = data.inspectionDate;
            const inspectionEndDate = (0, date_fns_1.addBusinessDays)(data.inspectionDate, 7);
            application.inspectionEndDate = inspectionEndDate;
            await queryRunner.manager.save(application);
            await queryRunner.commitTransaction();
            response.success = true;
            response.message = 'Application successfully approved and officer assigned';
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            console.error('An error occurred while assigning the officer:', error);
            throw new common_1.InternalServerErrorException(error.message);
        }
        finally {
            await queryRunner.release();
        }
        try {
            await helpers_1.mailer
                .setSubject(messages_1.MESSAGES.newApplicationAssigned)
                .setMessage(messages_1.MESSAGES.newApplicationAssignedEmailBody(officer.firstName, application.identifier))
                .setTo(officer.email)
                .setEmailNotificationRepository(queryRunner.manager.getRepository(email_notification_entity_1.EmailNotification))
                .sendDefault();
        }
        catch (emailError) {
            console.error('Failed to send email to LASDRI officer:', emailError);
        }
        try {
            await helpers_1.mailer
                .setSubject(messages_1.MESSAGES.lasdriOfficerAssigned)
                .setMessage(messages_1.MESSAGES.applicationApprovedEmailBody())
                .setTo(application.email)
                .setEmailNotificationRepository(queryRunner.manager.getRepository(email_notification_entity_1.EmailNotification))
                .sendDefault();
        }
        catch (emailError) {
            console.error('Failed to send email to Driving School:', emailError);
        }
        return response;
    }
    async completeApplication(data, user) {
        const response = { success: false, message: '' };
        const { instructorIDs, ...res } = data;
        const queryRunner = await (0, all_dto_1.beginTransaction)(this.dataSource);
        try {
            const updateResult = await queryRunner.manager.update(driving_school_entity_1.DrivingSchool, { id: user.drivingSchoolId }, {
                ...res,
                status: enums_1.Reg.Pending,
            });
            if (updateResult.affected === 0) {
                response.message = 'No pending application found for this user';
                return response;
            }
            const instructors = await queryRunner.manager.find(driving_school_instructor_entity_1.DrivingSchoolInstructor, {
                where: { instructorId: (0, typeorm_2.In)(instructorIDs) },
            });
            if (instructors.length !== instructorIDs.length) {
                const foundInstructorIDs = instructors.map((instructor) => instructor.instructorId);
                const notFoundInstructorIDs = instructorIDs.filter((id) => !foundInstructorIDs.includes(id));
                response.message = `Some instructors were not found: ${notFoundInstructorIDs.join(', ')}`;
                return response;
            }
            await queryRunner.manager.update(driving_school_instructor_entity_1.DrivingSchoolInstructor, { instructorId: (0, typeorm_2.In)(instructorIDs) }, { drivingSchoolId: user.drivingSchoolId });
            await queryRunner.commitTransaction();
            response.success = true;
            response.message = 'Application completed successfully';
            return response;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            response.message = 'An error occurred while completing the application';
            console.error(error);
            return response;
        }
        finally {
            await queryRunner.release();
        }
    }
    async toggleDrivingSchoolStatus(id, data, user) {
        const response = { success: false, message: '', data: null };
        const queryRunner = await (0, all_dto_1.beginTransaction)(this.dataSource);
        try {
            const drivingSchool = await queryRunner.manager.findOne(driving_school_entity_1.DrivingSchool, {
                where: { id },
            });
            if (!drivingSchool) {
                throw new common_1.BadRequestException('Driving School not found');
            }
            drivingSchool.isActive = data.status;
            if (data.status === enums_1.Status.Suspended) {
                drivingSchool.reasonForSuspension = data.reason;
            }
            await queryRunner.manager.save(drivingSchool);
            if (data.status !== enums_1.Status.Probation) {
                await queryRunner.manager.update(user_entity_1.User, { drivingSchoolId: id }, { isActive: data.status });
            }
            await queryRunner.manager.insert(audit_trail_entity_1.AuditTrail, {
                userId: user.id,
                dbAction: constants_1.auditAction.RECORD_MODIFIED,
                tableName: 'driving_schools',
                resourceId: id,
                description: `Updated driving school status to ${data.status}`,
                createdAt: new Date(),
            });
            await queryRunner.commitTransaction();
            response.success = true;
            response.message = messages_1.MESSAGES.recordUpdated;
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
    async drivingSchoolInspections(drivingSchoolId, data) {
        const response = { success: false, message: '', data: null };
        const limit = Number(data.resultPerPage || 10);
        const page = Number(data.page || 1);
        const offset = (page - 1) * limit;
        try {
            const queryBuilder = this.inspectionRepository
                .createQueryBuilder('inspections')
                .where('inspections.drivingSchoolId = :drivingSchoolId', { drivingSchoolId })
                .leftJoinAndSelect('inspections.drivingSchool', 'drivingSchool')
                .select([
                'inspections',
                'drivingSchool.identifier',
                'drivingSchool.name',
                'drivingSchool.email',
                'drivingSchool.phone',
            ])
                .orderBy('inspections.createdAt', data.order)
                .skip(offset)
                .take(limit);
            if (data.status) {
                queryBuilder.andWhere(`inspections.status = :status`, {
                    status: data.status,
                });
            }
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
            response.message = error.message;
        }
        return response;
    }
    async confirmApplicationPayment(paymentRef, user) {
        const response = { success: false, message: '', data: null };
        const queryRunner = await (0, all_dto_1.beginTransaction)(this.dataSource);
        try {
            const payment = await queryRunner.manager.findOne(payment_entity_1.Payment, {
                where: { reference: paymentRef, type: enums_1.TransactionType.drivingSchoolCompletionPayment },
            });
            if (!payment) {
                throw new common_1.NotFoundException('Payment not found');
            }
            if (payment.status !== enums_1.PaymentStatus.Completed) {
                throw new common_1.BadRequestException('Payment is not completed');
            }
            const application = await queryRunner.manager.findOne(driving_school_entity_1.DrivingSchool, {
                where: { id: user.drivingSchoolId },
            });
            if (!application) {
                throw new common_1.NotFoundException('Driving school application not found');
            }
            application.reference = paymentRef;
            await queryRunner.manager.save(application);
            payment.used = enums_1.Reference.Used;
            payment.status = enums_1.PaymentStatus.Used;
            await queryRunner.manager.save(payment);
            await queryRunner.manager.insert(audit_trail_entity_1.AuditTrail, {
                userId: user.id,
                dbAction: constants_1.auditAction.RECORD_MODIFIED,
                tableName: 'driving_schools',
                resourceId: application.id,
                description: `Payment confirmed for driving school with identifier number: ${application.identifier} with payment reference ${paymentRef}`,
                createdAt: new Date(),
            });
            await helpers_1.mailer
                .setSubject(messages_1.MESSAGES.applicationPaymentConfirmed)
                .setMessage(messages_1.MESSAGES.applicationPaymentConfirmedEmailBody(application.name, application.email, application.phone))
                .setTo(application.email)
                .setEmailNotificationRepository(queryRunner.manager.getRepository(email_notification_entity_1.EmailNotification))
                .sendDefault();
            await queryRunner.commitTransaction();
            response.success = true;
            response.message = 'Payment confirmed successfully';
            response.data = {
                paymentReference: payment.reference,
            };
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
    async queryApplication(drivingSchoolId, reasonForQuerying, user) {
        const response = { success: false, message: '', data: null };
        const queryRunner = await (0, all_dto_1.beginTransaction)(this.dataSource);
        try {
            const application = await queryRunner.manager.findOne(driving_school_entity_1.DrivingSchool, {
                where: { id: drivingSchoolId },
            });
            if (!application) {
                throw new common_1.NotFoundException('Application not found');
            }
            application.status = enums_1.Reg.Queried;
            await queryRunner.manager.save(application);
            await queryRunner.manager.insert(driving_school_application_query_entity_1.DrivingSchoolApplicationQuery, {
                application: { id: drivingSchoolId },
                reason: reasonForQuerying,
                queriedById: user.id,
            });
            await queryRunner.manager.insert(audit_trail_entity_1.AuditTrail, {
                userId: user.id,
                dbAction: constants_1.auditAction.RECORD_MODIFIED,
                tableName: 'driving_schools',
                resourceId: application.id,
                description: `Application queried for driving school ID ${drivingSchoolId} for reason: ${reasonForQuerying}`,
                createdAt: new Date(),
            });
            await helpers_1.mailer
                .setSubject(messages_1.MESSAGES.applicationQueried)
                .setMessage(messages_1.MESSAGES.applicationQueriedEmailBody(reasonForQuerying))
                .setTo(application.email)
                .setEmailNotificationRepository(queryRunner.manager.getRepository(email_notification_entity_1.EmailNotification))
                .sendDefault();
            await queryRunner.commitTransaction();
            response.success = true;
            response.message = 'Application queried successfully';
            response.data = {
                applicationId: application.id,
            };
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
    async requestInspection(user) {
        const response = { success: false, message: '', data: null };
        try {
            const application = await this.drivingSchoolRepository.findOne({
                where: { id: user.drivingSchoolId },
            });
            if (!application) {
                throw new common_1.NotFoundException(messages_1.MESSAGES.recordNotFound);
            }
            application.status = enums_1.Reg.Revalidated;
            await this.drivingSchoolRepository.save(application);
            response.success = true;
            response.message = messages_1.MESSAGES.inspectionRequested;
        }
        catch (error) {
            console.log(error);
            response.message = error.message;
        }
        return response;
    }
    async dashboardStats(data) {
        const statisticsType = data.type;
        switch (statisticsType) {
            case enums_1.StatisticsFilter.DrivingSchools:
                return this.getDrivingSchoolDashboardStats();
            case enums_1.StatisticsFilter.Students:
                return this.getStudentDashboardStats();
            case enums_1.StatisticsFilter.LASDRIOfficers:
                return this.getLASDRIROLEDashboardStats();
            case enums_1.StatisticsFilter.Revenue:
                return this.getRevenueDashboardStats(data.selectedYear, data.topLgaCount, data.bottomLgaCount);
            default:
                throw new common_1.BadRequestException('Invalid statistics type');
        }
    }
    async getDrivingSchoolDashboardStats() {
        const now = new Date();
        const lastMonth = new Date();
        lastMonth.setMonth(now.getMonth() - 1);
        const stats = await this.drivingSchoolRepository
            .createQueryBuilder('app')
            .select('COUNT(*)::int', 'totalApplications')
            .addSelect(`SUM(CASE WHEN app.status = :approved THEN 1 ELSE 0 END)::int`, 'totalApproved')
            .addSelect(`SUM(CASE WHEN app.status = :pending THEN 1 ELSE 0 END)::int`, 'totalPending')
            .addSelect(`SUM(CASE WHEN app.status = :initiated THEN 1 ELSE 0 END)::int`, 'totalInitiated')
            .addSelect(`SUM(CASE WHEN app.status = :queried THEN 1 ELSE 0 END)::int`, 'totalQueried')
            .addSelect(`SUM(CASE WHEN app.status = :revalidated THEN 1 ELSE 0 END)::int`, 'totalRevalidated')
            .addSelect(`SUM(CASE WHEN app.status = :initiated AND app.createdAt >= :lastMonth THEN 1 ELSE 0 END)::int`, 'monthlyInitiated')
            .addSelect(`SUM(CASE WHEN app.status = :pending AND app.createdAt >= :lastMonth THEN 1 ELSE 0 END)::int`, 'monthlyPending')
            .addSelect(`SUM(CASE WHEN app.status = :approved AND app.createdAt >= :lastMonth THEN 1 ELSE 0 END)::int`, 'monthlyApproved')
            .addSelect(`SUM(CASE WHEN app.status = :queried AND app.createdAt >= :lastMonth THEN 1 ELSE 0 END)::int`, 'monthlyQueried')
            .addSelect(`SUM(CASE WHEN app.status = :revalidated AND app.createdAt >= :lastMonth THEN 1 ELSE 0 END)::int`, 'monthlyRevalidated')
            .addSelect(`SUM(CASE WHEN app.status = :initiated AND app.createdAt < :lastMonth THEN 1 ELSE 0 END)::int`, 'lastMonthInitiated')
            .addSelect(`SUM(CASE WHEN app.status = :pending AND app.createdAt < :lastMonth THEN 1 ELSE 0 END)::int`, 'lastMonthPending')
            .addSelect(`SUM(CASE WHEN app.status = :approved AND app.createdAt < :lastMonth THEN 1 ELSE 0 END)::int`, 'lastMonthApproved')
            .addSelect(`SUM(CASE WHEN app.status = :queried AND app.createdAt < :lastMonth THEN 1 ELSE 0 END)::int`, 'lastMonthQueried')
            .addSelect(`SUM(CASE WHEN app.status = :revalidated AND app.createdAt < :lastMonth THEN 1 ELSE 0 END)::int`, 'lastMonthRevalidated')
            .setParameters({
            approved: enums_1.Reg.Approved,
            pending: enums_1.Reg.Pending,
            initiated: enums_1.Reg.Initiated,
            queried: enums_1.Reg.Queried,
            revalidated: enums_1.Reg.Revalidated,
            lastMonth,
        })
            .getRawOne();
        const [totalInspections, totalRequests] = await Promise.all([
            this.inspectionRepository.count(),
            stats.totalApplications,
        ]);
        const rawDistribution = await this.drivingSchoolRepository
            .createQueryBuilder('school')
            .select('school.is_active', 'status')
            .addSelect('COUNT(*)::int', 'count')
            .groupBy('school.is_active')
            .getRawMany();
        const statusMap = {
            [enums_1.Status.Active]: 'Active',
            [enums_1.Status.Probation]: 'Probation',
            [enums_1.Status.Suspended]: 'Suspended',
            [enums_1.Status.Inactive]: 'Inactive',
        };
        const drivingSchoolDistributionByStatus = rawDistribution.map((entry) => ({
            label: statusMap[entry.status],
            value: Number(entry.count),
        }));
        const distributionByLgaId = await this.drivingSchoolRepository
            .createQueryBuilder('school')
            .select('school.lgaId', 'lgaId')
            .addSelect('COUNT(*)::int', 'count')
            .groupBy('school.lgaId')
            .getRawMany();
        const drivingSchoolDistributionByLga = distributionByLgaId.map((entry) => {
            const lga = constants_1.lgas.find((l) => l.id === Number(entry.lgaId));
            return {
                lga: lga?.name ?? `Unknown (${entry.lgaId})`,
                count: Number(entry.count),
            };
        });
        return {
            applicationStats: {
                totalApplications: stats.totalApplications,
                totalApproved: stats.totalApproved,
                totalPending: stats.totalPending,
                totalInitiated: stats.totalInitiated,
                totalQueried: stats.totalQueried,
                totalRevalidated: stats.totalRevalidated,
            },
            monthlyChange: {
                initiated: (0, helpers_1.calculateChange)(stats.monthlyInitiated, stats.lastMonthInitiated),
                pending: (0, helpers_1.calculateChange)(stats.monthlyPending, stats.lastMonthPending),
                approved: (0, helpers_1.calculateChange)(stats.monthlyApproved, stats.lastMonthApproved),
                queried: (0, helpers_1.calculateChange)(stats.monthlyQueried, stats.lastMonthQueried),
                revalidated: (0, helpers_1.calculateChange)(stats.monthlyRevalidated, stats.lastMonthRevalidated),
            },
            applicationDistribution: {
                inspections: totalInspections,
                requests: totalRequests,
            },
            drivingSchoolDistributionByLga,
            drivingSchoolDistributionByStatus,
        };
    }
    async getStudentDashboardStats() {
        const now = new Date();
        const lastMonth = new Date();
        lastMonth.setMonth(now.getMonth() - 1);
        const stats = await this.studentRepository
            .createQueryBuilder('student')
            .select('COUNT(*)::int', 'totalStudents')
            .addSelect(`SUM(CASE WHEN student.graduated = true THEN 1 ELSE 0 END)::int`, 'certifiedStudents')
            .addSelect(`SUM(CASE WHEN student.graduated = false THEN 1 ELSE 0 END)::int`, 'registeredStudents')
            .getRawOne();
        const distributionByAgeGroup = await this.studentRepository
            .createQueryBuilder('student')
            .leftJoin('student.application', 'application')
            .select([
            `CASE 
      WHEN date_part('year', age(application.date_of_birth::date)) BETWEEN 18 AND 25 THEN 'Young Adults'
      WHEN date_part('year', age(application.date_of_birth::date)) BETWEEN 26 AND 35 THEN 'Early Career Adults'
      WHEN date_part('year', age(application.date_of_birth::date)) BETWEEN 36 AND 45 THEN 'Mid-Age Adults'
      WHEN date_part('year', age(application.date_of_birth::date)) BETWEEN 46 AND 55 THEN 'Mature Adults'
      WHEN date_part('year', age(application.date_of_birth::date)) >= 56 THEN 'Pre-Retirement'
      ELSE 'Unknown'
    END AS ageGroup`,
            'COUNT(*)::int AS count',
        ])
            .groupBy('ageGroup')
            .getRawMany();
        const distributionByGender = await this.studentRepository
            .createQueryBuilder('student')
            .leftJoin('student.application', 'application')
            .select([
            `CASE 
      WHEN application.genderId = ${constants_1.genders.find((g) => g.name === 'Male')?.id} THEN 'Male'
      WHEN application.genderId = ${constants_1.genders.find((g) => g.name === 'Female')?.id} THEN 'Female'
      ELSE 'Unknown'
      END AS gender`,
            'COUNT(*)::int AS count',
        ])
            .groupBy('gender')
            .getRawMany();
        const distributionByLgaId = await this.studentRepository
            .createQueryBuilder('student')
            .leftJoin('student.application', 'application')
            .select('application.lgaOfOriginId', 'lgaOfOriginId')
            .addSelect('COUNT(*)::int', 'count')
            .groupBy('application.lgaOfOriginId')
            .getRawMany();
        const studentDistributionByLga = distributionByLgaId.map((entry) => {
            const lga = constants_1.lgas.find((l) => l.id === Number(entry.lgaOfOriginId));
            return {
                lga: lga?.name ?? `Unknown (${entry.lgaOfOriginId})`,
                count: Number(entry.count),
            };
        });
        return {
            studentStats: stats,
            distributionByAgeGroup,
            distributionByGender,
            studentDistributionByLga,
        };
    }
    async getLASDRIROLEDashboardStats() {
        const result = await this.userRepository
            .createQueryBuilder('users')
            .select('COUNT(*)', 'total')
            .addSelect(`COUNT(CASE WHEN users."is_active" = ${enums_1.Status.Active} THEN 1 END)`, 'active')
            .addSelect(`COUNT(CASE WHEN users."is_active" = ${enums_1.Status.Inactive} THEN 1 END)`, 'inactive')
            .where('users."role_id" = :lasdriRoleId', { lasdriRoleId: roles_1.Role.LASDRI })
            .getRawOne();
        const stats = {
            total: Number(result.total),
            active: Number(result.active),
            inactive: Number(result.inactive),
        };
        const distributionByLgaId = await this.userRepository
            .createQueryBuilder('users')
            .select('users.lgaId', 'lgaId')
            .addSelect('COUNT(*)::int', 'count')
            .where('users."role_id" = :lasdriRoleId', { lasdriRoleId: roles_1.Role.LASDRI })
            .groupBy('users.lgaId')
            .getRawMany();
        const lasdriOfficerDistributionByLga = distributionByLgaId.map((entry) => {
            const lga = constants_1.lgas.find((l) => l.id === Number(entry.lgaId));
            return {
                lga: lga?.name ?? `Unknown (${entry.lgaId})`,
                count: Number(entry.count),
            };
        });
        return {
            stats,
            lasdriOfficerDistributionByLga,
        };
    }
    async getRevenueDashboardStats(selectedYear = new Date().getFullYear(), topLgaCount = 5, bottomLgaCount = 5) {
        const now = new Date();
        const lastMonth = new Date();
        lastMonth.setMonth(now.getMonth() - 1);
        const allowedTypes = [
            enums_1.TransactionType.drivingSchoolCompletionPayment,
            enums_1.TransactionType.drivingSchoolApplication,
            enums_1.TransactionType.inspectionFee,
        ];
        const currentStats = await this.paymentRepository
            .createQueryBuilder('transactions')
            .select('transactions.itemType', 'itemType')
            .addSelect('SUM(transactions.amount)', 'totalAmount')
            .where('transactions.status = :status', { status: enums_1.PaymentStatus.Completed })
            .andWhere('transactions.refunded = false')
            .andWhere('transactions.itemType IN (:...allowedTypes)', { allowedTypes })
            .andWhere('transactions.created_at BETWEEN :start AND :end', {
            start: new Date(now.getFullYear(), now.getMonth(), 1),
            end: new Date(now.getFullYear(), now.getMonth() + 1, 0),
        })
            .groupBy('transactions.itemType')
            .getRawMany();
        const currentMap = new Map();
        currentStats.forEach((entry) => {
            currentMap.set(entry.itemType, parseFloat(entry.totalAmount));
        });
        const lastStats = await this.paymentRepository
            .createQueryBuilder('transactions')
            .select('transactions.itemType', 'itemType')
            .addSelect('SUM(transactions.amount)', 'totalAmount')
            .where('transactions.status = :status', { status: enums_1.PaymentStatus.Completed })
            .andWhere('transactions.refunded = false')
            .andWhere('transactions.itemType IN (:...allowedTypes)', { allowedTypes })
            .andWhere('transactions.created_at BETWEEN :start AND :end', {
            start: new Date(lastMonth.getFullYear(), lastMonth.getMonth(), 1),
            end: new Date(lastMonth.getFullYear(), lastMonth.getMonth() + 1, 0),
        })
            .groupBy('transactions.itemType')
            .getRawMany();
        const lastMap = new Map();
        lastStats.forEach((entry) => {
            lastMap.set(entry.itemType, parseFloat(entry.totalAmount));
        });
        const revenueByType = allowedTypes.map((type) => {
            const currentAmount = currentMap.get(type) || 0;
            const lastAmount = lastMap.get(type) || 0;
            const percentageChange = (0, helpers_1.calculateChange)(currentAmount, lastAmount);
            const label = (() => {
                switch (type) {
                    case enums_1.TransactionType.drivingSchoolApplication:
                        return 'Student Registration';
                    case enums_1.TransactionType.drivingSchoolCompletionPayment:
                        return 'Application Fee';
                    case enums_1.TransactionType.inspectionFee:
                        return 'Inspection Fee';
                    default:
                        return 'Unknown';
                }
            })();
            return {
                itemType: label,
                amount: currentAmount,
                percentageChange,
            };
        });
        const MONTH_NAMES = [
            'JAN',
            'FEB',
            'MAR',
            'APR',
            'MAY',
            'JUN',
            'JUL',
            'AUG',
            'SEP',
            'OCT',
            'NOV',
            'DEC',
        ];
        const revenueStatsRaw = await this.paymentRepository
            .createQueryBuilder('payment')
            .select(`EXTRACT(MONTH FROM payment.createdAt)`, 'month')
            .addSelect(`SUM(payment.amount)::float`, 'totalRevenue')
            .where(`EXTRACT(YEAR FROM payment.createdAt) = :year`, { year: selectedYear })
            .groupBy('month')
            .orderBy('month', 'ASC')
            .getRawMany();
        const monthlyRevenue = Array.from({ length: 12 }, (_, index) => {
            const monthData = revenueStatsRaw.find((m) => Number(m.month) === index + 1);
            return {
                month: MONTH_NAMES[index],
                revenue: monthData ? Number(monthData.totalRevenue) : 0,
            };
        });
        const totalRevenue = revenueByType.reduce((acc, entry) => acc + entry.amount, 0);
        const distributionByItemType = allowedTypes.map((type) => {
            const amount = currentMap.get(type) || 0;
            const percentage = totalRevenue > 0 ? Number(((amount / totalRevenue) * 100).toFixed(1)) : 0;
            const label = (() => {
                switch (type) {
                    case enums_1.TransactionType.drivingSchoolApplication:
                        return 'Student Registration';
                    case enums_1.TransactionType.drivingSchoolCompletionPayment:
                        return 'Application Fee';
                    case enums_1.TransactionType.inspectionFee:
                        return 'Inspection Fee';
                    default:
                        return 'Unknown';
                }
            })();
            return {
                itemType: label,
                amount,
                percentage,
            };
        });
        const topLgaRevenueStats = await this.paymentRepository
            .createQueryBuilder('payment')
            .leftJoin(pre_registration_entity_1.PreRegistration, 'preReg', 'payment.item_type = :preType AND payment.reference = preReg.reference', { preType: enums_1.TransactionType.preRegistration })
            .leftJoin(driving_school_application_entity_1.DrivingSchoolApplication, 'application', 'payment.item_type IN (:...dsTypes) AND payment.reference = application.reference', { dsTypes: [enums_1.TransactionType.drivingSchoolApplication, enums_1.TransactionType.inspectionFee] })
            .leftJoin(driving_school_entity_1.DrivingSchool, 'school', 'school.id = COALESCE(preReg.driving_school_id, application.driving_school_id)')
            .select('school.lga_id', 'lgaId')
            .addSelect('COUNT(payment.id)', 'paymentCount')
            .where('payment.status = :status', { status: enums_1.PaymentStatus.Completed })
            .andWhere('payment.refunded = false')
            .andWhere('payment.item_type IN (:...allowedTypes)', { allowedTypes })
            .groupBy('school.lga_id')
            .orderBy('"paymentCount"', 'DESC')
            .limit(topLgaCount)
            .getRawMany();
        const bottomLgaRevenueStats = await this.paymentRepository
            .createQueryBuilder('payment')
            .leftJoin(pre_registration_entity_1.PreRegistration, 'preReg', 'payment.item_type = :preType AND payment.reference = preReg.reference', { preType: enums_1.TransactionType.preRegistration })
            .leftJoin(driving_school_application_entity_1.DrivingSchoolApplication, 'application', 'payment.item_type IN (:...dsTypes) AND payment.reference = application.reference', { dsTypes: [enums_1.TransactionType.drivingSchoolApplication, enums_1.TransactionType.inspectionFee] })
            .leftJoin(driving_school_entity_1.DrivingSchool, 'school', 'school.id = COALESCE(preReg.driving_school_id, application.driving_school_id)')
            .select('school.lga_id', 'lgaId')
            .addSelect('COUNT(payment.id)', 'paymentCount')
            .where('payment.status = :status', { status: enums_1.PaymentStatus.Completed })
            .andWhere('payment.refunded = false')
            .andWhere('payment.item_type IN (:...allowedTypes)', { allowedTypes })
            .groupBy('school.lga_id')
            .orderBy('"paymentCount"', 'ASC')
            .limit(bottomLgaCount)
            .getRawMany();
        const mapToLgaDistribution = (stats) => stats.map((row) => {
            const lga = constants_1.lgas.find((l) => l.id === Number(row.lgaId));
            return {
                lga: lga?.name ?? `Unknown (${row.lgaId})`,
                count: parseInt(row.paymentCount, 10),
            };
        });
        const topLgaRevenueDistribution = mapToLgaDistribution(topLgaRevenueStats);
        const bottomLgaRevenueDistribution = mapToLgaDistribution(bottomLgaRevenueStats);
        return {
            totalRevenue,
            revenueByType,
            monthlyRevenueStats: {
                year: selectedYear,
                data: monthlyRevenue,
            },
            distributionByItemType,
            topLgaRevenueDistribution,
            bottomLgaRevenueDistribution,
        };
    }
    async listLasdriOfficers(data) {
        const response = { success: false, message: '', data: null };
        const search = data.search || null;
        const limit = Number(data.resultPerPage || 10);
        const page = Number(data.page || 1);
        const offset = (page - 1) * limit;
        try {
            const queryBuilder = this.userRepository
                .createQueryBuilder('users')
                .where('users.roleId = :roleId', { roleId: roles_1.Role.LASDRI });
            if (search) {
                queryBuilder.andWhere(new typeorm_2.Brackets((qb) => {
                    qb.where('users.firstName ILIKE :search', { search: `%${search}%` })
                        .orWhere('users.lastName ILIKE :search', { search: `%${search}%` })
                        .orWhere('users.email ILIKE :search', { search: `%${search}%` })
                        .orWhere('users.phone ILIKE :search', { search: `%${search}%` });
                }));
            }
            queryBuilder
                .select([
                'users.id',
                'users.firstName',
                'users.middleName',
                'users.lastName',
                'users.email',
                'users.phone',
                'users.roleId',
                'users.roleName',
                'users.stateId',
                'users.lgaId',
                'users.drivingSchoolId',
                'users.avatar',
                'users.changePasswordNextLogin',
            ])
                .skip(offset)
                .take(limit)
                .orderBy('users.id', 'DESC');
            const [officers, count] = await queryBuilder.getManyAndCount();
            response.success = true;
            response.message = messages_1.MESSAGES.recordFound;
            response.data = {
                result: officers.map((officer) => (0, class_transformer_1.plainToInstance)(users_dto_1.UserResponseDto, officer)),
                pagination: (0, functions_helpers_1.getPagination)(count, page, offset, limit),
            };
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException(error.message);
        }
        return response;
    }
};
exports.DrivingSchoolService = DrivingSchoolService;
exports.DrivingSchoolService = DrivingSchoolService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(driving_school_entity_1.DrivingSchool)),
    __param(1, (0, typeorm_1.InjectRepository)(training_duration_entity_1.TrainingDuration)),
    __param(2, (0, typeorm_1.InjectRepository)(driving_school_application_entity_1.DrivingSchoolApplication)),
    __param(3, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __param(4, (0, typeorm_1.InjectRepository)(payment_entity_1.Payment)),
    __param(5, (0, typeorm_1.InjectRepository)(applicant_file_entity_1.ApplicantFile)),
    __param(6, (0, typeorm_1.InjectRepository)(audit_trail_entity_1.AuditTrail)),
    __param(9, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(10, (0, typeorm_1.InjectRepository)(driving_school_instructor_entity_1.DrivingSchoolInstructor)),
    __param(11, (0, typeorm_1.InjectRepository)(email_notification_entity_1.EmailNotification)),
    __param(13, (0, typeorm_1.InjectRepository)(inspection_entity_1.Inspection)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        auth_service_1.AuthService,
        users_service_1.UsersService,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource,
        typeorm_2.Repository])
], DrivingSchoolService);
//# sourceMappingURL=driving-school.service.js.map