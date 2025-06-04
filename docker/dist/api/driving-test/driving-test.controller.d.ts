import { DrivingTestService } from './driving-test.service';
import { FetchMasterListDto } from '../driving-school/driving-school.dto';
import { DataResultInterface, RequestResultInterface } from '../../core/interfaces/all.interface';
import { BookDrivingTestSlotDto, CreateDrivingTestCenterDto, DrivingTestCenterIdDto, SubmitDrivingTestDto, UpdateDrivingTestCenterDto } from './driving-test.dto';
export declare class DrivingTestController {
    private readonly service;
    constructor(service: DrivingTestService);
    getDrivingTestCenters(data: FetchMasterListDto): Promise<DataResultInterface>;
    getSlots(data: DrivingTestCenterIdDto): Promise<DataResultInterface>;
    bookSlot(data: BookDrivingTestSlotDto): Promise<DataResultInterface>;
    testHistory(req: any): Promise<DataResultInterface>;
    submitDrivingTest(data: SubmitDrivingTestDto, req: any): Promise<RequestResultInterface>;
    createCenter(data: CreateDrivingTestCenterDto): Promise<DataResultInterface>;
    updateCenter(data: UpdateDrivingTestCenterDto): Promise<DataResultInterface>;
    getFailedAttempts(studentId: number): Promise<DataResultInterface>;
}
