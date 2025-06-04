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
exports.ApiClient = void 0;
const typeorm_1 = require("typeorm");
const api_client_permission_1 = require("../middlewares/api-client-permission");
const base_entity_1 = require("./base.entity");
const user_entity_1 = require("./user.entity");
let ApiClient = class ApiClient extends base_entity_1.BaseEntity {
};
exports.ApiClient = ApiClient;
__decorate([
    (0, typeorm_1.Column)({ length: 150, name: 'client_name' }),
    __metadata("design:type", String)
], ApiClient.prototype, "clientName", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ length: 200, name: 'client_identity', unique: true }),
    __metadata("design:type", String)
], ApiClient.prototype, "clientIdentity", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ length: 50, name: 'client_email', unique: true }),
    __metadata("design:type", String)
], ApiClient.prototype, "clientEmail", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ length: 20, name: 'client_phone', unique: true }),
    __metadata("design:type", String)
], ApiClient.prototype, "clientPhone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], ApiClient.prototype, "token", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ name: 'is_active', default: 0 }),
    __metadata("design:type", Number)
], ApiClient.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: api_client_permission_1.ApiPermission,
        default: api_client_permission_1.ApiPermission.canReadLicense,
    }),
    __metadata("design:type", Array)
], ApiClient.prototype, "permissions", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: false }),
    __metadata("design:type", String)
], ApiClient.prototype, "hash", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'created_by' }),
    __metadata("design:type", user_entity_1.User)
], ApiClient.prototype, "createdBy", void 0);
exports.ApiClient = ApiClient = __decorate([
    (0, typeorm_1.Entity)({ name: 'api_clients' })
], ApiClient);
//# sourceMappingURL=api-client.entity.js.map