import { AuthUserInfo, DataResultInterface, ListInterface } from '../../core/interfaces/all.interface';
import { NewPermitRequestDto, PermitClassDto } from './permit.dto';
import { Student } from '../../entities/student.entity';
import { Repository } from 'typeorm';
import { PaymentService } from '../payment/payment.service';
import { Permit } from '../../entities/permit.entity';
import { AuditTrail } from '../../entities/audit-trail.entity';
export declare class PermitService {
    private readonly permitRepository;
    private readonly studentRepository;
    private readonly paymentService;
    private readonly auditTrailRepository;
    constructor(permitRepository: Repository<Permit>, studentRepository: Repository<Student>, paymentService: PaymentService, auditTrailRepository: Repository<AuditTrail>);
    stats(data: PermitClassDto): Promise<DataResultInterface>;
    findAll(data: ListInterface, user: AuthUserInfo): Promise<DataResultInterface>;
    details(permitNo: string): Promise<DataResultInterface>;
    issuePermit(data: NewPermitRequestDto, user: AuthUserInfo): Promise<DataResultInterface>;
    buildPermitPayload(data: NewPermitRequestDto, student: Student, user: AuthUserInfo): Promise<Permit>;
}
