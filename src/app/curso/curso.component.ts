import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Cliente } from '../clientes/cliente';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})

export class CursoComponent implements OnInit{
  
  public nombre:string;
  public id:number;
  
  constructor(
    private activateRoute:ActivatedRoute,
    private _router:Router
  ){
    this.nombre="";
    this.id=0;
  }

  ngOnInit() {
      this.activateRoute.params.subscribe(
        (params: Params) =>{
          this.nombre=params['nombre'];
          this.id=params['id'];
          console.log(params);
        }
      )
  }

  redirigir(){
    this._router.navigate(['/directivas']);
  }

  
}
