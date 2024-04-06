import { ApiError } from "./api-error";

export class BadRequestError extends ApiError {
    constructor(message: string, statusCode: number = 400) {
        super(message);
        this.statusCode = statusCode;
    }
}