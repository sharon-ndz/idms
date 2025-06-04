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
exports.DrivingTestService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const driving_test_center_entity_1 = require("../../entities/driving-test-center.entity");
const driving_test_schedule_entity_1 = require("../../entities/driving-test-schedule.entity");
const student_entity_1 = require("../../entities/student.entity");
const enums_1 = require("../../core/constants/enums");
const class_transformer_1 = require("class-transformer");
const general_1 = require("../../core/helpers/general");
const pre_registration_entity_1 = require("../../entities/pre-registration.entity");
const all_dto_1 = require("../../core/interfaces/all.dto");
const functions_helpers_1 = require("../../core/helpers/functions.helpers");
const messages_1 = require("../../core/constants/messages");
const constants_1 = require("../../core/constants/constants");
const payment_service_1 = require("../payment/payment.service");
let DrivingTestService = class DrivingTestService {
    constructor(drivingTestCenterRepository, drivingTestScheduleRepository, studentRepository, paymentService, dataSource) {
        this.drivingTestCenterRepository = drivingTestCenterRepository;
        this.drivingTestScheduleRepository = drivingTestScheduleRepository;
        this.studentRepository = studentRepository;
        this.paymentService = paymentService;
        this.dataSource = dataSource;
    }
    async getDrivingTestCenters(data) {
        const response = { success: false, message: '', data: null };
        const limit = Number(data.resultPerPage || 10);
        const page = Number(data.page || 1);
        const offset = (page - 1) * limit;
        try {
            const whereClause = {
                select: [
                    'id',
                    'identifier',
                    'threshold',
                    'email',
                    'phone',
                    'devices',
                    'name',
                    'stateId',
                    'lgaId',
                    'isActive',
                ],
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
            const [result, count] = await this.drivingTestCenterRepository.findAndCount(whereClause);
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
            const exists = await this.drivingTestCenterRepository.findOne({
                where: data,
            });
            if (exists) {
                throw new common_1.BadRequestException(messages_1.MESSAGES.recordExists);
            }
            data.identifier = await (0, general_1.generateDrivingCenterNo)(data.name, this.drivingTestCenterRepository);
            data.isActive = enums_1.Status.Active;
            response.data = await this.drivingTestCenterRepository.save(data);
            response.success = true;
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
            const cbtCenter = await this.drivingTestCenterRepository.findOne({
                where: { id: data.id },
            });
            if (!cbtCenter) {
                throw new common_1.BadRequestException(messages_1.MESSAGES.recordNotFound);
            }
            await this.drivingTestCenterRepository.update({ id: data.id }, data);
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
            const center = await this.drivingTestCenterRepository.findOne({
                where: { id: data.drivingTestCenterId },
            });
            if (!center) {
                throw new Error('Driving test center not found');
            }
            const bookedSlots = await this.drivingTestScheduleRepository.find({
                where: { drivingTestCenterId: center.id },
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
            const center = await this.drivingTestCenterRepository.findOne({
                where: { id: data.drivingTestCenterId },
            });
            if (!center) {
                throw new Error('Driving test center not found');
            }
            const checkBooked = await this.drivingTestScheduleRepository.findOne({
                where: {
                    date: data.date,
                    time: data.time,
                    studentId: data.studentId,
                    drivingTestCenterId: center.id,
                },
            });
            if (checkBooked) {
                throw new common_1.BadRequestException('This date and time already booked by student');
            }
            const bookedByOthers = await this.drivingTestScheduleRepository.findOne({
                where: { date: data.date, time: data.time, drivingTestCenterId: center.id },
            });
            if (bookedByOthers) {
                throw new common_1.BadRequestException('This date and time already booked.');
            }
            const payload = (0, class_transformer_1.plainToInstance)(driving_test_schedule_entity_1.DrivingTestSchedule, data);
            payload.drivingTestCenterId = center.id;
            await this.drivingTestScheduleRepository.insert(payload);
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
    async scheduleTest(studentId, centerId, scheduleDto) {
        const queryRunner = await (0, all_dto_1.beginTransaction)(this.dataSource);
        try {
            const cbtCenter = await queryRunner.manager.findOne(driving_test_center_entity_1.DrivingTestCenter, {
                where: { id: centerId },
            });
            if (!cbtCenter) {
                throw new common_1.BadRequestException('Driving test center not found');
            }
            let preBooked;
            if (scheduleDto.canCreate) {
                delete scheduleDto.canCreate;
                const newRecord = await queryRunner.manager.insert(driving_test_schedule_entity_1.DrivingTestSchedule, scheduleDto);
                preBooked = await queryRunner.manager.findOne(driving_test_schedule_entity_1.DrivingTestSchedule, {
                    where: { id: newRecord.raw[0].id },
                });
            }
            else {
                preBooked = await queryRunner.manager.findOne(driving_test_schedule_entity_1.DrivingTestSchedule, {
                    where: {
                        studentId: studentId,
                        drivingTestCenterId: centerId,
                        date: scheduleDto.date,
                        time: scheduleDto.time,
                    },
                });
            }
            if (!preBooked) {
                throw new Error('No driving test pro-booked date and time slot for this schedule.');
            }
            preBooked.bookingStatus = enums_1.BookingStatus.Booked;
            preBooked.drivingTestCenterId = centerId;
            preBooked.studentId = studentId;
            if (!scheduleDto.bookingStatus) {
                preBooked.status = enums_1.CbtStatus.Scheduled;
            }
            if (scheduleDto.transactionId) {
                preBooked.transactionId = scheduleDto.transactionId;
            }
            await queryRunner.manager.save(preBooked);
            const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
            await queryRunner.manager.delete(driving_test_schedule_entity_1.DrivingTestSchedule, {
                score: 0,
                bookingStatus: enums_1.BookingStatus.Pending,
                createdAt: (0, typeorm_2.LessThan)(fiveMinutesAgo),
            });
            await queryRunner.commitTransaction();
            return preBooked.id;
        }
        catch (error) {
            console.log(error);
            await queryRunner.rollbackTransaction();
            throw new common_1.BadRequestException(error.message);
        }
        finally {
            await queryRunner.release();
        }
        return null;
    }
    async submitDrivingTest(data, user) {
        const response = { success: false, message: '', data: null };
        const queryRunner = await (0, all_dto_1.beginTransaction)(this.dataSource);
        let payment;
        try {
            const preRegistration = await queryRunner.manager.findOne(pre_registration_entity_1.PreRegistration, {
                where: { applicationNo: data.applicationNo },
            });
            if (!preRegistration) {
                throw new common_1.NotFoundException('No application found with given application Number');
            }
            const schedule = await queryRunner.manager.findOne(driving_test_schedule_entity_1.DrivingTestSchedule, {
                where: { preRegistrationId: preRegistration.id },
            });
            if (!schedule) {
                throw new common_1.BadRequestException('Driving test schedule not found!');
            }
            if (data.reference) {
                payment = await this.paymentService.findPaymentBy({
                    reference: data.reference,
                    status: enums_1.PaymentStatus.Completed,
                    used: enums_1.Reference.Unused,
                });
                if (!payment) {
                    throw new common_1.NotFoundException('Payment reference not found or has been used');
                }
                data.transactionId = payment.id;
                delete data.reference;
            }
            data.assessedBy = user.id;
            delete data.applicationNo;
            const payload = (0, class_transformer_1.plainToInstance)(driving_test_schedule_entity_1.DrivingTestSchedule, data);
            await queryRunner.manager.update(driving_test_schedule_entity_1.DrivingTestSchedule, { id: schedule.id }, payload);
            if (payment) {
                payment.used = enums_1.Reference.Used;
                payment.status = enums_1.PaymentStatus.Used;
                await this.paymentService.update(payment.id, payment);
            }
            await queryRunner.commitTransaction();
            response.success = true;
            response.message = messages_1.MESSAGES.recordUpdated;
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
    async testHistory(user) {
        const response = { success: false, message: '', data: null };
        try {
            const history = await this.drivingTestScheduleRepository.find({
                where: [{ assessedBy: { id: user.id } }, { assessedBy: (0, typeorm_2.IsNull)() }],
                relations: ['drivingTestCenter', 'preRegistration.student'],
            });
            response.success = true;
            response.data = history;
            response.message = messages_1.MESSAGES.recordFound;
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
            const failedAttempts = await this.drivingTestScheduleRepository.find({
                where: { studentId: student.id, status: enums_1.CbtStatus.Failed },
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
    async updateSchedule(scheduleId, data) {
        await this.drivingTestScheduleRepository.update({ id: scheduleId }, data);
    }
    async updateScheduleWithQueryRunner(scheduleId, data, queryRunner) {
        await queryRunner.manager.update(driving_test_schedule_entity_1.DrivingTestSchedule, { id: scheduleId }, data);
    }
    async findDrivingTestCenter(stateId, lgaId) {
        return await this.drivingTestCenterRepository.findOne({ where: { stateId, lgaId } });
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
exports.DrivingTestService = DrivingTestService;
exports.DrivingTestService = DrivingTestService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(driving_test_center_entity_1.DrivingTestCenter)),
    __param(1, (0, typeorm_1.InjectRepository)(driving_test_schedule_entity_1.DrivingTestSchedule)),
    __param(2, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        payment_service_1.PaymentService,
        typeorm_2.DataSource])
], DrivingTestService);
//# sourceMappingURL=driving-test.service.js.map