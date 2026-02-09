export interface cashType {
    amount: number;
    expenses_type: string;
    date: Date | string;
}


export interface AddAmount {
    amount_collected: number;
    customer_id: number | null;
    payment_type: string;
    date: Date | string;
    submitted_by:string | null;
}