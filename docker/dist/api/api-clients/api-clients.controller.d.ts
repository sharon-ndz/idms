import { ApiClientsService } from './api-clients.service';
import { ListInterface, RequestResultInterface } from '../../core/interfaces/all.interface';
import { ApiClientAuthDto, ApiClientChangeStatusDto, ApiClientCreateDto, ApiClientCreateResultInterface, ApiClientResultInterface, ApiClientUpdateDto } from './api-clients.dto';
export declare class ApiClientsController {
    private readonly service;
    constructor(service: ApiClientsService);
    login(data: ApiClientAuthDto): Promise<{
        success: boolean;
        access_token: string;
        expires: Date;
    }>;
    findAll(data: ListInterface): Promise<ApiClientResultInterface>;
    create(data: ApiClientCreateDto, req: any): Promise<ApiClientCreateResultInterface>;
    changeStatus(data: ApiClientChangeStatusDto, req: any): Promise<RequestResultInterface>;
    resetPassword(id: number, req: any): Promise<RequestResultInterface>;
    update(data: ApiClientUpdateDto, req: any): Promise<RequestResultInterface>;
}
