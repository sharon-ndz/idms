import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { DeviceStatus, DeviceTypes } from '../core/constants/enums';
export declare class Node extends BaseEntity {
    deviceImei: string;
    license: string;
    deviceId: string;
    organizationCode: string;
    organizationName: string;
    status: DeviceStatus;
    rejectionReason: string;
    requesterEmail: string;
    requesterFirstName: string;
    requesterLastName: string;
    requesterPhone: string;
    type: DeviceTypes;
    activatedBy: User;
    agents: User[];
}
