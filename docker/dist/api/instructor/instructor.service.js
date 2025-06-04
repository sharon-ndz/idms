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
exports.InstructorService = void 0;
const common_1 = require("@nestjs/common");
const driving_school_instructor_entity_1 = require("../../entities/driving-school-instructor.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const messages_1 = require("../../core/constants/messages");
let InstructorService = class InstructorService {
    constructor(instructorRepository, dataSource) {
        this.instructorRepository = instructorRepository;
        this.dataSource = dataSource;
    }
    async create(data) {
        const response = { success: false, message: '', data: null };
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            data.instructorId = `INS-${Date.now()}`;
            const instructor = await queryRunner.manager.save(driving_school_instructor_entity_1.DrivingSchoolInstructor, data);
            await queryRunner.commitTransaction();
            response.success = true;
            response.message = messages_1.MESSAGES.recordAdded;
            response.data = instructor;
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
    async validateInstructor(instructorId) {
        const instructor = await this.instructorRepository.findOne({
            where: { instructorId },
        });
        if (!instructor) {
            return {
                success: false,
                message: messages_1.MESSAGES.recordNotFound,
                data: null,
            };
        }
        return {
            success: true,
            message: messages_1.MESSAGES.recordFound,
            data: instructor,
        };
    }
};
exports.InstructorService = InstructorService;
exports.InstructorService = InstructorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(driving_school_instructor_entity_1.DrivingSchoolInstructor)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.DataSource])
], InstructorService);
//# sourceMappingURL=instructor.service.js.map