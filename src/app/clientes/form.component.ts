import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router'
import  swal from 'sweetalert2';
import { HttpHeaders } from '@angular/common/http';
 
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{

  public cliente: Cliente;
  public titulo:string;
  public errores:string[];
  public httpHeaders:HttpHeaders=new HttpHeaders();
  public token=sessionStorage.getItem('token');

  constructor(private clientService: ClienteService, private router: Router, private activateRoute: ActivatedRoute){
    this.cliente=new Cliente(0, "", "", "","",[],"");
    this.titulo="Crear Cliente";
    this.errores=[];
    this.httpHeaders=this.httpHeaders.append('Authorization','Bearer '+this.token);
  }

  ngOnInit(){
    
    
    
    // console.log("get Token",token);
    this.cargarCliente(this.httpHeaders);
  }

  public cargarCliente(httpHeaders:HttpHeaders): void{
    this.activateRoute.params.subscribe(params=>{
      let id=params['id']
      console.log("ID:"+id);
      if(id){
        this.clientService.getCliente(id, httpHeaders).subscribe((cliente) =>{
           this.cliente=cliente;
           console.log("Cliente"+cliente);
        },
        err=>{
          this.errores=err.error.errors as string[];
          console.log("Error: "+err.errors);
          console.log('Código del error desde el Backend: '+err.status);
        })
      }
    })
  }

  public create():void{
    this.clientService.create(this.cliente, this.httpHeaders).subscribe(
      cliente => {
        this.router.navigate(['/index/clientes']),
        swal('Nuevo cliente', `El cliente ${cliente.nombre} ha sido creado con éxito`, 'success') 
      },
      err=>{
        this.errores=err.error.errors as string[];
        console.log('Código del error desde el Backend: '+err.status);
        console.log(err.error.errors);
      }
    )
  }

  public update() :void{
    this.clientService.update(this.cliente, this.httpHeaders).subscribe(
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
  }

  // public create():void{
  //   this.clientService.create(this.cliente).subscribe(
  //     response => {
  //       this.router.navigate(['/clientes']),
  //       swal('Nuevo cliente', `${response.mensaje}. Nuevo cliente añadido: ${response.cliente.nombre} `, 'success') 
  //     }
  //   )
  // }

  // public update() :void{
  //   this.clientService.update(this.cliente).subscribe(response => {
  //     this.router.navigate(['/clientes']);
  //     swal("Cliente actualizado", `${response.mensaje}. Cliente ${response.cliente.nombre} actualizado con éxito`, 'success');
  //   })
  // }
}
