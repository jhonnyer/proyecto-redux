import { Cliente } from "src/app/clientes/cliente";

export interface ItemsState {
    loading:boolean,
    clientes:Cliente[];
}

export interface ClienteState {
    loading:boolean,
    cliente:Cliente;
}


export class ClienteReduce{
    constructor(
        public loading:boolean,
        public cliente:Cliente,
        public type:string,
    ){
        
    }
    
}