import { Repository } from 'typeorm';
import { AuditTrailActionDto, AuditTrailResponseDto, ListAuditTrailDto } from './audit-trail.dto';
import { AuditTrail } from '../../entities/audit-trail.entity';
import { AuthUserInfo, DataResultInterface } from '../../core/interfaces/all.interface';
export declare class AuditTrailService {
    private readonly auditTrailRepository;
    constructor(auditTrailRepository: Repository<AuditTrail>);
    record(data: AuditTrailActionDto): Promise<void>;
    findAll(data: ListAuditTrailDto, user: AuthUserInfo): Promise<DataResultInterface<AuditTrailResponseDto[]>>;
}
