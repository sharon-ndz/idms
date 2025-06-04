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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../../entities/user.entity");
const users_dto_1 = require("./users.dto");
const roles_1 = require("../../middlewares/roles");
const class_transformer_1 = require("class-transformer");
const email_notification_entity_1 = require("../../entities/email-notification.entity");
const bcrypt_1 = require("bcrypt");
const driving_school_application_entity_1 = require("../../entities/driving-school-application.entity");
const audit_trail_entity_1 = require("../../entities/audit-trail.entity");
const all_dto_1 = require("../../core/interfaces/all.dto");
const driving_school_entity_1 = require("../../entities/driving-school.entity");
const messages_1 = require("../../core/constants/messages");
const constants_1 = require("../../core/constants/constants");
const enums_1 = require("../../core/constants/enums");
const functions_helpers_1 = require("../../core/helpers/functions.helpers");
const helpers_1 = require("../../core/helpers");
let UsersService = class UsersService {
    constructor(emailNotificationRepository, auditTrailRepository, dataSource) {
        this.emailNotificationRepository = emailNotificationRepository;
        this.auditTrailRepository = auditTrailRepository;
        this.dataSource = dataSource;
        this.userRepository = this.dataSource.getRepository(user_entity_1.User);
        this.drivingSchoolRepository = this.dataSource.getRepository(driving_school_entity_1.DrivingSchool);
    }
    async stats(user) {
        const response = { success: false, message: '', data: null };
        try {
            let result;
            if (user.roleId === roles_1.Role.LASDRI_ADMIN) {
                result = await this.userRepository
                    .createQueryBuilder('users')
                    .select([
                    'COUNT(*) AS totalusers',
                    'COUNT(CASE WHEN users.isActive = 0 THEN 1 END) AS inactiveusers',
                    "COUNT(CASE WHEN users.createdAt >= NOW() - INTERVAL '7 days' THEN 1 END) AS newusers",
                    `COUNT(CASE WHEN users.roleId = ${roles_1.Role.LASDRI_ADMIN} THEN 1 END) AS lasdriadmins`,
                    `COUNT(CASE WHEN users.roleId = ${roles_1.Role.LASDRI} THEN 1 END) AS lasdriofficers`,
                ])
                    .where('users.roleId IN (:...roles)', {
                    roles: [roles_1.Role.LASDRI, roles_1.Role.LASDRI_ADMIN],
                })
                    .getRawOne();
                response.data = {
                    totalUsers: parseInt(result.totalusers, 10) || 0,
                    inactiveUsers: parseInt(result.inactiveusers, 10) || 0,
                    newUsers: parseInt(result.newusers, 10) || 0,
                    lasdriAdmins: parseInt(result.lasdriadmins, 10) || 0,
                    lasdriOfficers: parseInt(result.lasdriofficers, 10) || 0,
                };
            }
            else {
                result = await this.userRepository
                    .createQueryBuilder('users')
                    .select([
                    'COUNT(*) AS totalusers',
                    'COUNT(CASE WHEN users.isActive = 0 THEN 1 END) AS inactiveusers',
                    "COUNT(CASE WHEN users.createdAt >= NOW() - INTERVAL '7 days' THEN 1 END) AS newusers",
                ])
                    .getRawOne();
                response.data = {
                    totalUsers: parseInt(result.totalusers, 10) || 0,
                    inactiveUsers: parseInt(result.inactiveusers, 10) || 0,
                    newUsers: parseInt(result.newusers, 10) || 0,
                };
            }
            response.success = true;
            response.message = messages_1.MESSAGES.recordFound;
        }
        catch (error) {
            console.error(error);
            console.log(`Queried by user ${user.id}`);
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
        const queryBuilder = this.userRepository.createQueryBuilder('users');
        queryBuilder.select([
            'users.id',
            'users.firstName',
            'users.middleName',
            'users.lastName',
            'users.phone',
            'users.email',
            'users.avatar',
            'users.stateId',
            'users.lgaId',
            'users.drivingSchoolId',
            'users.roleId',
            'users.roleName',
            'users.changePasswordNextLogin',
        ]);
        if (user && user.roleId === roles_1.Role.LASDRI_ADMIN) {
            queryBuilder.andWhere('users.roleId IN (:...roles)', {
                roles: [roles_1.Role.LASDRI, roles_1.Role.LASDRI_ADMIN],
            });
        }
        if (data.stateId) {
            queryBuilder.andWhere('users.stateId = :stateId', { stateId: data.stateId });
        }
        if (data.lgaId) {
            queryBuilder.andWhere('users.lgaId = :lgaId', { lgaId: data.lgaId });
        }
        if (data.roleId) {
            queryBuilder.andWhere('users.roleId = :roleId', { roleId: data.roleId });
        }
        if (data.status) {
            queryBuilder.andWhere('users.isActive = :status', { status: data.status });
        }
        if (data.drivingSchoolId) {
            queryBuilder.andWhere('users.drivingSchoolId = :drivingSchoolId', {
                drivingSchoolId: data.drivingSchoolId,
            });
        }
        if (search) {
            queryBuilder.andWhere(new typeorm_2.Brackets((qb) => {
                qb.where('users.email LIKE :search', { search: `%${search}%` })
                    .orWhere('users.firstName LIKE :search', { search: `%${search}%` })
                    .orWhere('users.lastName LIKE :search', { search: `%${search}%` });
            }));
        }
        queryBuilder.skip(offset);
        queryBuilder.take(limit);
        queryBuilder.orderBy('users.id', data.order);
        try {
            const [result, count] = await queryBuilder.getManyAndCount();
            if (result) {
                const userResponseDtos = result.map((user) => (0, class_transformer_1.plainToInstance)(users_dto_1.UserResponseDto, user));
                response.data = {
                    result: userResponseDtos,
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
    async getSingle(userId, user) {
        const response = { success: false, message: '', data: null };
        try {
            const user = await this.userRepository.findOne({ where: { id: userId } });
            if (!user) {
                throw new common_1.BadRequestException(messages_1.MESSAGES.recordNotFound);
            }
            response.data = (0, class_transformer_1.plainToInstance)(user_entity_1.User, user);
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
    async createUser(data, user) {
        const response = { success: false, message: '', data: null };
        try {
            const existingUser = await this.userRepository.findOne({
                where: [{ email: data.email }, { phone: data.phone }],
            });
            if (existingUser) {
                throw new common_1.BadRequestException(messages_1.MESSAGES.recordExists);
            }
            const userData = (0, class_transformer_1.plainToInstance)(user_entity_1.User, data);
            const rawPassword = (0, functions_helpers_1.hexCode)({ count: 8 });
            userData.password = rawPassword;
            userData.roleName = (0, roles_1.RoleName)(data.roleId);
            userData.isActive = enums_1.Status.Active;
            const userRecord = await this.userRepository.save(userData);
            if (data.email) {
                await helpers_1.mailer
                    .setSubject(messages_1.MESSAGES.accountCreatedSubject)
                    .setMessage(messages_1.MESSAGES.userAccountCreated(rawPassword, userData.email))
                    .setTo(userData.email)
                    .setEmailNotificationRepository(this.emailNotificationRepository)
                    .sendDefault();
            }
            await this.auditTrailRepository.insert({
                userId: user.id,
                dbAction: constants_1.auditAction.RECORD_ADD,
                tableName: 'users',
                resourceId: userRecord.id,
                description: `User ${userRecord.email} created successfully`,
            });
            response.data = (0, class_transformer_1.plainToInstance)(user_entity_1.User, userRecord);
            response.success = true;
            response.message = messages_1.MESSAGES.recordAdded;
        }
        catch (error) {
            console.log(error);
            response.message = error.message;
        }
        return response;
    }
    async updateUser(data, user) {
        const response = { success: false, message: '' };
        try {
            const exists = await this.userRepository.findOne({
                where: { id: data.id },
            });
            if (!exists) {
                throw new common_1.BadRequestException(messages_1.MESSAGES.recordNotFound);
            }
            const rounds = (0, bcrypt_1.genSaltSync)(parseInt(process.env.SALT_ROUND));
            const userData = (0, class_transformer_1.plainToInstance)(user_entity_1.User, data);
            userData.password = (0, bcrypt_1.hashSync)(data.password, rounds);
            userData.roleName = (0, roles_1.RoleName)(data.roleId);
            await this.userRepository.update({ id: data.id }, userData);
            if (user) {
                await this.auditTrailRepository.insert({
                    userId: user.id,
                    dbAction: constants_1.auditAction.RECORD_MODIFIED,
                    tableName: 'users',
                    resourceId: exists.id,
                    description: `User ${exists.email} updated successfully`,
                });
            }
            response.success = true;
            response.message = messages_1.MESSAGES.recordUpdated;
        }
        catch (error) {
            console.log(error);
            response.message = error.message;
        }
        return response;
    }
    async getProfile(user) {
        const response = { success: false, message: 'ok', data: null };
        const userRecord = await this.userRepository.findOneBy({ id: user.id });
        response.data = (0, class_transformer_1.plainToInstance)(user_entity_1.User, userRecord);
        response.success = true;
        return response;
    }
    async updateProfile(data, user) {
        const response = { success: false, message: '' };
        try {
            const userData = (0, class_transformer_1.plainToInstance)(user_entity_1.User, data);
            await this.userRepository.update({ id: user.id }, userData);
            response.success = true;
            response.message = messages_1.MESSAGES.recordUpdated;
        }
        catch (error) {
            console.log(error);
            response.message = error.message;
        }
        return response;
    }
    async updateUserBiometrics(data) {
        const response = { success: false, message: '' };
        try {
            const user = await this.findUserBy({ email: data.email });
            if (!user) {
                throw new common_1.BadRequestException('User ' + messages_1.MESSAGES.recordNotFound);
            }
            user.files = data.files;
            await this.update(user.id, user);
            response.success = true;
            response.message = 'User biometrics record updated!';
        }
        catch (error) {
            console.log(error);
            response.message = error.message;
        }
        return response;
    }
    async createUserInternal(data) {
        const response = { success: false, message: '' };
        try {
            const existingUser = await this.userRepository.findOne({
                where: [{ email: data.email }, { phone: data.phone }],
            });
            if (!existingUser) {
                const rounds = (0, bcrypt_1.genSaltSync)(parseInt(process.env.SALT_ROUND));
                const userData = (0, class_transformer_1.plainToInstance)(user_entity_1.User, data);
                userData.roleName = (0, roles_1.RoleName)(data.roleId);
                userData.isActive = enums_1.Status.Active;
                userData.password = (0, bcrypt_1.hashSync)(data.password, rounds);
                await this.userRepository.insert(userData);
                response.message = messages_1.MESSAGES.recordAdded;
            }
            else {
                response.message = messages_1.MESSAGES.recordExists;
            }
            response.success = true;
        }
        catch (error) {
            console.log(error);
            response.message = error.message;
        }
        return response;
    }
    async save(data) {
        return await this.userRepository.save(data);
    }
    async updateNode(userId, nodeId) {
        return await this.userRepository.update(userId, { node: { id: nodeId } });
    }
    async update(id, user) {
        await this.userRepository.update(id, user);
    }
    async findByCount(where) {
        return await this.userRepository.count(where);
    }
    async findUserBy(where) {
        return await this.userRepository.findOneBy(where);
    }
    async findUser(options) {
        return await this.userRepository.findOne(options);
    }
    async toggleUserStatus(id, data, user) {
        const response = { success: false, message: '' };
        const queryRunner = await (0, all_dto_1.beginTransaction)(this.dataSource);
        try {
            const foundUser = await queryRunner.manager.findOne(user_entity_1.User, { where: { id } });
            if (!foundUser) {
                throw new common_1.BadRequestException('User not found');
            }
            foundUser.isActive = data.status;
            await queryRunner.manager.save(foundUser);
            await queryRunner.manager.insert(audit_trail_entity_1.AuditTrail, {
                userId: user.id,
                dbAction: constants_1.auditAction.RECORD_MODIFIED,
                tableName: 'users',
                resourceId: foundUser.id,
                description: `User status for ${foundUser.email} updated to ${data.status ? 'Active' : 'Inactive'}`,
                createdAt: new Date(),
            });
            response.success = true;
            response.message = 'User status updated successfully';
            await queryRunner.commitTransaction();
            return response;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw new common_1.InternalServerErrorException(error.message);
        }
        finally {
            await queryRunner.release();
        }
    }
    async getMySchoolApplication(user) {
        const response = { success: false, message: '', data: null };
        try {
            const application = await this.drivingSchoolRepository.findOne({
                where: { id: user.drivingSchoolId },
                relations: {
                    queries: true,
                    instructors: true,
                    inspections: true,
                },
            });
            if (!application) {
                throw new common_1.BadRequestException(messages_1.MESSAGES.recordNotFound);
            }
            response.data = (0, class_transformer_1.plainToInstance)(driving_school_application_entity_1.DrivingSchoolApplication, application);
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
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(email_notification_entity_1.EmailNotification)),
    __param(1, (0, typeorm_1.InjectRepository)(audit_trail_entity_1.AuditTrail)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], UsersService);
//# sourceMappingURL=users.service.js.map