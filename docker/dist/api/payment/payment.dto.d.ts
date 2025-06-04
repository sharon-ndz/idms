import { BaseRequestDto } from '../../core/interfaces/all.dto';
import { ActiveInactiveStatus, PaymentStatus, TransactionType } from '../../core/constants/enums';
export declare class PaymentSettingsListRequestsDto extends BaseRequestDto {
    name?: string;
    status: ActiveInactiveStatus;
}
export declare class PaymentSettingsDto {
    name: string;
    type: TransactionType;
    drivingSchoolId?: number;
    stateId: number;
    lgaId: number;
    amount: string;
    charges: string;
    prefix: string;
    currency: string;
    status?: ActiveInactiveStatus;
}
export declare class UpdatePaymentSettingsDto extends PaymentSettingsDto {
    id: number;
}
export declare class ValidateTransactionDto {
    type: string;
    successIndicator: string;
    reference: string;
}
export declare class PaymentDetailsDto {
    reference: string;
    currency: string;
    amountToPay: number;
    amount: number;
    charges: number;
}
export declare class ReferenceDto {
    reference: string;
    trxref: string;
}
export declare class UpdatePaymentDto {
    reference: string;
    type: string;
    status: string;
    used: number;
}
export declare class PaymentDto {
    type: string;
    drivingSchoolId: number;
    email: string;
    orderId: number;
    amount: number;
    currency: string;
    successRedirectUrl: string;
    failureRedirectUrl: string;
    redirectUrl: string;
    description: string;
}
export declare class ListTransactionLogDto extends BaseRequestDto {
    type?: string;
    status?: string;
    reference?: string;
    createdAtStart?: string;
    createdAtEnd?: string;
}
export declare class TransactionResponseDto {
    id: number;
    createdAt: Date;
    userId: number;
    email: string;
    amount: number;
    status: PaymentStatus;
    reference: string;
    channel: string | null;
    type: TransactionType;
    currency: string;
    log: string;
    itemType: string;
    itemId: number;
    provider: number;
    used: number;
    charges: number;
    refunded: boolean;
}
