import { Role } from "../../roles/models/role.model";


export interface User {
    id: string;
    username?: string;
    password?: string;
    fullName?: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    roles?: Role[];
}