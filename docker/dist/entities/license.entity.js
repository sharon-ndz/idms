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
exports.License = void 0;
const typeorm_1 = require("typeorm");
const license_file_entity_1 = require("./license-file.entity");
const enums_1 = require("../core/constants/enums");
const pre_registration_entity_1 = require("./pre-registration.entity");
const user_entity_1 = require("./user.entity");
const base_entity_1 = require("./base.entity");
const payment_entity_1 = require("./payment.entity");
let License = class License extends base_entity_1.BaseEntity {
};
exports.License = License;
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: 'bigint', name: 'pre_registration_id', nullable: true }),
    __metadata("design:type", Number)
], License.prototype, "preRegistrationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint', name: 'transaction_id', nullable: true }),
    __metadata("design:type", Number)
], License.prototype, "transactionId", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ length: 80, nullable: false, unique: true }),
    __metadata("design:type", String)
], License.prototype, "reference", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'title_id', nullable: false }),
    __metadata("design:type", Number)
], License.prototype, "titleId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, name: 'first_name', nullable: false }),
    __metadata("design:type", String)
], License.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, name: 'middle_name', nullable: true }),
    __metadata("design:type", String)
], License.prototype, "middleName", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, name: 'last_name', nullable: false }),
    __metadata("design:type", String)
], License.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, name: 'maiden_name', nullable: false }),
    __metadata("design:type", String)
], License.prototype, "maidenName", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ length: 60, nullable: false }),
    __metadata("design:type", String)
], License.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ length: 20, nullable: true }),
    __metadata("design:type", String)
], License.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ length: 100, name: 'license_no', nullable: true, unique: true }),
    __metadata("design:type", String)
], License.prototype, "licenseNo", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ length: 100, name: 'old_license_no', nullable: true }),
    __metadata("design:type", String)
], License.prototype, "oldLicenseNo", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ length: 80, name: 'request_type' }),
    __metadata("design:type", String)
], License.prototype, "requestType", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ nullable: true, name: 'license_class_id' }),
    __metadata("design:type", Number)
], License.prototype, "licenseClassId", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], License.prototype, "years", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20, name: 'date_of_birth', nullable: false }),
    __metadata("design:type", String)
], License.prototype, "dateOfBirth", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: 'int', name: 'gender_id', nullable: false }),
    __metadata("design:type", Number)
], License.prototype, "genderId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nationality_id', nullable: false }),
    __metadata("design:type", Number)
], License.prototype, "nationalityId", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ name: 'state_id', nullable: false }),
    __metadata("design:type", Number)
], License.prototype, "stateId", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ name: 'lga_id', nullable: false }),
    __metadata("design:type", Number)
], License.prototype, "lgaId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: false }),
    __metadata("design:type", String)
], License.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ name: 'station_id', nullable: true }),
    __metadata("design:type", Number)
], License.prototype, "stationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float4', default: 0.0 }),
    __metadata("design:type", Number)
], License.prototype, "height", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float4', default: 0.0 }),
    __metadata("design:type", Number)
], License.prototype, "weight", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20, nullable: true }),
    __metadata("design:type", String)
], License.prototype, "eyes", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200, name: 'serial_number', nullable: true }),
    __metadata("design:type", String)
], License.prototype, "serialNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, name: 'affidavit_no', nullable: true }),
    __metadata("design:type", String)
], License.prototype, "affidavitNo", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: 'varchar', length: 40, default: enums_1.LicenseStatus.Pending }),
    __metadata("design:type", String)
], License.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: 'int', name: 'print_status', default: enums_1.Print.pending }),
    __metadata("design:type", Number)
], License.prototype, "printStatus", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: 'bigint', name: 'issued_by_id', nullable: true }),
    __metadata("design:type", Number)
], License.prototype, "issuedById", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: 'int', name: 'approval_level', default: enums_1.ApprovalLevel.LevelOne }),
    __metadata("design:type", Number)
], License.prototype, "approvalLevel", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp',
        name: 'issued_at',
        nullable: true,
    }),
    __metadata("design:type", Date)
], License.prototype, "issuedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp',
        name: 'expiry_at',
        nullable: true,
    }),
    __metadata("design:type", Date)
], License.prototype, "expiryAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: false }),
    __metadata("design:type", String)
], License.prototype, "source", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 60, name: 'replacement_reason', nullable: true }),
    __metadata("design:type", String)
], License.prototype, "replacementReason", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ name: 'is_active', default: 0 }),
    __metadata("design:type", Number)
], License.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => license_file_entity_1.LicenseFile, licenseFile => licenseFile.license),
    __metadata("design:type", Array)
], License.prototype, "licenseFiles", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: 'pre_registration_id' }),
    (0, typeorm_1.ManyToOne)(() => pre_registration_entity_1.PreRegistration, {
        eager: false,
        nullable: true,
    }),
    __metadata("design:type", pre_registration_entity_1.PreRegistration)
], License.prototype, "preRegistration", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: 'transaction_id' }),
    (0, typeorm_1.ManyToOne)(() => payment_entity_1.Payment, {
        eager: false,
        nullable: true,
    }),
    __metadata("design:type", payment_entity_1.Payment)
], License.prototype, "transaction", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'created_by' }),
    __metadata("design:type", user_entity_1.User)
], License.prototype, "createdBy", void 0);
exports.License = License = __decorate([
    (0, typeorm_1.Entity)({ name: 'licenses' })
], License);
//# sourceMappingURL=license.entity.js.map