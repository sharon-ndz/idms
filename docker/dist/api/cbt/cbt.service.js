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
exports.CbtService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const cbt_center_entity_1 = require("../../entities/cbt-center.entity");
const messages_1 = require("../../core/constants/messages");
const constants_1 = require("../../core/constants/constants");
const cbt_schedule_entity_1 = require("../../entities/cbt-schedule.entity");
const question_entity_1 = require("../../entities/question.entity");
const student_entity_1 = require("../../entities/student.entity");
const enums_1 = require("../../core/constants/enums");
const payment_service_1 = require("../payment/payment.service");
const all_dto_1 = require("../../core/interfaces/all.dto");
const functions_helpers_1 = require("../../core/helpers/functions.helpers");
const audit_trail_entity_1 = require("../../entities/audit-trail.entity");
let CbtService = class CbtService {
    constructor(cbtCenterRepository, cbtScheduleRepository, questionRepository, studentRepository, auditTrailRepository, paymentService, dataSource) {
        this.cbtCenterRepository = cbtCenterRepository;
        this.cbtScheduleRepository = cbtScheduleRepository;
        this.questionRepository = questionRepository;
        this.studentRepository = studentRepository;
        this.auditTrailRepository = auditTrailRepository;
        this.paymentService = paymentService;
        this.dataSource = dataSource;
    }
    async getCbtCenters(data) {
        const response = { success: false, message: '', data: null };
        const limit = Number(data.resultPerPage || 10);
        const page = Number(data.page || 1);
        const offset = (page - 1) * limit;
        try {
            const whereClause = {
                select: ['id', 'name', 'stateId', 'lgaId', 'isActive'],
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
            const [result, count] = await this.cbtCenterRepository.findAndCount(whereClause);
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
    async createCenter(data) {
        const response = { success: false, message: '', data: null };
        try {
            const exists = await this.cbtCenterRepository.findOne({
                where: data,
            });
            if (exists) {
                throw new common_1.BadRequestException(messages_1.MESSAGES.recordExists);
            }
            const cbtCenter = await this.cbtCenterRepository.save(data);
            response.success = true;
            response.data = cbtCenter;
            response.message = messages_1.MESSAGES.recordAdded;
        }
        catch (error) {
            console.log(error);
            response.message = error.message;
        }
        return response;
    }
    async updateCenter(data) {
        const response = { success: false, message: '', data: null };
        try {
            const cbtCenter = await this.cbtCenterRepository.findOne({
                where: { id: data.id },
            });
            if (!cbtCenter) {
                throw new common_1.BadRequestException(messages_1.MESSAGES.recordNotFound);
            }
            await this.cbtCenterRepository.update({ id: data.id }, data);
            response.success = true;
            response.message = messages_1.MESSAGES.recordUpdated;
        }
        catch (error) {
            console.log(error);
            response.message = error.message;
        }
        return response;
    }
    async getSlots(data) {
        const response = { success: false, message: '', data: null };
        try {
            const cbtCenterID = data.cbtCenterId;
            const cbtCenter = await this.cbtCenterRepository.findOne({ where: { id: cbtCenterID } });
            if (!cbtCenter) {
                throw new Error('CBT Center not found');
            }
            const bookedSlots = await this.cbtScheduleRepository.find({
                where: { cbtCenterId: cbtCenterID },
                select: ['date', 'time'],
            });
            const endDate = new Date();
            endDate.setMonth(new Date().getMonth() + 1);
            const availableSlots = [];
            const currentDate = new Date();
            while (currentDate <= endDate) {
                const dateString = currentDate.toISOString().split('T')[0];
                const times = [];
                for (let hour = 8; hour <= 17; hour++) {
                    for (let minute = 0; minute < 60; minute += 30) {
                        const formattedTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:00`;
                        times.push(formattedTime);
                    }
                }
                availableSlots.push({ date: dateString, times });
                currentDate.setDate(currentDate.getDate() + 1);
            }
            const openSlots = availableSlots
                .map((slot) => {
                const availableTimes = slot.times.filter((time) => !bookedSlots.some((bookedSlot) => bookedSlot.date === slot.date && bookedSlot.time === time));
                return { ...slot, times: availableTimes };
            })
                .filter((slot) => slot.times.length > 0);
            response.success = true;
            response.data = {
                bookedSlots: bookedSlots,
                availableSlots: openSlots,
            };
            response.message = messages_1.MESSAGES.recordFound;
        }
        catch (error) {
            console.log(error);
            response.message = error.message;
        }
        return response;
    }
    async bookSlot(data) {
        const response = { success: false, message: '', data: null };
        try {
            const cbtCenterID = data.cbtCenterId;
            const cbtCenter = await this.cbtCenterRepository.findOne({ where: { id: cbtCenterID } });
            if (!cbtCenter) {
                throw new Error('CBT Center not found');
            }
            const checkBooked = await this.cbtScheduleRepository.findOne({
                where: {
                    date: data.date,
                    time: data.time,
                    studentId: data.studentId,
                    cbtCenterId: data.cbtCenterId,
                },
            });
            if (checkBooked) {
                throw new common_1.BadRequestException('This date and time already booked by student');
            }
            const bookedByOthers = await this.cbtScheduleRepository.findOne({
                where: { date: data.date, time: data.time, cbtCenterId: data.cbtCenterId },
            });
            if (bookedByOthers) {
                throw new common_1.BadRequestException('This date and time already booked.');
            }
            await this.cbtScheduleRepository.insert(data);
            response.success = true;
            response.data = data;
            response.message = messages_1.MESSAGES.recordAdded;
        }
        catch (error) {
            console.log(error);
            response.message = error.message;
        }
        return response;
    }
    async scheduleTest(studentId, cbtCenterId, scheduleDto) {
        const queryRunner = await (0, all_dto_1.beginTransaction)(this.dataSource);
        try {
            const cbtCenter = await queryRunner.manager.findOne(cbt_center_entity_1.CbtCenter, {
                where: { id: cbtCenterId },
            });
            if (!cbtCenter) {
                throw new Error('CBT Center not found');
            }
            const preBooked = await queryRunner.manager.findOne(cbt_schedule_entity_1.CbtSchedule, {
                where: {
                    studentId: studentId,
                    cbtCenterId: cbtCenterId,
                    date: scheduleDto.date,
                    time: scheduleDto.time,
                },
            });
            if (!preBooked) {
                throw new Error('No pro-booked date and time slot for this schedule.');
            }
            preBooked.status = enums_1.BookingStatus.Booked;
            if (!scheduleDto.cbtStatus) {
                preBooked.cbtStatus = enums_1.CbtStatus.Scheduled;
            }
            if (scheduleDto.transactionId) {
                preBooked.transactionId = scheduleDto.transactionId;
            }
            await queryRunner.manager.save(preBooked);
            const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
            await queryRunner.manager.delete(cbt_schedule_entity_1.CbtSchedule, {
                score: 0,
                status: enums_1.BookingStatus.Pending,
                createdAt: (0, typeorm_2.LessThan)(fiveMinutesAgo),
            });
            await queryRunner.commitTransaction();
            return preBooked.id;
        }
        catch (error) {
            console.log(error);
            await queryRunner.rollbackTransaction();
        }
        finally {
            await queryRunner.release();
        }
        return null;
    }
    async getTestByStudent(data) {
        const response = { success: false, message: '', data: null };
        try {
            const student = await this.studentRepository.findOne({
                where: { studentNo: data.studentNo },
            });
            if (!student) {
                throw new common_1.BadRequestException('Student record not found!');
            }
            const schedule = await this.cbtScheduleRepository.findOne({
                where: { studentId: student.id },
            });
            if (!schedule) {
                throw new common_1.BadRequestException('Student test schedule not found!');
            }
            const queryBuilder = this.questionRepository.createQueryBuilder('questions');
            if (data.category) {
                queryBuilder.andWhere('questions.category = :category', { category: data.category });
            }
            if (data.difficultyLevel) {
                queryBuilder.andWhere('questions.difficultyLevel = :difficultyLevel', {
                    difficultyLevel: data.difficultyLevel,
                });
            }
            queryBuilder.orderBy('RANDOM()');
            const questions = await queryBuilder.getMany();
            if (!questions || questions.length === 0) {
                throw new common_1.NotFoundException('No questions found for this test');
            }
            response.data = {
                questions: questions,
                totalTimeInSeconds: 3600,
            };
            response.success = true;
            response.message = messages_1.MESSAGES.recordFound;
        }
        catch (error) {
            console.log(error);
            response.message = error.message;
        }
        return response;
    }
    async submitTest(data) {
        const response = { success: false, message: '', data: null };
        try {
            const student = await this.studentRepository.findOne({
                where: { studentNo: data.studentNo },
            });
            if (!student) {
                throw new common_1.BadRequestException('Student record not found!');
            }
            const schedule = await this.cbtScheduleRepository.findOne({
                where: { studentId: student.id },
            });
            if (!schedule) {
                throw new common_1.BadRequestException('Student test schedule not found!');
            }
            const questionIds = Object.keys(data.answers).map(Number);
            const questions = await this.questionRepository
                .createQueryBuilder('questions')
                .where('questions.id IN (:...questionIds)', { questionIds })
                .getMany();
            let score = 0;
            for (const question of questions) {
                const userAnswer = data.answers[question.id.toString()];
                const isCorrect = userAnswer && userAnswer === question.correctAnswer;
                if (isCorrect) {
                    score++;
                }
            }
            schedule.answers = data.answers;
            schedule.score = score;
            await this.cbtScheduleRepository.update({ id: schedule.id }, schedule);
            response.data = schedule;
            response.success = true;
            response.message = messages_1.MESSAGES.recordUpdated;
        }
        catch (error) {
            console.log(error);
            response.message = error.message;
        }
        return response;
    }
    async cbtEnrolls(user) {
        const response = { success: false, message: '', data: null };
        try {
            const enrolls = await this.cbtScheduleRepository.find({
                where: [{ assessedBy: { id: user.id } }, { assessedBy: (0, typeorm_2.IsNull)() }],
                relations: ['cbtCenter', 'student.application'],
            });
            response.success = true;
            response.data = enrolls;
            response.message = messages_1.MESSAGES.recordFound;
        }
        catch (error) {
            console.log(error);
            response.message = error.message;
        }
        return response;
    }
    async questionList(data) {
        const response = { success: false, message: '', data: null };
        const search = data.search || null;
        const limit = Number(data.resultPerPage || 10);
        const page = Number(data.page || 1);
        const offset = (page - 1) * limit;
        const queryBuilder = this.questionRepository.createQueryBuilder('questions');
        if (data.category) {
            queryBuilder.where('questions.category = :category', {
                category: data.category,
            });
        }
        if (data.difficultyLevel) {
            queryBuilder.where('questions.difficultyLevel = :difficultyLevel', {
                difficultyLevel: data.difficultyLevel,
            });
        }
        if (search) {
            queryBuilder.andWhere(new typeorm_2.Brackets((qb) => {
                qb.where('questions.questionText ILIKE :search', { search: `%${search}%` });
            }));
        }
        queryBuilder.skip(offset);
        queryBuilder.take(limit);
        queryBuilder.orderBy('questions.id', 'DESC');
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
            response.message = error.message;
        }
        return response;
    }
    async updateQuestion(data, user) {
        const response = { success: false, message: '', data: null };
        try {
            const question = await this.questionRepository.findOne({ where: { id: data.id } });
            if (!question) {
                throw new common_1.BadRequestException(messages_1.MESSAGES.recordNotFound);
            }
            const newQuestion = this.questionRepository.create(data);
            await this.questionRepository.update({ id: data.id }, newQuestion);
            response.data = newQuestion;
            await this.auditTrailRepository.insert({
                userId: user.id,
                dbAction: constants_1.auditAction.RECORD_MODIFIED,
                tableName: 'questions',
                resourceId: response.data.id,
                description: `Question updated successfully`,
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
    async createQuestion(createQuestionDto, user) {
        const response = { success: false, message: '', data: null };
        try {
            const newQuestion = this.questionRepository.create(createQuestionDto);
            response.data = await this.questionRepository.save(newQuestion);
            await this.auditTrailRepository.insert({
                userId: user.id,
                dbAction: constants_1.auditAction.RECORD_ADD,
                tableName: 'questions',
                resourceId: response.data.id,
                description: `Question created successfully`,
            });
            response.success = true;
            response.message = messages_1.MESSAGES.recordAdded;
        }
        catch (error) {
            console.log(error);
            response.message = error.message;
        }
        return response;
    }
    async getFailedAttempts(studentId) {
        const response = { success: false, message: '', data: null };
        try {
            const currentDate = new Date();
            const student = await this.studentRepository.findOne({
                where: { id: studentId },
            });
            if (!student) {
                throw new common_1.BadRequestException('Student does not exist');
            }
            const failedAttempts = await this.cbtScheduleRepository.find({
                where: { studentId: student.id, cbtStatus: enums_1.CbtStatus.Failed },
                order: { date: 'DESC', time: 'DESC', createdAt: 'DESC' },
            });
            const numberOfFailedAttempts = failedAttempts.length;
            let nextRescheduleDate = null;
            const totalRescheduleAttempts = constants_1.appConstants.totalRescheduleAttempts;
            if (numberOfFailedAttempts === totalRescheduleAttempts - 1) {
                nextRescheduleDate = this.addMonths(currentDate, 3);
            }
            else if (numberOfFailedAttempts === totalRescheduleAttempts - 2) {
                nextRescheduleDate = this.addMonths(currentDate, 1);
            }
            else if (numberOfFailedAttempts === 1) {
                nextRescheduleDate = this.addDays(currentDate, 7);
            }
            response.data = {
                maxAttempts: totalRescheduleAttempts - 1,
                failedAttempts: numberOfFailedAttempts,
                nextRescheduleDate: nextRescheduleDate,
            };
            response.success = true;
            response.message = 'Query ok!';
        }
        catch (error) {
            console.log(error);
            response.message = error.message;
        }
        return response;
    }
    async rescheduleCbt(data) {
        const response = { success: false, message: '' };
        let payment;
        try {
            if (data.reference && data.reference.length > 0) {
                payment = await this.paymentService.findPaymentBy({
                    reference: data.reference,
                    type: enums_1.TransactionType.cbtReschedulePayment,
                    status: enums_1.PaymentStatus.Completed,
                    used: enums_1.Reference.Unused,
                });
                if (!payment) {
                    throw new common_1.NotFoundException('Payment reference not found or has been used');
                }
                data.transactionId = payment.id;
            }
            const currentDate = new Date();
            const now = new Date();
            now.setHours(0, 0, 0, 0);
            const bookingDate = new Date(data.date);
            bookingDate.setHours(0, 0, 0, 0);
            if (now > bookingDate) {
                throw new common_1.BadRequestException('You cannot book a date in the past!');
            }
            const failedAttempts = await this.cbtScheduleRepository.find({
                where: { studentId: data.studentId, cbtStatus: enums_1.CbtStatus.Failed },
                order: { date: 'DESC', time: 'DESC', createdAt: 'DESC' },
            });
            const numberOfFailedAttempts = failedAttempts.length;
            let nextRescheduleDate = null;
            const totalRescheduleAttempts = constants_1.appConstants.totalRescheduleAttempts;
            if (numberOfFailedAttempts >= totalRescheduleAttempts) {
                if (!data.reference) {
                    throw new Error('Student has reached the maximum number of failed free attempts. Payment is required.');
                }
            }
            else if (numberOfFailedAttempts === totalRescheduleAttempts - 1) {
                nextRescheduleDate = this.addMonths(currentDate, 3);
            }
            else if (numberOfFailedAttempts === totalRescheduleAttempts - 2) {
                nextRescheduleDate = this.addMonths(currentDate, 1);
            }
            else if (numberOfFailedAttempts === 1) {
                nextRescheduleDate = this.addDays(currentDate, 7);
            }
            if (numberOfFailedAttempts > 0) {
                const latestFailedAttempt = failedAttempts[0];
                if (nextRescheduleDate && new Date(latestFailedAttempt.date) < nextRescheduleDate) {
                    const formattedNextRescheduleDate = nextRescheduleDate.toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                    });
                    throw new Error(`Rescheduling is allowed only after ${formattedNextRescheduleDate}.`);
                }
            }
            data.cbtStatus = enums_1.CbtStatus.ReScheduled;
            await this.scheduleTest(data.studentId, data.cbtCenterId, data);
            if (payment) {
                payment.used = enums_1.Reference.Used;
                payment.status = enums_1.PaymentStatus.Used;
                await this.paymentService.update(payment.id, payment);
            }
            response.success = true;
            response.message = 'CBT rescheduled successfully!';
        }
        catch (error) {
            console.log(error);
            response.message = error.message;
        }
        return response;
    }
    addDays(date, days) {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }
    addMonths(date, months) {
        const result = new Date(date);
        result.setMonth(result.getMonth() + months);
        return result;
    }
};
exports.CbtService = CbtService;
exports.CbtService = CbtService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cbt_center_entity_1.CbtCenter)),
    __param(1, (0, typeorm_1.InjectRepository)(cbt_schedule_entity_1.CbtSchedule)),
    __param(2, (0, typeorm_1.InjectRepository)(question_entity_1.Question)),
    __param(3, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __param(4, (0, typeorm_1.InjectRepository)(audit_trail_entity_1.AuditTrail)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        payment_service_1.PaymentService,
        typeorm_2.DataSource])
], CbtService);
//# sourceMappingURL=cbt.service.js.map