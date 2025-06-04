"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DrivingTestModule = void 0;
const common_1 = require("@nestjs/common");
const driving_test_service_1 = require("./driving-test.service");
const driving_test_controller_1 = require("./driving-test.controller");
const typeorm_1 = require("@nestjs/typeorm");
const student_entity_1 = require("../../entities/student.entity");
const payment_module_1 = require("../payment/payment.module");
const driving_test_center_entity_1 = require("../../entities/driving-test-center.entity");
const driving_test_schedule_entity_1 = require("../../entities/driving-test-schedule.entity");
const pre_registration_entity_1 = require("../../entities/pre-registration.entity");
let DrivingTestModule = class DrivingTestModule {
};
exports.DrivingTestModule = DrivingTestModule;
exports.DrivingTestModule = DrivingTestModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([driving_test_center_entity_1.DrivingTestCenter, pre_registration_entity_1.PreRegistration, driving_test_schedule_entity_1.DrivingTestSchedule, student_entity_1.Student]),
            payment_module_1.PaymentModule,
        ],
        controllers: [driving_test_controller_1.DrivingTestController],
        providers: [driving_test_service_1.DrivingTestService],
        exports: [driving_test_service_1.DrivingTestService],
    })
], DrivingTestModule);
//# sourceMappingURL=driving-test.module.js.map