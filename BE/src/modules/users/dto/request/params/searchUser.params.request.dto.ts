import { IsOptional, IsString } from "class-validator";

export class SearchUserParamsRequestDto {
    @IsString()
    @IsOptional()
    fullName?: string = undefined;

    @IsString()
    @IsOptional()
    email?: string = undefined;

}