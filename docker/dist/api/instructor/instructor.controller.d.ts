import { InstructorService } from './instructor.service';
import { CreateInstructorDto } from './Instructor.dto';
export declare class InstructorController {
    private readonly instructorService;
    constructor(instructorService: InstructorService);
    create(data: CreateInstructorDto, req: any): Promise<import("../../core/interfaces/all.interface").DataResultInterface<any>>;
    validateInstructor(instructorId: string): Promise<{
        success: boolean;
        message: string;
        data: import("../../entities/driving-school-instructor.entity").DrivingSchoolInstructor;
    }>;
}
