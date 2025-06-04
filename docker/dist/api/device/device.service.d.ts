import { DataSource, Repository } from 'typeorm';
import { Device } from '../../entities/device.entity';
import { Node } from '../../entities/node.entity';
import { AuthUserInfo, DataResultInterface, RequestResultInterface } from '../../core/interfaces/all.interface';
import { CreateDeviceRequestDto, DeviceDetailDto, DeviceStatsDto, GetDevicesQueryRequestDto, PreActivationRequestDto, ToggleNodeStatusDto } from './device.dto';
import { UsersService } from '../users/users.service';
import { AuditTrail } from '../../entities/audit-trail.entity';
export declare class DeviceService {
    private readonly deviceRepository;
    private readonly nodeRepository;
    private readonly usersService;
    private readonly auditTrailRepository;
    private dataSource;
    constructor(deviceRepository: Repository<Device>, nodeRepository: Repository<Node>, usersService: UsersService, auditTrailRepository: Repository<AuditTrail>, dataSource: DataSource);
    devices(data: GetDevicesQueryRequestDto): Promise<DataResultInterface>;
    create(data: CreateDeviceRequestDto, user: AuthUserInfo): Promise<RequestResultInterface>;
    preActivation(data: PreActivationRequestDto): Promise<DataResultInterface>;
    checkActivationStatus(deviceId: string): Promise<DataResultInterface>;
    toggleApprovalStatus(data: ToggleNodeStatusDto, user: AuthUserInfo): Promise<RequestResultInterface>;
    unlinkDevice(deviceImei: string): Promise<RequestResultInterface>;
    deviceStats(user: AuthUserInfo): Promise<DataResultInterface<DeviceStatsDto>>;
    getDeviceDetails(id: number): Promise<DataResultInterface<DeviceDetailDto>>;
    deactivateDevice(deviceImei: string): Promise<RequestResultInterface>;
}
