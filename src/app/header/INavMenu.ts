export interface INavMenu{
    title:string;
    links:{
        name:string;
        link?:string;
        method?:() => any;
        permission?:Permissions;
    }[]
}