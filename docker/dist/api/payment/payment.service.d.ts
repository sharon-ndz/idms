import { DataSource, FindOptionsWhere, Repository } from 'typeorm';
import { Payment } from '../../entities/payment.entity';
import { ListTransactionLogDto, PaymentDto, PaymentSettingsDto, PaymentSettingsListRequestsDto, TransactionResponseDto, UpdatePaymentDto, UpdatePaymentSettingsDto, ValidateTransactionDto } from './payment.dto';
import { PaymentStatus } from '../../core/constants/enums';
import { EmailNotification } from '../../entities/email-notification.entity';
import { License } from '../../entities/license.entity';
import { LicenseStatsWithYearDto } from '../license/license.dto';
import { PreRegistration } from '../../entities/pre-registration.entity';
import { PaymentSetting } from '../../entities/payment-setting.entity';
import { AuthUserInfo, DataResultInterface } from '../../core/interfaces/all.interface';
export declare class PaymentService {
    private readonly paymentRepository;
    private readonly paymentSettingRepository;
    private readonly licenseRepository;
    private readonly emailNotificationRepository;
    private readonly preRegistrationRepository;
    private dataSource;
    constructor(paymentRepository: Repository<Payment>, paymentSettingRepository: Repository<PaymentSetting>, licenseRepository: Repository<License>, emailNotificationRepository: Repository<EmailNotification>, preRegistrationRepository: Repository<PreRegistration>, dataSource: DataSource);
    settingsList(data: PaymentSettingsListRequestsDto): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
    createPaymentSetting(data: PaymentSettingsDto): Promise<DataResultInterface>;
    updatePaymentSetting(data: UpdatePaymentSettingsDto): Promise<DataResultInterface>;
    initiate(paymentObject: PaymentDto, request: any): Promise<any>;
    verify(data: ValidateTransactionDto): Promise<{
        success: boolean;
        message: string;
        status: PaymentStatus;
        paymentData: any;
    }>;
    updatePayment(data: UpdatePaymentDto): Promise<DataResultInterface>;
    validateTransaction(data: ValidateTransactionDto): Promise<{
        success: boolean;
        status: string;
        type: string;
        message: string;
        reference: string;
    }>;
    private initiateFCMBPayment;
    private initiatePaystackPayment;
    verifyPaystackPayment(data: ValidateTransactionDto): Promise<{
        success: boolean;
        status: string;
        message: string;
        log: any;
    }>;
    verifyFCMBPayment(data: ValidateTransactionDto, transaction: Payment): Promise<{
        success: boolean;
        status: string;
        message: string;
        log: any;
    }>;
    getRevenueSummary(): Promise<{
        newRevenue: number;
        renewalRevenue: number;
        replacementRevenue: number;
    }>;
    getMonthlyRevenueVolume(data: LicenseStatsWithYearDto): Promise<{
        month: number;
        totalRevenue: number;
    }[]>;
    getTotalRevenueGroupedByService(startDate: Date, endDate: Date): Promise<{
        service: string;
        totalRevenue: number;
    }[]>;
    getTopRevenueByLga(startDate: Date, endDate: Date): Promise<{
        lgaId: number;
        totalRevenue: number;
    }[]>;
    update(id: number, payment: Payment): Promise<void>;
    findPaymentBy(where: FindOptionsWhere<Payment>): Promise<Payment>;
    verifyPreRegistration(data: any): Promise<any>;
    verifyLicense(data: any): Promise<any>;
    getRevenueStats(): Promise<{
        revenue: {
            itemType: any;
            count: number;
            amount: number;
        }[];
        refunded: {
            count: number;
            amount: number;
        };
    }>;
    listTransactionLogs(data: ListTransactionLogDto, user: AuthUserInfo): Promise<DataResultInterface<TransactionResponseDto[]>>;
}
