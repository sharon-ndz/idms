import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { InspectionQuestionsRequestDto } from '../core/constants/classes';
export declare class InspectionQuestion extends BaseEntity {
    questions: InspectionQuestionsRequestDto[];
    stateId: number;
    createdBy: User;
}
