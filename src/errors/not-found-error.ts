import { ApiError } from "./api-error";

export class NotFoundError extends ApiError {
    constructor(message: string, statusCode: number = 404) {
        super(message);
        this.statusCode = statusCode;
    }
}