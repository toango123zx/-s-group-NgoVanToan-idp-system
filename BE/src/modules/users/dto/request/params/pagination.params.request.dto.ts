import { IsNumber } from "class-validator";

export class Pagination {
    @IsNumber()
    page: number;

    @IsNumber()
    limit: number;
}