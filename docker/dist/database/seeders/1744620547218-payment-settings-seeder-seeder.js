"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentSettingsSeederSeeder1744620547218 = void 0;
const payment_setting_entity_1 = require("../../entities/payment-setting.entity");
const enums_1 = require("../../core/constants/enums");
class PaymentSettingsSeederSeeder1744620547218 {
    constructor() {
        this.track = false;
    }
    async run(dataSource, factoryManager) {
        const paymentSettingRepository = dataSource.getRepository(payment_setting_entity_1.PaymentSetting);
        const settings = [
            {
                stateId: 25,
                lgaId: 518,
                name: 'Pre Registration Payment',
                type: enums_1.TransactionType.preRegistration,
                amount: 12000,
                charges: 100,
                prefix: 'PR',
                currency: enums_1.Currency.NGN,
                status: enums_1.Status.Active,
            },
            {
                stateId: 25,
                lgaId: 518,
                name: 'New license Payment',
                type: enums_1.TransactionType.newLicense,
                amount: 10000,
                charges: 100,
                prefix: 'NL',
                currency: enums_1.Currency.NGN,
                status: enums_1.Status.Active,
            },
            {
                stateId: 25,
                lgaId: 518,
                name: 'Permit Issuance Payment',
                type: enums_1.TransactionType.permitIssuance,
                amount: 8000,
                charges: 100,
                prefix: 'PI',
                currency: enums_1.Currency.NGN,
                status: enums_1.Status.Active,
            },
            {
                stateId: 25,
                lgaId: 518,
                name: 'License Replacement Payment',
                type: enums_1.TransactionType.licenseReplacement,
                amount: 2000,
                charges: 100,
                prefix: 'LRI',
                currency: enums_1.Currency.NGN,
                status: enums_1.Status.Active,
            },
            {
                stateId: 25,
                lgaId: 518,
                name: 'License Replacement Payment',
                type: enums_1.TransactionType.biometricsPayment,
                amount: 2000,
                charges: 100,
                prefix: 'BIO',
                currency: enums_1.Currency.NGN,
                status: enums_1.Status.Active,
            },
            {
                stateId: 25,
                lgaId: 518,
                name: 'License Renewal Payment',
                type: enums_1.TransactionType.licenseRenewal,
                amount: 11200,
                charges: 100,
                prefix: 'LR',
                currency: enums_1.Currency.NGN,
                status: enums_1.Status.Active,
            },
            {
                stateId: 25,
                lgaId: 518,
                name: 'CBT Reschedule Payment',
                type: enums_1.TransactionType.cbtReschedulePayment,
                amount: 5000,
                charges: 100,
                prefix: 'CRP',
                currency: enums_1.Currency.NGN,
                status: enums_1.Status.Active,
            },
            {
                stateId: 25,
                lgaId: 518,
                drivingSchoolId: 3,
                name: 'Driving School Application Payment',
                type: enums_1.TransactionType.drivingSchoolApplication,
                amount: 4000,
                charges: 100,
                prefix: 'DRA',
                currency: enums_1.Currency.NGN,
                status: enums_1.Status.Active,
            },
            {
                stateId: 25,
                lgaId: 518,
                name: 'Inspection Fee Payment',
                type: enums_1.TransactionType.inspectionFee,
                amount: 7500,
                charges: 100,
                prefix: 'ISP',
                currency: enums_1.Currency.NGN,
                status: enums_1.Status.Active,
            },
            {
                stateId: 25,
                lgaId: 518,
                name: 'Driving School Completion Payment',
                type: enums_1.TransactionType.drivingSchoolCompletionPayment,
                amount: 8500,
                charges: 100,
                prefix: 'DCP',
                currency: enums_1.Currency.NGN,
                status: enums_1.Status.Active,
            },
        ];
        await paymentSettingRepository.delete({});
        for (const setting of settings) {
            await paymentSettingRepository.insert(setting);
        }
    }
}
exports.PaymentSettingsSeederSeeder1744620547218 = PaymentSettingsSeederSeeder1744620547218;
//# sourceMappingURL=1744620547218-payment-settings-seeder-seeder.js.map