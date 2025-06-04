"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermitModule = void 0;
const common_1 = require("@nestjs/common");
const permit_service_1 = require("./permit.service");
const permit_controller_1 = require("./permit.controller");
const typeorm_1 = require("@nestjs/typeorm");
const student_entity_1 = require("../../entities/student.entity");
const email_notification_entity_1 = require("../../entities/email-notification.entity");
const payment_module_1 = require("../payment/payment.module");
const permit_entity_1 = require("../../entities/permit.entity");
const audit_trail_entity_1 = require("../../entities/audit-trail.entity");
let PermitModule = class PermitModule {
};
exports.PermitModule = PermitModule;
exports.PermitModule = PermitModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([permit_entity_1.Permit, student_entity_1.Student, email_notification_entity_1.EmailNotification, audit_trail_entity_1.AuditTrail]),
            payment_module_1.PaymentModule,
        ],
        controllers: [permit_controller_1.PermitController],
        providers: [permit_service_1.PermitService],
        exports: [permit_service_1.PermitService],
    })
], PermitModule);
//# sourceMappingURL=permit.module.js.map