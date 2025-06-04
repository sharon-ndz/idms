import { BaseRequestDto } from '../../core/interfaces/all.dto';
import { Role } from '../../middlewares/roles';
export interface AuditTrailActionDto {
    userId: number;
    dbAction: string;
    tableName: string;
    resourceId: number;
    description: string;
}
export declare class ListAuditTrailDto extends BaseRequestDto {
    roleId?: Role;
}
export declare class AuditTrailResponseDto {
    userId: number;
    dbAction: string;
    tableName: string;
    resourceId: number;
    description: string;
    createdAt?: Date;
    user: {
        id: number;
        firstName: string;
        lastName: string;
    };
}
