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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DrivingTestSchedule = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("./base.entity");
const enums_1 = require("../core/constants/enums");
const payment_entity_1 = require("./payment.entity");
const user_entity_1 = require("./user.entity");
const pre_registration_entity_1 = require("./pre-registration.entity");
const driving_test_center_entity_1 = require("./driving-test-center.entity");
let DrivingTestSchedule = class DrivingTestSchedule extends base_entity_1.BaseEntity {
};
exports.DrivingTestSchedule = DrivingTestSchedule;
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint', name: 'pre_registration_id', nullable: true }),
    __metadata("design:type", Number)
], DrivingTestSchedule.prototype, "preRegistrationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint', name: 'driving_test_center_id', nullable: true }),
    __metadata("design:type", Number)
], DrivingTestSchedule.prototype, "drivingTestCenterId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'license_class_id', nullable: true }),
    __metadata("design:type", Number)
], DrivingTestSchedule.prototype, "licenseClassId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint', name: 'student_id', nullable: true }),
    __metadata("design:type", Number)
], DrivingTestSchedule.prototype, "studentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'lga_id', nullable: true }),
    __metadata("design:type", Number)
], DrivingTestSchedule.prototype, "lgaId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint', name: 'transaction_id', nullable: true }),
    __metadata("design:type", Number)
], DrivingTestSchedule.prototype, "transactionId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'state_id', nullable: true }),
    __metadata("design:type", Number)
], DrivingTestSchedule.prototype, "stateId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 40 }),
    __metadata("design:type", String)
], DrivingTestSchedule.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20 }),
    __metadata("design:type", String)
], DrivingTestSchedule.prototype, "time", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', default: 0 }),
    __metadata("design:type", Number)
], DrivingTestSchedule.prototype, "score", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true, default: () => "'[]'" }),
    __metadata("design:type", Array)
], DrivingTestSchedule.prototype, "answers", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], DrivingTestSchedule.prototype, "files", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', name: 'vehicle_type', length: 90, nullable: true }),
    __metadata("design:type", String)
], DrivingTestSchedule.prototype, "vehicleType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], DrivingTestSchedule.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'booking_status', default: enums_1.BookingStatus.Pending }),
    __metadata("design:type", Number)
], DrivingTestSchedule.prototype, "bookingStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'status', length: 40, default: enums_1.CbtStatus.Scheduled }),
    __metadata("design:type", String)
], DrivingTestSchedule.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: 'driving_test_center_id' }),
    (0, typeorm_1.ManyToOne)(() => driving_test_center_entity_1.DrivingTestCenter, {
        eager: false,
        nullable: true,
    }),
    __metadata("design:type", driving_test_center_entity_1.DrivingTestCenter)
], DrivingTestSchedule.prototype, "drivingTestCenter", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: 'pre_registration_id' }),
    (0, typeorm_1.ManyToOne)(() => pre_registration_entity_1.PreRegistration, {
        eager: false,
        nullable: true,
    }),
    __metadata("design:type", pre_registration_entity_1.PreRegistration)
], DrivingTestSchedule.prototype, "preRegistration", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: 'transaction_id' }),
    (0, typeorm_1.ManyToOne)(() => payment_entity_1.Payment, {
        eager: false,
        nullable: true,
    }),
    __metadata("design:type", payment_entity_1.Payment)
], DrivingTestSchedule.prototype, "transaction", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'assessed_by' }),
    __metadata("design:type", user_entity_1.User)
], DrivingTestSchedule.prototype, "assessedBy", void 0);
exports.DrivingTestSchedule = DrivingTestSchedule = __decorate([
    (0, typeorm_1.Entity)({ name: 'driving_test_schedules' })
], DrivingTestSchedule);
//# sourceMappingURL=driving-test-schedule.entity.js.map