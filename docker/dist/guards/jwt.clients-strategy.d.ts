import { Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { ApiClient } from '../entities/api-client.entity';
declare const JwtAPIClientsStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtAPIClientsStrategy extends JwtAPIClientsStrategy_base {
    private apiClientRepository;
    constructor(apiClientRepository: Repository<ApiClient>);
    validate(payload: any): Promise<{
        id: any;
        clientName: any;
        clientEmail: any;
        clientPhone: any;
    }>;
}
export {};
