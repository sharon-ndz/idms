import { CbtService } from './cbt.service';
import { FetchMasterListDto } from '../driving-school/driving-school.dto';
import { DataResultInterface, RequestResultInterface } from '../../core/interfaces/all.interface';
import { BookSlotDto, CbtCenterIdDto, CbtRescheduleDto, CreateCbtCenterDto, CreateQuestionDto, FetchQuestionsDto, QuestionByStudentDto, SubmitTestDto, UpdateCbtCenterDto, UpdateQuestionDto } from './cbt.dto';
export declare class CbtController {
    private readonly service;
    constructor(service: CbtService);
    getCbtCenters(data: FetchMasterListDto): Promise<DataResultInterface>;
    getSlots(data: CbtCenterIdDto): Promise<DataResultInterface>;
    bookSlot(data: BookSlotDto): Promise<DataResultInterface>;
    getTestByStudent(data: QuestionByStudentDto): Promise<DataResultInterface<any>>;
    submitTest(data: SubmitTestDto): Promise<DataResultInterface<any>>;
    cbtEnrolls(req: any): Promise<DataResultInterface>;
    createCenter(data: CreateCbtCenterDto): Promise<DataResultInterface>;
    updateCenter(data: UpdateCbtCenterDto): Promise<DataResultInterface>;
    questionList(data: FetchQuestionsDto): Promise<DataResultInterface>;
    updateQuestion(data: UpdateQuestionDto, req: any): Promise<DataResultInterface>;
    createQuestion(data: CreateQuestionDto, req: any): Promise<DataResultInterface>;
    getFailedAttempts(studentId: number): Promise<DataResultInterface>;
    rescheduleCbt(data: CbtRescheduleDto): Promise<RequestResultInterface>;
}
