// import { ItemsState } from '../models/item.interface';
import { createSelector } from '@ngrx/store'  //Para crear el selector
import { AppState } from '../app.state'
import { ClienteState, ItemsState } from '../models/item.interface';

//Selector que tiene relacion con la propiedad clienteList del app.state.ts
export const selectClientesFeature = (state:AppState)=> state.clienteList;  //Padre
export const selectSaveClienteFeature = (state: AppState) => state.cliente;
// export const selectProductosFeature = (state:AppState)=> state.clienteList;

// Selector para ver el listado de cliente   - HIJO
export const selectListClientes = createSelector (
    selectClientesFeature,
    // selectProductosFeature
    (state: ItemsState) => state.clientes
)

//Selector para ver el loading
export const selectLoading = createSelector (
    selectClientesFeature,
    // selectProductosFeature
    (state: ItemsState) => state.loading
)


//Selector para ver el loading
export const selectSaveCliente = createSelector (
    selectSaveClienteFeature,
    // selectProductosFeature
    (state: ClienteState) => state.cliente
)