export interface cashType {
    amount: number;
    expenses_type: string;
    date: Date | string;
}


export interface AddAmount {
    amount_collected: number;
    customer_id: number | null;
    batch_id: string | number;
    payment_type: string;
    date: Date | string;
    submitted_by: string | null;
}

export interface EditAmount {
    amount_collected: number;
    customer_name: string;
    batch_id: string | number;
    payment_type: string;
    date: Date | string;
}