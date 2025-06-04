import { UsersService } from './users.service';
import { DataResultInterface, RequestResultInterface } from '../../core/interfaces/all.interface';
import { AttachUserBiometricsDto, CreateUserDto, toggleUserStatusDto, UpdateMeDto, UpdateUserDto, UserListRequestDto, UserResponseDto, UserStatsDto } from './users.dto';
export declare class UsersController {
    private readonly service;
    constructor(service: UsersService);
    stats(req: any): Promise<DataResultInterface<UserStatsDto>>;
    findAll(data: UserListRequestDto, req: any): Promise<DataResultInterface<UserResponseDto[]>>;
    getSingle(userId: number, req: any): Promise<DataResultInterface<any>>;
    createUser(data: CreateUserDto, req: any): Promise<DataResultInterface>;
    updateUser(data: UpdateUserDto, req: any): Promise<RequestResultInterface>;
    getProfile(req: any): Promise<DataResultInterface>;
    updateProfile(data: UpdateMeDto, req: any): Promise<RequestResultInterface>;
    updateUserBiometrics(data: AttachUserBiometricsDto): Promise<{
        success: boolean;
        message: string;
    }>;
    updateUserTest(data: UpdateUserDto, req: any): Promise<RequestResultInterface>;
    findAllTest(data: UserListRequestDto, req: any): Promise<DataResultInterface>;
    toggleUserStatus(id: number, data: toggleUserStatusDto, req: any): Promise<RequestResultInterface>;
    getMySchoolApplication(req: any): Promise<DataResultInterface>;
}
