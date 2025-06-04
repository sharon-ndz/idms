import { User } from './user.entity';
import { BaseEntity } from './base.entity';
export declare class AuditTrail extends BaseEntity {
    userId: number;
    user: User;
    dbAction: string;
    tableName: string;
    resourceId: number;
    description: string;
}
