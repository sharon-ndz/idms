import { DataResultInterface } from '../../core/interfaces/all.interface';
import { AuditTrailResponseDto, ListAuditTrailDto } from './audit-trail.dto';
import { AuditTrailService } from './audit-trail.service';
export declare class AuditTrailController {
    private readonly service;
    constructor(service: AuditTrailService);
    findAll(data: ListAuditTrailDto, req: any): Promise<DataResultInterface<AuditTrailResponseDto[]>>;
}
