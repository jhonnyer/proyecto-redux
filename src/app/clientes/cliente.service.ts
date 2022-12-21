import { Injectable } from '@angular/core';
import { Cliente } from './cliente'; 
import { Observable, throwError } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap} from 'rxjs';
import swal from 'sweetalert2';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { Producto } from './Producto';
import { ILogin } from '../models/ilogin';
import { IResponse } from '../models/iresponse';
import { ClienteReduce } from '../redux/models/item.interface';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private UrlEndpoint: string = 'http://localhost:8080/cliente';
  private UrlProducto:string="http://localhost:8080/producto/";
  private UrlLogin:string="http://localhost:8080/auth/login";

  private token = sessionStorage.getItem('token');
  private httpHeaders= new HttpHeaders();
  

  constructor(private http: HttpClient, private router: Router) { 
    this.httpHeaders.append('Content-Type','application/json');
  }


  getProducto(name:string, httpHeaders:HttpHeaders):Observable<Producto>{
    return this.http.get<Producto>(`${this.UrlProducto+"findByNombre"}/${name}`,{headers:httpHeaders})
    .pipe(
      catchError(e=>{
        let error:string[]=[];
        error.push("Producto no se encuentra disponible");
        error.push(e.message);
        console.log("Error");
        console.log(error);  
        if(e.status==400){
          return throwError(error);
        }
        console.log("Mensaje error:"+e.error.mensaje);
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(error);
      })
    );
  }

  getClientes(httpHeaders:HttpHeaders): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.UrlEndpoint+"/listar",{headers:httpHeaders}).pipe(
      tap(response =>{
        // console.log('ClienteService: tap 1');
        // console.log("Response: "+response);
        let clientes=response as Cliente[];
        clientes.forEach(cliente=>{
          // console.log(cliente.nombre);
        })
      }),
      map(response=>{
        let clientes=response as Cliente[];
        return clientes.map(cliente => {
          cliente.nombre= cliente.nombre!=null ? cliente.nombre.toUpperCase() : '';
          // cliente.createAt = formatDate(cliente.createAt,'dd/MM/yyyy', 'en-US')
          // cliente.createAt = formatDate(cliente.createAt,'EEEE dd, MMMM yyyy', 'en-US');
          // cliente.createAt = formatDate(cliente.createAt,'fullDate','en-US');
          // cliente.createAt = formatDate(cliente.createAt,'EEEE dd, MMMM yyyy', 'es');
          return cliente;
        });
      }),
      tap(response =>{
        // console.log('ClienteService: tap 2');
        response.forEach(cliente=>{
          // console.log(cliente.nombre);
        })
      })
    );
  }


  getCliente(id:string, httpHeaders:HttpHeaders): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.UrlEndpoint+"/findOne"}/${id}`, {headers:httpHeaders}).pipe(
      catchError(e => {
        if(e.status==400){
          return throwError(e);
        }
        this.router.navigate(['/clientes'])
        console.log(e.error.mensaje);
        // swal('Error al editar: ', e.error.mensaje, 'error');
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }
  

  getLogin(usuarioLogin: ILogin) : Observable<any>{
    const errorlist:string[]=[];
    return this.http.post<IResponse>(this.UrlLogin, usuarioLogin, {headers:this.httpHeaders}).pipe(
      catchError(e =>{
        errorlist.push(e);
        swal("error", "Usuario o contraseña invalida");
        return errorlist;
      })
    );
  }

  create(cliente: Cliente, httpHeaders:HttpHeaders) : Observable<Cliente>{
    return this.http.post(this.UrlEndpoint+"/save",cliente, {headers:httpHeaders}).pipe(
      map( ( response:any ) => response.cliente as Cliente),
      catchError(e =>{
        if(e.status==400){
          return throwError(e);
        }

        console.log(e.error.mensaje);
        // swal('Error al crear el cliente', e.error.mensaje, 'error');
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }
     

  update(cliente: Cliente, httpHeaders:HttpHeaders) : Observable<Cliente>{
    console.log(cliente);
    return this.http.post(this.UrlEndpoint+"/save",cliente, {headers:httpHeaders}).pipe(
      map( ( response:any ) => response.cliente as Cliente),
      catchError(e =>{
        if(e.status==400){
          return throwError(e);
        }

        console.log(e.error.mensaje);
        // swal('Error al crear el cliente', e.error.mensaje, 'error');
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  // update(cliente: Cliente, httpHeaders:HttpHeaders):Observable<Cliente>{
  //   return this.http.post<any>(`${this.UrlEndpoint+"/save"}/${cliente.id}`, cliente, {headers:httpHeaders}).pipe(
  //     map( ( response:any ) => response.cliente as Cliente),
  //     catchError(e =>{
  //       if(e.status==400){
  //         return throwError(e);
  //       }
  //       console.log(e.error.mensaje);
  //       // swal('Error al editar el cliente', e.error, 'error');
  //       swal(e.error.mensaje, e.error.error, 'error');
  //       return throwError(e);
  //     })
  //   );;
  // }

  // create(cliente: Cliente) : Observable<any>{
  //   return this.http.post<any>(this.UrlEndpoint+"/save",cliente, {headers:this.httpHeaders}).pipe(
  //     catchError(e =>{
  //       console.log(e.error.mensaje);
  //       // swal('Error al crear el cliente', e.error.mensaje, 'error');
  //       swal(e.error.mensaje, e.error.error, 'error');
  //       return throwError(e);
  //     })
  //   );
  // } 

  // update(cliente: Cliente):Observable<any>{
  //   return this.http.put<any>(`${this.UrlEndpoint+"/save"}/${cliente.id}`, cliente, {headers:this.httpHeaders}).pipe(
  //     catchError(e =>{
  //       console.log(e.error.mensaje);
  //       // swal('Error al editar el cliente', e.error, 'error');
  //       swal(e.error.mensaje, e.error.error, 'error');
  //       return throwError(e);
  //     })
  //   );;
  // }
  

  delete(id:number, httpHeaders:HttpHeaders): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.UrlEndpoint+"/delete"}/${id}`,{headers:httpHeaders})
  }


    // getClientes(): Observable<Cliente[]>{
  //   return this.http.get(this.UrlEndpoint+"/listar").pipe(
  //     map(response=> response as Cliente[])
  //   );
  // }
}
