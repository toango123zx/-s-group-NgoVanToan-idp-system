import { IsNotEmpty, IsObject, IsString } from "class-validator";

export class RegisterBodyRequestDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    fullName: string;
}