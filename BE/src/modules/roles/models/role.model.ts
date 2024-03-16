import { IsBoolean, IsDate, IsString } from "class-validator";
import { Permission } from "../../permissions/models/permission.model";


export interface Role {
    id: string;
    name: string;
    description?: string;
    isEditable?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    permissions?: Permission[];
}