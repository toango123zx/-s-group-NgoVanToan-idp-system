import { IsNumber } from "class-validator";

export interface Jwt {
    data?: any;
    iat: number;
    exp: number;
}