import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2';
import { tap } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

// Librerias de Angular Material
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
//libreria para ordenar los datos
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})

export class ClientesComponent implements OnInit, AfterViewInit {

  public clientes:Cliente[]=[];

  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'email','fecha','editar','eliminar'];

  sortedData: Cliente[];
  dataSource:MatTableDataSource<Cliente>;

  constructor(private clienteService : ClienteService){
    this.sortedData=this.clientes.slice();
    this.dataSource=new MatTableDataSource<Cliente>([]);
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort=this.sort;
  }
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  sortData(sort: Sort) {
    const data = this.clientes.slice();
    if (!sort.active || sort.direction === '') {
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return this.compare(a.id, b.id, isAsc);
        case 'nombre':
          return this.compare(a.nombre, b.nombre, isAsc);
        default:
          return 0;
      }
    });

    this.dataSource=new MatTableDataSource<Cliente>(this.clientes);
    this.dataSource.paginator=this.paginator;
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }


  // clientela:Cliente[] = [
  //   {id:1, nombre:'jhonnyer',apellido: "Galindez",email:'jhonnyerg@unicauca.edu.co',createAt:"2022-03-10",foto:""}
  // ];
  
  ngOnInit(){
    let httpHeaders:HttpHeaders=new HttpHeaders();
    // const token=sessionStorage.getItem('token');
    const token="eyJhbGciOiJIUzI1NiJ9.eyJhdXRob3JpdGllcyI6Ilt7XCJhdXRob3JpdHlcIjpcIlJPTEVfVVNFUlwifV0iLCJzdWIiOiJqaG9ubnllciIsImlhdCI6MTY3MDAzMzkxOCwiZXhwIjoxNjcyNjI1OTE4fQ.3xJTTDrBov3B8wYwq8H1UE1yTI34ZpXBGLi-y2vBKj0";
    httpHeaders=httpHeaders.append('Authorization','Bearer '+token);
    console.log("get Token",token);

    this.clienteService.getClientes(httpHeaders).pipe(
      tap(clientes=>{
          console.log('ClienteComponent: tap 3' )
          clientes.forEach(cliente => {
          console.log(cliente.nombre);
        })
      })
    )
    .subscribe(
      (clientes)=>{
        this.clientes=clientes;
        if(clientes.length>0){
          this.dataSource.data=clientes;
        }
      }
    );
  }

  delete(cliente:Cliente):void{
    swal({
      title:'Estas seguro?',
      text: `Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
      type:'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      confirmButtonClass:'btn btn-success',
      cancelButtonClass:'btn btn-danger',
      buttonsStyling:false,
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.clienteService.delete(cliente.id).subscribe(
          response=>{
            this.clientes=this.clientes.filter(cli => cli !==cliente)  //quitar del listado clientes, el objeto que se elimino para que se actualice de forma automatica. 
            this.dataSource.data=this.clientes;
            swal(
              'Cliente Eliminado!',
              `Cliente ${cliente.nombre} eliminado con éxito`,
              'success'
            )
          } 
        )
      }})
  }
  
}


// export interface ClientElement {
//   id: number;
//   nombre: string;
//   apellido: number;
//   createAt:string;
//   email: string;
// }
