import { BaseEntity } from './base.entity';
export declare class DrivingTestCenter extends BaseEntity {
    identifier: string;
    name: string;
    phone: string;
    email?: string;
    lgaId: number;
    stateId: number;
    threshold: number;
    devices: number;
    address?: string;
    isActive: number;
}
