import { ActionReducerMap } from "@ngrx/store";
import { ClienteState, ItemsState } from "./models/item.interface";
import { clienteReduce, saveClienteReduce } from "./reducers/clientes.reducer";

export interface AppState{
    clienteList:ItemsState; //puede inicializar mas reducers
    cliente:ClienteState;
    // productoList:ItemsState; //puede inicializar mas reducers
    // userList:ItemsState; //puede inicializar mas reducers
}

export const ROOT_REDUCERS:ActionReducerMap<AppState> ={
    clienteList:clienteReduce,
    cliente:saveClienteReduce,
}