"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DrivingSchoolModule = void 0;
const common_1 = require("@nestjs/common");
const driving_school_service_1 = require("./driving-school.service");
const driving_school_controller_1 = require("./driving-school.controller");
const typeorm_1 = require("@nestjs/typeorm");
const driving_school_entity_1 = require("../../entities/driving-school.entity");
const training_duration_entity_1 = require("../../entities/training-duration.entity");
const driving_school_application_entity_1 = require("../../entities/driving-school-application.entity");
const student_entity_1 = require("../../entities/student.entity");
const payment_entity_1 = require("../../entities/payment.entity");
const applicant_file_entity_1 = require("../../entities/applicant-file.entity");
const auth_module_1 = require("../auth/auth.module");
const permit_entity_1 = require("../../entities/permit.entity");
const users_module_1 = require("../users/users.module");
const email_notification_entity_1 = require("../../entities/email-notification.entity");
const user_entity_1 = require("../../entities/user.entity");
const inspection_entity_1 = require("../../entities/inspection.entity");
const driving_school_instructor_entity_1 = require("../../entities/driving-school-instructor.entity");
const audit_trail_entity_1 = require("../../entities/audit-trail.entity");
let DrivingSchoolModule = class DrivingSchoolModule {
};
exports.DrivingSchoolModule = DrivingSchoolModule;
exports.DrivingSchoolModule = DrivingSchoolModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                driving_school_entity_1.DrivingSchool,
                training_duration_entity_1.TrainingDuration,
                driving_school_application_entity_1.DrivingSchoolApplication,
                student_entity_1.Student,
                payment_entity_1.Payment,
                applicant_file_entity_1.ApplicantFile,
                permit_entity_1.Permit,
                email_notification_entity_1.EmailNotification,
                user_entity_1.User,
                inspection_entity_1.Inspection,
                driving_school_instructor_entity_1.DrivingSchoolInstructor,
                audit_trail_entity_1.AuditTrail
            ]),
            auth_module_1.AuthModule,
            (0, common_1.forwardRef)(() => users_module_1.UsersModule),
        ],
        controllers: [driving_school_controller_1.DrivingSchoolController],
        providers: [driving_school_service_1.DrivingSchoolService],
        exports: [driving_school_service_1.DrivingSchoolService],
    })
], DrivingSchoolModule);
//# sourceMappingURL=driving-school.module.js.map