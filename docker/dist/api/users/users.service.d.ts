import { DataSource, FindManyOptions, FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { AttachUserBiometricsDto, CreateUserDto, toggleUserStatusDto, UpdateMeDto, UpdateUserDto, UserListRequestDto, UserResponseDto, UserStatsDto } from './users.dto';
import { AuthUserInfo, DataResultInterface, RequestResultInterface } from '../../core/interfaces/all.interface';
import { EmailNotification } from '../../entities/email-notification.entity';
import { AuditTrail } from '../../entities/audit-trail.entity';
export declare class UsersService {
    private readonly emailNotificationRepository;
    private readonly auditTrailRepository;
    private dataSource;
    private readonly userRepository;
    private readonly drivingSchoolRepository;
    constructor(emailNotificationRepository: Repository<EmailNotification>, auditTrailRepository: Repository<AuditTrail>, dataSource: DataSource);
    stats(user: AuthUserInfo): Promise<DataResultInterface<UserStatsDto>>;
    findAll(data: UserListRequestDto, user: AuthUserInfo): Promise<DataResultInterface<UserResponseDto[]>>;
    getSingle(userId: number, user: AuthUserInfo): Promise<DataResultInterface>;
    createUser(data: CreateUserDto, user: AuthUserInfo): Promise<DataResultInterface>;
    updateUser(data: UpdateUserDto, user: AuthUserInfo): Promise<RequestResultInterface>;
    getProfile(user: AuthUserInfo): Promise<DataResultInterface>;
    updateProfile(data: UpdateMeDto, user: AuthUserInfo): Promise<RequestResultInterface>;
    updateUserBiometrics(data: AttachUserBiometricsDto): Promise<{
        success: boolean;
        message: string;
    }>;
    createUserInternal(data: CreateUserDto): Promise<RequestResultInterface>;
    save(data: User): Promise<User>;
    updateNode(userId: number, nodeId: number): Promise<import("typeorm").UpdateResult>;
    update(id: number, user: User): Promise<void>;
    findByCount(where: FindManyOptions<User>): Promise<number>;
    findUserBy(where: FindOptionsWhere<User>): Promise<User>;
    findUser(options: FindOneOptions<User>): Promise<User>;
    toggleUserStatus(id: number, data: toggleUserStatusDto, user: AuthUserInfo): Promise<RequestResultInterface>;
    getMySchoolApplication(user: AuthUserInfo): Promise<DataResultInterface>;
}
