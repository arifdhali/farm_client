export interface LoginRequest {
    email: string;
    password: string;
    remember: boolean;
}
export interface ForgotRequest {
    email: string;
}
export interface ConfirmPassword {
    password: string;
}

