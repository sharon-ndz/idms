import { Strategy } from 'passport-jwt';
import { UsersService } from '../api/users/users.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly userService;
    constructor(userService: UsersService);
    validate(payload: any): Promise<{
        id: any;
        name: string;
        roleId: number;
        roleName: any;
        stateId: any;
        lgaId: any;
        drivingSchoolId: any;
        email: any;
        isActive: any;
    }>;
}
export {};
