import { createAction, props } from '@ngrx/store'  //Metodos iniciales para crear una acción
import { Cliente } from 'src/app/clientes/cliente'

export const getClientes=createAction(
    '[Cliente List] Load clientes'   //Type correspondiente a la acción
)

export const loadClientes=createAction(
    '[Cliente List] Load success',
    props<{clientes:Cliente[]}>() //Metodo donde definimos el tipado de datos de la respuesta  
)

export const createCliente=createAction(
    '[Cliente create] Add Cliente',
    props<{cliente:Cliente}>() //Metodo donde definimos el tipado de datos de la respuesta  
)