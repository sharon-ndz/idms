import { CreateInstructorDto } from './Instructor.dto';
import { DataResultInterface } from '../../core/interfaces/all.interface';
import { DrivingSchoolInstructor } from '../../entities/driving-school-instructor.entity';
import { DataSource, Repository } from 'typeorm';
export declare class InstructorService {
    private readonly instructorRepository;
    private readonly dataSource;
    constructor(instructorRepository: Repository<DrivingSchoolInstructor>, dataSource: DataSource);
    create(data: CreateInstructorDto): Promise<DataResultInterface>;
    validateInstructor(instructorId: string): Promise<{
        success: boolean;
        message: string;
        data: DrivingSchoolInstructor;
    }>;
}
