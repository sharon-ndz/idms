import { Order } from '../constants/enums';
export declare abstract class PageOptionsDto {
    readonly order?: Order;
    readonly page?: number;
    readonly take?: number;
    get skip(): number;
}
