import { Component, Input, OnInit } from '@angular/core';
import { Cliente } from './clientes/cliente';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  

  Authenticated:boolean
  title = 'Bienvenido a Angular';
  curso : string = 'Curso Básico de Angular'; //Definir variables de este tipo lo hace mas robusto
  profesor: string = "Jhonnyer Fernando Galindez"

  public data:Array<Cliente>=[];
  constructor(){
    this.Authenticated=false;
    this.data=[
      {
        id: 1, 
        nombre: "Jhonnyer", 
        apellido: "Galindez", 
        createAt: "", 
        email:"jhonnyer@unicauca.edu.co", 
        role:["ROLE_ADMIN"],
        foto:""
      }
    ]
  }

  ngOnInit(): void {
  }

  
}
