import { AppError } from "./app.error";

export class UnauthorizedError extends AppError {
    constructor(message = "Unauthorized", code: string){
        super(message, 401, code);
    }
}