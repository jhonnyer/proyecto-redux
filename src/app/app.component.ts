import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Bienvenido a Angular';

  IsAuthenticated=false;

  curso : string = 'Curso Básico de Angular'; //Definir variables de este tipo lo hace mas robusto
  profesor: string = "Jhonnyer Fernando Galindez"
}
