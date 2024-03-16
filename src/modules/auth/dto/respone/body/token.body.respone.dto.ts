import { createId } from "@paralleldrive/cuid2";
import { IsDefined, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class TokenBodyResponseDto {

    @IsString()
    id: string;

    @IsString()
    @IsNotEmpty()
    accessToken: string;

    constructor(accessToken: string, id: string = createId()) {
        this.accessToken = accessToken;
        this.id = id;
        
    };
    // constructor(idOrAccessToken: string, accessToken?: string) {
    //     if (accessToken === undefined) {
    //         this.accessToken = idOrAccessToken;
    //         this.id = createId();
    //     } else {
    //         this.id = idOrAccessToken;
    //         this.accessToken = accessToken;
    //     }
    // }
}