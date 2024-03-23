import { IsNumber } from "class-validator";

export interface Jwt {
    id: any;
    iat: number;
    exp: number;
}