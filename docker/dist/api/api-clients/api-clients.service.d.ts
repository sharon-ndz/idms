import { Repository } from 'typeorm';
import { ApiClient } from '../../entities/api-client.entity';
import { ApiClientAuthDto, ApiClientChangeStatusDto, ApiClientCreateDto, ApiClientCreateResultInterface, ApiClientResetPasswordDto, ApiClientResultInterface, ApiClientUpdateDto } from './api-clients.dto';
import { AuthUserInfo, ListInterface, RequestResultInterface } from '../../core/interfaces/all.interface';
import { JwtService } from '@nestjs/jwt';
import { AuditTrail } from '../../entities/audit-trail.entity';
export declare class ApiClientsService {
    private readonly apiClientRepository;
    private readonly auditTrailRepository;
    private readonly jwtService;
    constructor(apiClientRepository: Repository<ApiClient>, auditTrailRepository: Repository<AuditTrail>, jwtService: JwtService);
    findAll(data: ListInterface): Promise<ApiClientResultInterface>;
    authenticate(clientData: ApiClientAuthDto): Promise<{
        success: boolean;
        access_token: string;
        expires: Date;
    }>;
    create(data: ApiClientCreateDto, user: AuthUserInfo): Promise<ApiClientCreateResultInterface>;
    changeStatus(data: ApiClientChangeStatusDto, user: AuthUserInfo): Promise<{
        success: boolean;
        message: string;
    }>;
    update(data: ApiClientUpdateDto, user: AuthUserInfo): Promise<RequestResultInterface>;
    resetPassword(data: ApiClientResetPasswordDto, user?: AuthUserInfo): Promise<RequestResultInterface>;
}
