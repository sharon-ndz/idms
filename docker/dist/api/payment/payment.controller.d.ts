import { Response } from 'express';
import { PaymentService } from './payment.service';
import { ListTransactionLogDto, PaymentDto, UpdatePaymentDto, TransactionResponseDto, ValidateTransactionDto, ReferenceDto, PaymentSettingsListRequestsDto, PaymentSettingsDto, UpdatePaymentSettingsDto } from "./payment.dto";
import { LicenseStatsWithYearDto } from '../license/license.dto';
import { DataResultInterface } from '../../core/interfaces/all.interface';
import { PaymentStatus } from '../../core/constants/enums';
export declare class PaymentController {
    private service;
    constructor(service: PaymentService);
    settingsList(data: PaymentSettingsListRequestsDto): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
    createPaymentSetting(data: PaymentSettingsDto): Promise<DataResultInterface>;
    updatePaymentSetting(data: UpdatePaymentSettingsDto): Promise<DataResultInterface>;
    getRevenueSummary(): Promise<{
        newRevenue: number;
        renewalRevenue: number;
        replacementRevenue: number;
    }>;
    getMonthlyRevenueVolume(data: LicenseStatsWithYearDto): Promise<{
        month: number;
        totalRevenue: number;
    }[]>;
    getTotalRevenueGroupedByService(startDate: string, endDate: string): Promise<{
        service: string;
        totalRevenue: number;
    }[]>;
    getTopRevenueByLga(startDate: string, endDate: string): Promise<{
        lgaId: number;
        totalRevenue: number;
    }[]>;
    paystackCallback(data: ReferenceDto, res: Response): Promise<void>;
    initiate(type: PaymentDto, req: any): Promise<any>;
    verify(data: ValidateTransactionDto): Promise<{
        success: boolean;
        message: string;
        status: PaymentStatus;
        paymentData: any;
    }>;
    validateTransaction(data: ValidateTransactionDto): Promise<{
        success: boolean;
        status: string;
        type: string;
        message: string;
        reference: string;
    }>;
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
    listTransactionLogs(data: ListTransactionLogDto, req: any): Promise<DataResultInterface<TransactionResponseDto[]>>;
    updatePayment(data: UpdatePaymentDto): Promise<DataResultInterface>;
}
