import { PermitService } from './permit.service';
import { DataResultInterface, ListInterface } from '../../core/interfaces/all.interface';
import { NewPermitRequestDto, PermitClassDto } from './permit.dto';
export declare class PermitController {
    private readonly service;
    constructor(service: PermitService);
    studentsStats(data: PermitClassDto): Promise<DataResultInterface>;
    findAll(data: ListInterface, req: any): Promise<DataResultInterface>;
    details(permitNo: string): Promise<DataResultInterface>;
    issuePermit(data: NewPermitRequestDto, req: any): Promise<DataResultInterface>;
}
