import { IsEmail, IsInt, IsNotEmpty, IsObject, IsString } from "class-validator";

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

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsInt()
    @IsNotEmpty()
    age: number;
}