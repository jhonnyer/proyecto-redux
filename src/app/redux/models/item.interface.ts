import { Cliente } from "src/app/clientes/cliente";

export interface ItemsState {
    loading:boolean,
    clientes:ReadonlyArray<Cliente>;
}

export interface ClienteState {
    loading:boolean,
    cliente:Readonly<Cliente>;
}