export interface CreateFarmer {
    name: string;
    mobile_number: string;
    location: string;
    capacity: number;
    rate: number;
}

export type makeLifting = {
    lifting_date: Date | string;
    user_id: number | null;
    farm_id: string;
    chicks_count: number;
    chicks_weight: number;
    order_id: string;
    rate: number;
    total_amount?: number;
    paid_amount: number | string;
}


export interface paginationProp {
    page: number;
    per_page: number;
    total: number;
    onPageChange: (page: number) => void;
}