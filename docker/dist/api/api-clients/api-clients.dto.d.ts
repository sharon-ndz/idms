import { ApiClient } from '../../entities/api-client.entity';
import { PaginationInterface } from '../../core/interfaces/all.interface';
import { ApiPermission } from '../../middlewares/api-client-permission';
export interface ApiClientCreateResultInterface {
    success: boolean;
    message: string;
    data: ApiClient | null;
}
export interface ApiClientResultInterface {
    result: ApiClient[];
    pagination: PaginationInterface;
}
export declare class ApiClientChangeStatusDto {
    id: number;
    status: number;
}
export declare class ApiClientCreateDto {
    clientName: string;
    clientEmail: string;
    clientPhone: string;
    permissions: ApiPermission[];
}
export declare class ApiClientUpdateDto {
    id: number;
    clientName: string;
    clientEmail: string;
    clientPhone: string;
    permissions: ApiPermission[];
}
export declare class ApiClientAuthDto {
    identity: string;
    secret: string;
}
export declare class ApiClientResetPasswordDto {
    id: number;
}
