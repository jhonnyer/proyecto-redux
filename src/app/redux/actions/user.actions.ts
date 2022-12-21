import { createAction, props } from '@ngrx/store'  //Metodos iniciales para crear una acción
import { Cliente } from 'src/app/clientes/cliente'
import { ClienteReduce } from '../models/item.interface'

export const getClientes=createAction(
    '[Cliente List] Load clientes'   //Type correspondiente a la acción
)

export const loadClientes=createAction(
    '[Cliente List] Load success',
    props<{clientes:Cliente[]}>() //Metodo donde definimos el tipado de datos de la respuesta  
)

export const createCliente=createAction(
    '[Cliente create] Add Cliente',
    props<{cliente:ClienteReduce}>() //Metodo donde definimos el tipado de datos de la respuesta  
)

export const loadCliente=createAction(
    '[Cliente create] Load Cliente',
    props<{cliente:ClienteReduce}>()
)