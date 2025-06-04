import { InspectionService } from './inspection.service';
import { DataResultInterface } from '../../core/interfaces/all.interface';
import { InspectionQuestionReqDto, InspectionQuestionResDto, ListInspectionsDto, ListInspectionsQuestionsDto, NewInspectionDto } from './inspection.dto';
export declare class InspectionController {
    private readonly service;
    constructor(service: InspectionService);
    findAll(data: ListInspectionsDto, req: any): Promise<DataResultInterface>;
    create(data: NewInspectionDto, req: any): Promise<DataResultInterface>;
    getUserInspections(userId: number, data: ListInspectionsDto, req: any): Promise<DataResultInterface>;
    getInspectionQuestions(stateId: number, data: ListInspectionsQuestionsDto, req: any): Promise<DataResultInterface<InspectionQuestionResDto>>;
    getSingle(id: number, req: any): Promise<DataResultInterface>;
    uploadQuestions(data: InspectionQuestionReqDto, req: any): Promise<DataResultInterface>;
    submitInspection(data: NewInspectionDto, req: any): Promise<DataResultInterface>;
}
