import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from 'src/app/clientes/clientes.component';
import { DashboardComponent } from 'src/app/componentes/dashboard/dashboard.component';
import { HomeComponent } from 'src/app/componentes/home/home.component';

const routes: Routes = [
  {path: 'static', component:DashboardComponent,
    children:[
      { path: 'cliente', component: ClientesComponent },
      { path: 'home', component: HomeComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
