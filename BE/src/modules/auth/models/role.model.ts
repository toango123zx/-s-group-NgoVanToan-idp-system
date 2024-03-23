import { IsBoolean, IsDate, IsString } from "class-validator";
import { Permission } from "./permission.model copy";


export interface Role {
    id?: string;
    name: string;
    description?: string;
    isEditable?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    permissions?: Permission[];
}