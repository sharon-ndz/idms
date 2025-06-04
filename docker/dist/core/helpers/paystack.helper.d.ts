export declare class Paystack {
    private api_link;
    private reference;
    private amount;
    private Authorization;
    private email;
    private callback_url;
    private currency;
    setCurrency(currency: string): this;
    setReferenceNumber(reference: string): this;
    setCallbackUrl(callback_url: string): this;
    setTransactionAmount(amount: number): this;
    setAuthorization(Authorization: string): this;
    setCustomer(email: string): this;
    empty(data: any): boolean;
    initialize(): Promise<any>;
    verify(): Promise<any>;
}
