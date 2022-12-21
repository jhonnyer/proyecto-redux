import { createReducer, on } from '@ngrx/store';
import { Cliente } from 'src/app/clientes/cliente';
import { createCliente, getClientes, loadCliente, loadClientes } from '../actions/user.actions';
import { ClienteReduce, ItemsState } from '../models/item.interface';

//Estado inicial, inicializacion de las variables

export const initialState: ItemsState = { loading: false, clientes: [] }; //inicializamos el loadin como false y el array de clientes vacio
export const clienteState: ClienteReduce= { loading:false, cliente: new Cliente(0,"","","","",[],""), type:''}

export const clienteReduce = createReducer(
  initialState, //pasamos el estado inicial
  on(getClientes, (state) => {
    //implementa las diferentes acciones, puede tener muchas
    return { ...state, loading: true }; //Con los puntos creamos un clon del nuevo estado y le añadimos en loading
  }),
  on(loadClientes, (state, { clientes }) => {
    //Mejora funcion siguiente, se maneja directamente por restructuracion en valor de clientes
    // console.log(clientes);
    return { ...state, loading: false, clientes };
  })
);


export const saveClienteReduce = createReducer(
    clienteState,
    on(createCliente, (state, segundo) =>{   //Cliente es el payload que se esta recibiendo cuando se invoca la acción
        console.log("segundo.cliente");  
        console.log(segundo.cliente.cliente);
        let clienteReduce=new ClienteReduce(true, segundo.cliente.cliente, segundo.cliente.type);
        let cliente=clienteReduce.cliente;
        return{...state, cliente }
    }),
    // on(loadCliente,  (state, { cliente }) =>{   //Cliente es el payload que se esta recibiendo cuando se invoca la acción
    //   // console.log(cliente);
    //   return{...state, cliente} 
    // })
  );





// on(loadClientes, (state, segundo )=>{  //Segundo es el argumento donde van a estar la lista de clientee en este caso
//      console.log(segundo.clientes);
//      return { ... state, loading:true};
// })
