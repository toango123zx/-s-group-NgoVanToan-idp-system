import { Allow, IsNotEmpty, IsString } from 'class-validator';

export class LoginBodyRequestDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
    