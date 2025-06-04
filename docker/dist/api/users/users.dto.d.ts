import { Role } from '../../middlewares/roles';
import { FileInterface } from '../file/file.dto';
import { BaseRequestDto } from '../../core/interfaces/all.dto';
import { Status } from '../../core/constants/enums';
export declare class UserDto {
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    phone: string;
    stateId: number;
    lgaId: number;
    drivingSchoolId: number;
    permissions: string;
    isActive: number;
    address: string;
}
export declare class AttachUserBiometricsDto {
    email: string;
    files: FileInterface[];
}
export declare class CreateUserDto extends UserDto {
    password: string;
    roleId: number;
    roleName: string;
}
export declare class UpdateUserDto {
    id: number;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    phone: string;
    roleId: number;
    roleName: string;
    stateId: number;
    lgaId: number;
    drivingSchoolId: number;
    permissions: string;
    isActive: number;
    password: string;
}
export declare class ChangeUserPasswordDto {
    id: number;
    newPassword: string;
}
export declare class UpdateMeDto {
    firstName: string;
    middleName: string;
    lastName: string;
    phone: string;
    stateId: number;
    lgaId: number;
    address?: string;
}
export declare class UserStatsDto {
    totalUsers: number;
    inactiveUsers: number;
    newUsers: number;
    lasdriAdmins: number;
    lasdriOfficers: number;
}
export declare class UserResponseDto {
    id: number;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    phone: string;
    roleId: number;
    roleName: string;
    stateId: number;
    lgaId: number;
    drivingSchoolId: number;
    avatar: string;
    changePasswordNextLogin: boolean;
}
export declare class UserListRequestDto extends BaseRequestDto {
    stateId: number;
    lgaId: number;
    drivingSchoolId: number;
    status?: Status;
    roleId?: Role;
}
export declare class toggleUserStatusDto {
    status?: Status.Active | Status.Inactive;
}
