export type BackendError = {
    message: string;
    errors: { field: string; message: string }[];
    status: boolean;
    statusCode: number;
}