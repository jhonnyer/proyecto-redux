import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Cliente } from '../clientes/cliente';
import { AppState } from '../redux/app.state';
import { selectListClientes } from '../redux/selectors/clientes.selectors';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})

export class CursoComponent implements OnInit{
  
  public nombre:string;
  public id:number;

  clientes$:Observable<any> = new Observable();
  
  constructor(
    private activateRoute:ActivatedRoute,
    private _router:Router,
    private store:Store<AppState>
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

      this.clientes$=this.store.select(selectListClientes)
  }

  redirigir(){
    this._router.navigate(['/user/directivas']);
  }

  
}
