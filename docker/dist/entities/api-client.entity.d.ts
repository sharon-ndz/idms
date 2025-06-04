import { ApiPermission } from '../middlewares/api-client-permission';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
export declare class ApiClient extends BaseEntity {
    clientName: string;
    clientIdentity: string;
    clientEmail: string;
    clientPhone: string;
    token: string;
    isActive: number;
    permissions: ApiPermission[];
    hash: string;
    createdBy: User;
}
