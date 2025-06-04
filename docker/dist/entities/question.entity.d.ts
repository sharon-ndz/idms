import { User } from './user.entity';
import { BaseEntity } from './base.entity';
export declare class Question extends BaseEntity {
    questionText: string;
    questionImage: string;
    options: {
        id: string;
        text: string;
    }[];
    correctAnswer: string;
    explanation: string;
    difficultyLevel: number;
    category: number;
    timeLimit: number;
    questionType: string;
    createdBy: User;
    presignedUrl?: string;
    afterFind(): Promise<void>;
}
