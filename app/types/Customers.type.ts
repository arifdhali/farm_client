export interface Customer {
    name: string;
    shopname: string;
    phone: string;
    address: string;
}

export interface CreateCustomer extends Customer {
    email: string;
}