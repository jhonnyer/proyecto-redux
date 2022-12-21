import { HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, tap } from 'rxjs';
import { Cliente } from 'src/app/clientes/cliente';
import { ClienteService } from 'src/app/clientes/cliente.service';
import { Selector } from 'src/app/models/selector';
import { createCliente, getClientes, loadClientes } from 'src/app/redux/actions/user.actions';
import { saveClienteReduce } from 'src/app/redux/reducers/clientes.reducer';
import { selectListClientes, selectLoading, selectSaveCliente } from 'src/app/redux/selectors/clientes.selectors';
import swal from 'sweetalert2';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  opciones!:Selector[];
  formRegistro:FormGroup;

  loading$:Observable<boolean> = new Observable();
  clientes$:Observable<Cliente>= new Observable();

  httpHeaders: HttpHeaders = new HttpHeaders();
  token = sessionStorage.getItem('token');

  public errores:string[];

  client!:Cliente;

  @Input () Authenticated:boolean=false;
  @Output () isAuthenticated = new EventEmitter<boolean>();

  constructor(private formBuilder:FormBuilder, private store:Store<any>, private clienteService:ClienteService, private router:Router){
    this.formRegistro=this.formBuilder.group({
      username:['',Validators.required],
      identidad:['',Validators.required]
    })
    this.opciones=[
      {item:"Cedula ciudadania", value:"cc"},
      {item:"Tarjeta Identidad", value:"ti"},
      {item:"NIT", value:"nit"},
    ];
    this.httpHeaders = this.httpHeaders.append('Authorization', 'Bearer ' + this.token);
    this.errores=[];
  }
  ngOnInit(){
    this.store.dispatch(
      getClientes()
    )

    // this.clienteService.getClientes(this.httpHeaders).subscribe(
    //   (response:Cliente[]) =>{
    //     this.store.dispatch(loadClientes({
    //       clientes:response
    //     }));
    //   }
    // );

    this.loading$=this.store.select(selectLoading);
    
    this.clienteService.getCliente("71", this.httpHeaders).subscribe(c=>{
      this.client=c;
      this.store.dispatch(createCliente({
        cliente:this.client
      }));
    })

    // this.clientes$.pipe(
    //   map(res=>{
    //     this.client=res as Cliente;
    //     return this.client;
    //   })
    // ).subscribe(
    //   cliente=>{
    //     console.log("clienteNew");
    //     console.log(cliente);
    //     return cliente;
    //   }
    // )
    
  }

  enviar(){
    this.clientes$=this.store.select(selectSaveCliente);

    this.clientes$.subscribe(cliente=>{
      let newCliente=new Cliente(cliente.id,cliente.nombre + " TESTS",cliente.apellido,cliente.createAt,cliente.email,cliente.role,cliente.foto);
      console.log(newCliente);
      this.clienteService.update(newCliente, this.httpHeaders).subscribe(
        cliente => {
        this.router.navigate(['/index/clientes']);
        swal("Cliente actualizado", `El cliente ${cliente.nombre} ha sido actualizado con éxito`, 'success');
      },
        err=>{
          this.errores=err.error.errors as string[];
          console.log('Código del error desde el Backend: '+err.status);
          console.log(err.error.errors);
        }
      )
    })
  }

  registerUser(){
    // console.log(this.formRegistro);
    // console.log(this.formRegistro.value.username);
    // console.log(this.formRegistro.value.identidad);
  }
}
