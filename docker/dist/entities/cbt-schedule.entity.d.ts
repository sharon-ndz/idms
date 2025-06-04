import { User } from './user.entity';
import { BaseEntity } from './base.entity';
import { Payment } from './payment.entity';
import { Student } from './student.entity';
import { CbtCenter } from './cbt-center.entity';
export declare class CbtSchedule extends BaseEntity {
    studentId: number;
    cbtCenterId: number;
    lgaId: number;
    transactionId: number;
    stateId: number;
    date: string;
    time: string;
    score: number;
    answers: {
        [questionId: number]: string;
    };
    status: number;
    cbtStatus: string;
    createdBy: User;
    assessedBy: User;
    transaction: Payment;
    student: Student;
    cbtCenter: CbtCenter;
}
