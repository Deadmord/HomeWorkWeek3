import { AppError, Role } from "./enums";
import { Request } from 'express';

export interface entityWithId {
    id: number;
}
export interface store extends entityWithId {
    store_title: string;
    store_address: string;
    manager_id: number;
}
export interface product extends entityWithId{
    product_title: string;
    product_categories: string;
}

export interface systemError {
    key: AppError;
    code: number;
    message: string;
}
export interface sqlParameter {
    name: string;
    type: any;
    value: string | number;
}
export interface authenticationToken {
    userData: jwtUserData;
}
export interface jwtUserData {
    userId: number;
    roleId: Role;
}
export interface AuthenticatedRequest extends Request, authenticationToken { }
export interface user extends entityWithId {
    firstName: string;
    lastName: string;
    login?: string;
    password?: string;
    position?: string;
    role?: string;
    create_date?: Date;
    update_date?: Date;
    supervisor?: string;
}