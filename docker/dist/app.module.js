"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const roles_1 = require("./middlewares/roles");
const api_client_permission_1 = require("./middlewares/api-client-permission");
const api_clients_module_1 = require("./api/api-clients/api-clients.module");
const users_module_1 = require("./api/users/users.module");
const auth_module_1 = require("./api/auth/auth.module");
const audit_trail_module_1 = require("./api/audit-trail/audit-trail.module");
const payment_module_1 = require("./api/payment/payment.module");
const common_module_1 = require("./api/common/common.module");
const driving_school_module_1 = require("./api/driving-school/driving-school.module");
const cbt_module_1 = require("./api/cbt/cbt.module");
const license_module_1 = require("./api/license/license.module");
const file_module_1 = require("./api/file/file.module");
const permit_module_1 = require("./api/permit/permit.module");
const inspection_module_1 = require("./api/inspection/inspection.module");
const config_2 = __importDefault(require("./config"));
const device_module_1 = require("./api/device/device.module");
const driving_test_module_1 = require("./api/driving-test/driving-test.module");
const instructor_module_1 = require("./api/instructor/instructor.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true, load: [config_2.default], envFilePath: ['.env'] }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (configService) => {
                    return configService.get(process.env.NODE_ENV);
                },
            }),
            file_module_1.FileModule,
            users_module_1.UsersModule,
            audit_trail_module_1.AuditTrailModule,
            auth_module_1.AuthModule,
            api_clients_module_1.ApiClientsModule,
            payment_module_1.PaymentModule,
            common_module_1.CommonModule,
            driving_school_module_1.DrivingSchoolModule,
            cbt_module_1.CbtModule,
            license_module_1.LicenseModule,
            permit_module_1.PermitModule,
            inspection_module_1.InspectionModule,
            device_module_1.DeviceModule,
            driving_test_module_1.DrivingTestModule,
            instructor_module_1.InstructorModule,
        ],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: roles_1.PermissionsGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: api_client_permission_1.ApiClientPermissionsGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map