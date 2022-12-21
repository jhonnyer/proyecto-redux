export class Cliente {
    constructor(
        public id?: number, 
        public nombre?: string, 
        public apellido?: string, 
        public createAt?: string, 
        public email?:string, 
        public role?:string[],
        public foto?:string){}
}
