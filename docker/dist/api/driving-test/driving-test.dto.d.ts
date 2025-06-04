import { drivingTestAnswer } from '../../core/interfaces/all.interface';
import { FileInterface } from "../file/file.dto";
import { BookingStatus } from "../../core/constants/enums";
export declare class DrivingTestCenterIdDto {
    drivingTestCenterId: number;
}
export declare class BookDrivingTestSlotDto extends DrivingTestCenterIdDto {
    studentId: number;
    stateId: number;
    lgaId: number;
    date: string;
    time: string;
}
export declare class CreateDrivingTestCenterDto {
    stateId: number;
    lgaId: number;
    email: string;
    phone: string;
    name: string;
    devices: number;
    threshold: number;
    isActive: number;
    identifier: string;
}
export declare class UpdateDrivingTestCenterDto {
    id: number;
    stateId: number;
    lgaId: number;
    email: string;
    phone: string;
    name: string;
    devices: number;
    threshold: number;
    isActive: number;
}
export declare class DrivingTestScheduleDto {
    stateId: number;
    lgaId: number;
    date: string;
    time: string;
    bookingStatus: BookingStatus;
    transactionId: number;
    canCreate: boolean;
}
export declare class SubmitDrivingTestDto {
    answers: drivingTestAnswer[];
    applicationNo: string;
    assessedBy: number;
    files?: FileInterface[];
    vehicleType: string;
    location: string;
    reference?: string;
    transactionId?: number;
}
