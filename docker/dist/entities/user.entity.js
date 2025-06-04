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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const audit_trail_entity_1 = require("./audit-trail.entity");
const node_entity_1 = require("./node.entity");
const driving_school_entity_1 = require("./driving-school.entity");
const bcrypt_1 = require("bcrypt");
const class_transformer_1 = require("class-transformer");
let User = class User {
    async hashPassword() {
        const rounds = (0, bcrypt_1.genSaltSync)(parseInt(process.env.SALT_ROUND));
        this.password = (0, bcrypt_1.hashSync)(this.password, rounds);
    }
    static async comparePasswords(attemptedPassword, hashedPassword) {
        return await (0, bcrypt_1.compare)(attemptedPassword, hashedPassword);
    }
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 80, name: 'first_name', nullable: false }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 80, name: 'middle_name', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "middleName", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 80, name: 'last_name', nullable: false }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20, unique: false }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, unique: true, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "avatar", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ name: 'state_id', type: 'bigint', nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "stateId", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ name: 'lga_id', type: 'bigint', nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "lgaId", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ name: 'driving_school_id', type: 'bigint', nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "drivingSchoolId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'role_id', nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "roleId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'role_name', length: 60, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "roleName", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ name: 'change_password_next_login', default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "changePasswordNextLogin", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.Column)({ type: 'text', nullable: false }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 500, unique: true, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "device", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp',
        name: 'last_password_change',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], User.prototype, "lastPasswordChange", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ name: 'is_active', default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], User.prototype, "files", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.Column)({ type: 'text', name: 'access_token', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "accessToken", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "permissions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => audit_trail_entity_1.AuditTrail, (auditTrail) => auditTrail.user, {
        eager: false,
    }),
    __metadata("design:type", Promise)
], User.prototype, "auditTrails", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: 'driving_school_id' }),
    (0, typeorm_1.ManyToOne)(() => driving_school_entity_1.DrivingSchool, {
        eager: false,
        nullable: true,
    }),
    __metadata("design:type", driving_school_entity_1.DrivingSchool)
], User.prototype, "drivingSchool", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => node_entity_1.Node),
    (0, typeorm_1.JoinColumn)({ name: 'node_id' }),
    __metadata("design:type", node_entity_1.Node)
], User.prototype, "node", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], User.prototype, "hashPassword", null);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)({ name: 'users' })
], User);
//# sourceMappingURL=user.entity.js.map