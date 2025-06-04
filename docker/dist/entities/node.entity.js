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
exports.Node = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("./base.entity");
const user_entity_1 = require("./user.entity");
const enums_1 = require("../core/constants/enums");
let Node = class Node extends base_entity_1.BaseEntity {
};
exports.Node = Node;
__decorate([
    (0, typeorm_1.Column)({ name: 'device_imei', nullable: false }),
    __metadata("design:type", String)
], Node.prototype, "deviceImei", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'license', nullable: true }),
    __metadata("design:type", String)
], Node.prototype, "license", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'device_id', nullable: true }),
    __metadata("design:type", String)
], Node.prototype, "deviceId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 80, name: 'organization_code', nullable: false }),
    __metadata("design:type", String)
], Node.prototype, "organizationCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 150, name: 'organization_name', nullable: false }),
    __metadata("design:type", String)
], Node.prototype, "organizationName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: Object.values(enums_1.DeviceStatus),
        default: enums_1.DeviceStatus.PENDING,
    }),
    __metadata("design:type", String)
], Node.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'rejection_reason', nullable: true }),
    __metadata("design:type", String)
], Node.prototype, "rejectionReason", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'requester_email', nullable: false }),
    __metadata("design:type", String)
], Node.prototype, "requesterEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'requester_first_name', nullable: false }),
    __metadata("design:type", String)
], Node.prototype, "requesterFirstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'requester_last_name', nullable: false }),
    __metadata("design:type", String)
], Node.prototype, "requesterLastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'requester_phone', nullable: false }),
    __metadata("design:type", String)
], Node.prototype, "requesterPhone", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: Object.values(enums_1.DeviceTypes),
        default: enums_1.DeviceTypes.ANDROID,
    }),
    __metadata("design:type", String)
], Node.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'activated_by' }),
    __metadata("design:type", user_entity_1.User)
], Node.prototype, "activatedBy", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_entity_1.User, (user) => user.node),
    __metadata("design:type", Array)
], Node.prototype, "agents", void 0);
exports.Node = Node = __decorate([
    (0, typeorm_1.Entity)({ name: 'nodes' })
], Node);
//# sourceMappingURL=node.entity.js.map