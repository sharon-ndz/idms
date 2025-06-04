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
exports.Device = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("./base.entity");
const enums_1 = require("../core/constants/enums");
let Device = class Device extends base_entity_1.BaseEntity {
};
exports.Device = Device;
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ length: 80, name: 'organization_code', nullable: false }),
    __metadata("design:type", String)
], Device.prototype, "organizationCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 150, name: 'organization_name', nullable: false }),
    __metadata("design:type", String)
], Device.prototype, "organizationName", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 150, name: 'license', nullable: false }),
    __metadata("design:type", String)
], Device.prototype, "license", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'device_id', nullable: true }),
    __metadata("design:type", String)
], Device.prototype, "deviceId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, name: 'device_imei', nullable: false, unique: true }),
    __metadata("design:type", String)
], Device.prototype, "deviceImei", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: Object.values(enums_1.DeviceTypes),
        default: enums_1.DeviceTypes.ANDROID,
    }),
    __metadata("design:type", String)
], Device.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: Object.values(enums_1.DeviceStatus),
        default: enums_1.DeviceStatus.PENDING,
    }),
    __metadata("design:type", String)
], Device.prototype, "status", void 0);
exports.Device = Device = __decorate([
    (0, typeorm_1.Entity)({ name: 'devices' })
], Device);
//# sourceMappingURL=device.entity.js.map