export interface CreateFarmer {
    name: string;
    mobile: string;
    address: string;
    capacity: number;
    rate: number;
    status: "free" | "occupied";
}