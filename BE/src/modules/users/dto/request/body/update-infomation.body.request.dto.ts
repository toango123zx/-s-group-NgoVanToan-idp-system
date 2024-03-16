import { IsString } from "class-validator";

export class UpdateInfomationBodyRequestDto {

    @IsString()
    fullName?: string;
}