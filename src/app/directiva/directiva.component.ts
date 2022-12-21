import { Component, DoCheck, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { listaCurso } from './listCursos';
import { Autor } from './autor';
import { Vehiculo } from './Vehiculo';
import { ClienteService } from '../clientes/cliente.service';
import { Cliente } from '../clientes/cliente';
import { Producto } from '../clientes/Producto';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
  styleUrls: ['./directiva.component.css']
})
export class DirectivaComponent implements OnInit, DoCheck, OnDestroy{

  public listaCurso: string[];
  public autorName: string; 
  public autorApellido: string; 
  public vehiculos:Array<Vehiculo>;
  public habilitar: boolean;
  public textForm:string;

  public producto!:Producto;
  public filtro_Valor:string="";
  public errores:string[];

  // @Input () Authenticated:boolean=false;
  // @Output () isAuthenticated = new EventEmitter();


  httpHeaders: HttpHeaders = new HttpHeaders();
  token = sessionStorage.getItem('token');
  
  constructor(private clientService: ClienteService,){
    this.vehiculos=[
      new Vehiculo("Automovil","Mazda", "Negro", "45000000"),
      new Vehiculo("Camioneta","BMW", "Negro", "85000000"),
    ]
    this.listaCurso=listaCurso;
    this.autorName=Autor.nombre;
    this.autorApellido=Autor.apellido;
    this.habilitar=true;
    this.textForm="";
    this.errores=[];
    this.httpHeaders = this.httpHeaders.append('Authorization', 'Bearer ' + this.token);
  }
  ngOnInit(): void {
  }

  setHabilitar(): void{
    this.habilitar = (this.habilitar==true) ? false: true;
  }

  ngDoCheck(): void {
    console.log("DoCheck ejecutado");
  }

  ngOnDestroy(): void {
      console.log("Componente eliminado")
  }

  getTexto(){
    alert(this.textForm);
  }

  addTexto(){
    this.listaCurso.push(this.textForm);
  }

  borrarCurso(index:number){
    this.listaCurso.splice(index,1);
  }

  mostrarTextoPresionado(){
    console.log(this.textForm);
  }

  
  handleSearch(value:string){
    this.filtro_Valor=value;
    console.log(value);
    this.clientService.getProducto(value, this.httpHeaders).subscribe(
      producto => {
        this.producto=producto;
        console.log(producto);
      },
      err=>{
        console.log("errores: ")
        this.errores=err as string[];
        console.log(this.errores);
      }
    );
    
  };
}
