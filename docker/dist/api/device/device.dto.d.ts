import { DeviceStatus, DeviceTypes } from '../../core/constants/enums';
import { GetParam } from '../../core/interfaces/all.dto';
export declare class CreateDeviceRequestDto {
    deviceImei: string;
    license: string;
    type: DeviceTypes;
    organizationCode: string;
    organizationName: string;
}
export declare class PreActivationRequestDto {
    deviceImei: string;
    license: string;
    deviceId: string;
    requesterEmail: string;
    requesterFirstName: string;
    requesterLastName: string;
    requesterPhone: string;
    organizationCode: string;
}
export declare class ToggleNodeStatusDto {
    id: string;
    status: DeviceStatus;
}
export declare class GetDevicesQueryRequestDto extends GetParam {
    search: string;
    status: DeviceStatus;
    pendingApproval: boolean;
}
export declare class DeviceDetailDto {
    id: number;
    deviceImei: string;
    license: string;
    type: DeviceTypes;
    organizationCode: string;
    organizationName: string;
    status: DeviceStatus;
    createdAt: string;
    agents: AgentDetailDto[];
    agentActivityLogs: any[];
}
export declare class AgentDetailDto {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    createdAt: string;
}
export declare class DeviceStatsDto {
    totalDevices: number;
    activeDevices: number;
    pendingDevices: number;
    deactivatedDevices: number;
}
