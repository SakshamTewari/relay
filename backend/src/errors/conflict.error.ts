import { AppError } from "./app.error";

export class ConflictError extends AppError {
    constructor(message = "Forbidden", code: string){
        super(message, 409, code);
    };
}