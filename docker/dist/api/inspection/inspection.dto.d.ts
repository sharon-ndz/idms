import { InspectionStatus } from '../../core/constants/enums';
import { BaseRequestDto } from '../../core/interfaces/all.dto';
import { InspectionQuestionsRequestDto, InspectionQuestionsResponseDto, InspectionResponse } from '../../core/constants/classes';
export declare class NewInspectionDto {
    drivingSchoolId: number;
    questionId: number;
    status: string;
    totalScore: number;
    stateId: number;
    queryReasons?: string[];
    inspectionResult: InspectionResponse[];
    name?: string;
    month?: number;
    year?: number;
    comment: string;
}
export declare class ListInspectionsDto extends BaseRequestDto {
    status?: InspectionStatus;
    createdAtStart?: string;
    createdAtEnd?: string;
}
export declare class ListInspectionsQuestionsDto extends BaseRequestDto {
}
export declare class InspectionQuestionReqDto {
    questions: InspectionQuestionsRequestDto[];
    stateId: number;
}
export declare class InspectionQuestionResDto {
    questions: InspectionQuestionsResponseDto[];
    stateId: number;
}
