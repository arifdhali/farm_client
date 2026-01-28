export interface CreateFarmer {
    name: string;
    mobile_number: string;
    location: string;
    capacity: number;
    farm_status: "free" | "occupied";
    farmer_rate: number;
    commision_rate: number;
}