export declare class InspectionQuestionsRequestDto {
    question: string;
    category: string;
    options: string[];
    correctAnswer: string;
}
export declare class InspectionQuestionsResponseDto {
    id: number;
    question: string;
    category: string;
    options: string[];
    correctAnswer: string;
    score: number;
}
export declare class InspectionResponse {
    questionId: number;
    choice: string;
    comment: string;
}
