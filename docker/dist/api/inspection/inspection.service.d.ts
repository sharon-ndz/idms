import { DataSource, Repository } from 'typeorm';
import { Inspection } from '../../entities/inspection.entity';
import { AuthUserInfo, DataResultInterface } from '../../core/interfaces/all.interface';
import { InspectionQuestionReqDto, InspectionQuestionResDto, ListInspectionsDto, ListInspectionsQuestionsDto, NewInspectionDto } from './inspection.dto';
import { AuditTrail } from '../../entities/audit-trail.entity';
import { InspectionQuestion } from '../../entities/inspection-question.entity';
export declare class InspectionService {
    private readonly inspectionRepository;
    private readonly auditTrailRepository;
    private dataSource;
    private readonly inspectionQuestionRepository;
    constructor(inspectionRepository: Repository<Inspection>, auditTrailRepository: Repository<AuditTrail>, dataSource: DataSource, inspectionQuestionRepository: Repository<InspectionQuestion>);
    findAll(data: ListInspectionsDto, user: AuthUserInfo): Promise<DataResultInterface>;
    create(data: NewInspectionDto, user: AuthUserInfo): Promise<DataResultInterface>;
    getUserInspections(userId: number, data: ListInspectionsDto, user: AuthUserInfo): Promise<DataResultInterface>;
    getSingle(id: number): Promise<DataResultInterface>;
    uploadQuestions(data: InspectionQuestionReqDto, user: AuthUserInfo): Promise<DataResultInterface>;
    getInspectionQuestions(data: ListInspectionsQuestionsDto, stateId: number, user: AuthUserInfo): Promise<DataResultInterface<InspectionQuestionResDto>>;
    submitInspection(data: NewInspectionDto, user: AuthUserInfo): Promise<DataResultInterface>;
}
