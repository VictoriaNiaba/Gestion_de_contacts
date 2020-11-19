import { HttpStatus } from "@nestjs/common";

export interface ApiError {
    status: HttpStatus;
    title: string;
    message: string;
    timestamp: Date | string;
    path: string;
}
