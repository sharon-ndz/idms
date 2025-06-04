"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LicenseModule = void 0;
const common_1 = require("@nestjs/common");
const license_service_1 = require("./license.service");
const license_controller_1 = require("./license.controller");
const typeorm_1 = require("@nestjs/typeorm");
const student_entity_1 = require("../../entities/student.entity");
const cbt_module_1 = require("../cbt/cbt.module");
const pre_registration_entity_1 = require("../../entities/pre-registration.entity");
const email_notification_entity_1 = require("../../entities/email-notification.entity");
const license_file_entity_1 = require("../../entities/license-file.entity");
const license_entity_1 = require("../../entities/license.entity");
const driving_school_module_1 = require("../driving-school/driving-school.module");
const payment_module_1 = require("../payment/payment.module");
const users_module_1 = require("../users/users.module");
const applicant_file_entity_1 = require("../../entities/applicant-file.entity");
const driving_test_module_1 = require("../driving-test/driving-test.module");
let LicenseModule = class LicenseModule {
};
exports.LicenseModule = LicenseModule;
exports.LicenseModule = LicenseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                student_entity_1.Student,
                pre_registration_entity_1.PreRegistration,
                license_file_entity_1.LicenseFile,
                applicant_file_entity_1.ApplicantFile,
                license_entity_1.License,
                email_notification_entity_1.EmailNotification,
            ]),
            cbt_module_1.CbtModule,
            driving_test_module_1.DrivingTestModule,
            driving_school_module_1.DrivingSchoolModule,
            payment_module_1.PaymentModule,
            users_module_1.UsersModule,
        ],
        controllers: [license_controller_1.LicenseController],
        providers: [license_service_1.LicenseService],
        exports: [license_service_1.LicenseService],
    })
], LicenseModule);
//# sourceMappingURL=license.module.js.map