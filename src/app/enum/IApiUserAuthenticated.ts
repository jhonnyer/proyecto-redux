import { ROLES_ENUM } from "./roles.enum";

export interface IApiUserAuthenticated{
    fullname:string;
    age:number;
    token:string;
    role:ROLES_ENUM;
}