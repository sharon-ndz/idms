import { BaseEntity } from './base.entity';
import { DeviceStatus, DeviceTypes } from '../core/constants/enums';
export declare class Device extends BaseEntity {
    organizationCode: string;
    organizationName: string;
    license: string;
    deviceId: string;
    deviceImei: string;
    type: DeviceTypes;
    status: DeviceStatus;
}
