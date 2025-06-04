import { DataSource, QueryRunner } from 'typeorm';
import { Order } from '../constants/enums';
export declare class ApplicationNoDto {
    applicationId: string;
}
export declare class StudentNoDto {
    studentCertNo: string;
}
export declare class LicenseNoDto {
    licenseNo: string;
}
export declare class RejectParam {
    id: number;
    reason: string;
}
export declare class GetParam {
    search: any;
    resultPerPage: any;
    page: any;
}
export declare class PaymentParam {
    email: any;
    callbackUrl: any;
}
export declare class MessageResponseDto {
    message: string;
}
export declare class ErrorData {
    message: string;
    details?: any;
    constructor(message: string, details?: any);
}
export declare function beginTransaction(dataSource: DataSource): Promise<QueryRunner>;
export declare class BaseRequestDto {
    search?: string;
    resultPerPage?: number;
    page?: number;
    order?: Order.ASC | Order.DESC;
}
