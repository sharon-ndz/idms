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
exports.CbtSchedule = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const base_entity_1 = require("./base.entity");
const enums_1 = require("../core/constants/enums");
const payment_entity_1 = require("./payment.entity");
const student_entity_1 = require("./student.entity");
const cbt_center_entity_1 = require("./cbt-center.entity");
let CbtSchedule = class CbtSchedule extends base_entity_1.BaseEntity {
};
exports.CbtSchedule = CbtSchedule;
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'student_id', nullable: true }),
    __metadata("design:type", Number)
], CbtSchedule.prototype, "studentId", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: 'int', name: 'cbt_center_id', nullable: true }),
    __metadata("design:type", Number)
], CbtSchedule.prototype, "cbtCenterId", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: 'bigint', name: 'lga_id', nullable: true }),
    __metadata("design:type", Number)
], CbtSchedule.prototype, "lgaId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint', name: 'transaction_id', nullable: true }),
    __metadata("design:type", Number)
], CbtSchedule.prototype, "transactionId", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: 'int', name: 'state_id', nullable: true }),
    __metadata("design:type", Number)
], CbtSchedule.prototype, "stateId", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ length: 40 }),
    __metadata("design:type", String)
], CbtSchedule.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ length: 20 }),
    __metadata("design:type", String)
], CbtSchedule.prototype, "time", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', default: 0 }),
    __metadata("design:type", Number)
], CbtSchedule.prototype, "score", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], CbtSchedule.prototype, "answers", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: enums_1.BookingStatus.Pending }),
    __metadata("design:type", Number)
], CbtSchedule.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cbt_status', length: 40, default: enums_1.CbtStatus.Scheduled }),
    __metadata("design:type", String)
], CbtSchedule.prototype, "cbtStatus", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'created_by' }),
    __metadata("design:type", user_entity_1.User)
], CbtSchedule.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'assessed_by' }),
    __metadata("design:type", user_entity_1.User)
], CbtSchedule.prototype, "assessedBy", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: 'transaction_id' }),
    (0, typeorm_1.ManyToOne)(() => payment_entity_1.Payment, {
        eager: false,
        nullable: true,
    }),
    __metadata("design:type", payment_entity_1.Payment)
], CbtSchedule.prototype, "transaction", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: 'student_id' }),
    (0, typeorm_1.ManyToOne)(() => student_entity_1.Student, {
        eager: false,
        nullable: true,
    }),
    __metadata("design:type", student_entity_1.Student)
], CbtSchedule.prototype, "student", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: 'cbt_center_id' }),
    (0, typeorm_1.ManyToOne)(() => cbt_center_entity_1.CbtCenter, {
        eager: false,
        nullable: true,
    }),
    __metadata("design:type", cbt_center_entity_1.CbtCenter)
], CbtSchedule.prototype, "cbtCenter", void 0);
exports.CbtSchedule = CbtSchedule = __decorate([
    (0, typeorm_1.Entity)({ name: 'cbt_schedules' })
], CbtSchedule);
//# sourceMappingURL=cbt-schedule.entity.js.map