import { BaseEntity } from './base.entity';
import { Payment } from './payment.entity';
import { drivingTestAnswer, FileData } from '../core/interfaces/all.interface';
import { User } from './user.entity';
import { PreRegistration } from './pre-registration.entity';
import { DrivingTestCenter } from './driving-test-center.entity';
export declare class DrivingTestSchedule extends BaseEntity {
    preRegistrationId: number;
    drivingTestCenterId: number;
    licenseClassId: number;
    studentId: number;
    lgaId: number;
    transactionId: number;
    stateId: number;
    date: string;
    time: string;
    score: number;
    answers: drivingTestAnswer[];
    files: FileData[];
    vehicleType: string;
    location: string;
    bookingStatus: number;
    status: string;
    drivingTestCenter: DrivingTestCenter;
    preRegistration: PreRegistration;
    transaction: Payment;
    assessedBy: User;
}
