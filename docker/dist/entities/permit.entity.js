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
exports.Permit = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const base_entity_1 = require("./base.entity");
const payment_entity_1 = require("./payment.entity");
const student_entity_1 = require("./student.entity");
const enums_1 = require("../core/constants/enums");
let Permit = class Permit extends base_entity_1.BaseEntity {
};
exports.Permit = Permit;
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: 'bigint', name: 'student_id', nullable: false }),
    __metadata("design:type", Number)
], Permit.prototype, "studentId", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: 'bigint', name: 'transaction_id', nullable: true }),
    __metadata("design:type", Number)
], Permit.prototype, "transactionId", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ length: 80, nullable: false, unique: true }),
    __metadata("design:type", String)
], Permit.prototype, "reference", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'title_id', nullable: false }),
    __metadata("design:type", Number)
], Permit.prototype, "titleId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, name: 'first_name', nullable: false }),
    __metadata("design:type", String)
], Permit.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, name: 'middle_name', nullable: true }),
    __metadata("design:type", String)
], Permit.prototype, "middleName", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, name: 'last_name', nullable: false }),
    __metadata("design:type", String)
], Permit.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, name: 'maiden_name', nullable: false }),
    __metadata("design:type", String)
], Permit.prototype, "maidenName", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ length: 60, nullable: false }),
    __metadata("design:type", String)
], Permit.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ length: 20, nullable: true }),
    __metadata("design:type", String)
], Permit.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ length: 100, name: 'permit_no', nullable: true, unique: true }),
    __metadata("design:type", String)
], Permit.prototype, "permitNo", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ length: 100, name: 'old_permit_no', nullable: true }),
    __metadata("design:type", String)
], Permit.prototype, "oldPermitNo", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ length: 80, name: 'request_type', nullable: true }),
    __metadata("design:type", String)
], Permit.prototype, "requestType", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ nullable: true, name: 'permit_class_id' }),
    __metadata("design:type", Number)
], Permit.prototype, "permitClassId", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Permit.prototype, "years", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20, name: 'date_of_birth', nullable: false }),
    __metadata("design:type", String)
], Permit.prototype, "dateOfBirth", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: 'int', name: 'gender_id', nullable: false }),
    __metadata("design:type", Number)
], Permit.prototype, "genderId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nationality_id', nullable: false }),
    __metadata("design:type", Number)
], Permit.prototype, "nationalityId", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ name: 'state_id', nullable: false }),
    __metadata("design:type", Number)
], Permit.prototype, "stateId", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ name: 'lga_id', nullable: false }),
    __metadata("design:type", Number)
], Permit.prototype, "lgaId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: false }),
    __metadata("design:type", String)
], Permit.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ name: 'station_id', nullable: true }),
    __metadata("design:type", Number)
], Permit.prototype, "stationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200, name: 'serial_number', nullable: true }),
    __metadata("design:type", String)
], Permit.prototype, "serialNumber", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: 'int', name: 'print_status', default: enums_1.Print.pending }),
    __metadata("design:type", Number)
], Permit.prototype, "printStatus", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: 'bigint', name: 'issued_by_id', nullable: true }),
    __metadata("design:type", Number)
], Permit.prototype, "issuedById", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp',
        name: 'issued_at',
        nullable: true,
    }),
    __metadata("design:type", Date)
], Permit.prototype, "issuedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp',
        name: 'expiry_at',
        nullable: true,
    }),
    __metadata("design:type", Date)
], Permit.prototype, "expiryAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 60, name: 'replacement_reason', nullable: true }),
    __metadata("design:type", String)
], Permit.prototype, "replacementReason", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ name: 'is_active', default: 0 }),
    __metadata("design:type", Number)
], Permit.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: 'student_id' }),
    (0, typeorm_1.OneToOne)(() => student_entity_1.Student, (student) => student.permit),
    __metadata("design:type", Object)
], Permit.prototype, "student", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: 'transaction_id' }),
    (0, typeorm_1.ManyToOne)(() => payment_entity_1.Payment, {
        eager: false,
        nullable: true,
    }),
    __metadata("design:type", payment_entity_1.Payment)
], Permit.prototype, "transaction", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'created_by' }),
    __metadata("design:type", user_entity_1.User)
], Permit.prototype, "createdBy", void 0);
exports.Permit = Permit = __decorate([
    (0, typeorm_1.Entity)({ name: 'permits' })
], Permit);
//# sourceMappingURL=permit.entity.js.map