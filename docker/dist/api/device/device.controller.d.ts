import { DeviceService } from './device.service';
import { CreateDeviceRequestDto, DeviceDetailDto, DeviceStatsDto, GetDevicesQueryRequestDto, PreActivationRequestDto, ToggleNodeStatusDto } from './device.dto';
import { DataResultInterface, RequestResultInterface } from '../../core/interfaces/all.interface';
export declare class DeviceController {
    private readonly deviceService;
    constructor(deviceService: DeviceService);
    create(data: CreateDeviceRequestDto, req: any): Promise<RequestResultInterface>;
    preActivation(data: PreActivationRequestDto): Promise<DataResultInterface>;
    checkActivationStatus(deviceId: string): Promise<DataResultInterface>;
    toggleApprovalStatus(data: ToggleNodeStatusDto, req: any): Promise<RequestResultInterface>;
    devices(query: GetDevicesQueryRequestDto): Promise<DataResultInterface>;
    unlinkDevice(imei: string): Promise<RequestResultInterface>;
    deviceStats(req: any): Promise<DataResultInterface<DeviceStatsDto>>;
    getDeviceDetails(id: number): Promise<DataResultInterface<DeviceDetailDto>>;
    deactivateDevice(imei: string): Promise<RequestResultInterface>;
}
