import { GetParam } from '../../core/interfaces/all.dto';
export declare class CbtCenterIdDto {
    cbtCenterId: number;
}
export declare class BookSlotDto {
    cbtCenterId: number;
    studentId: number;
    stateId: number;
    lgaId: number;
    date: string;
    time: string;
}
export declare class CreateCbtCenterDto {
    stateId: number;
    lgaId: number;
    name: string;
    isActive: number;
}
export declare class UpdateCbtCenterDto extends CreateCbtCenterDto {
    id: number;
    isActive: number;
}
export declare class CbtScheduleDto {
    stateId: number;
    lgaId: number;
    date: string;
    time: string;
    cbtStatus: string;
    transactionId: number;
}
export declare class CbtRescheduleDto extends CbtScheduleDto {
    reference: string;
    transactionId: number;
    studentId: number;
    cbtCenterId: number;
}
export declare class CreateQuestionDto {
    questionText: string;
    options: {
        id: string;
        text: string;
    }[];
    correctAnswer: string;
    explanation?: string;
    difficultyLevel: number;
    category: number;
    timeLimit?: number;
    questionType?: string;
}
export declare class UpdateQuestionDto extends CreateQuestionDto {
    id: number;
}
export declare class FetchQuestionsDto extends GetParam {
    category: string;
    difficultyLevel: number;
}
export declare class QuestionByStudentDto {
    studentNo: string;
    difficultyLevel: number;
    category: number;
}
export declare class SubmitTestDto extends QuestionByStudentDto {
    answers: {
        [questionId: number]: string;
    };
}
