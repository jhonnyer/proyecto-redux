//importar modulos del routing de Angular
import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule, Route } from "@angular/router";

//importamos componentes
import { DirectivaComponent } from "../directiva/directiva.component";
import { ClientesComponent } from "../clientes/clientes.component";
import { FormComponent } from "../clientes/form.component";
import { CursoComponent } from "../curso/curso.component";
import { LoginComponent } from "../login/login.component";


//Creamos Arrays de rutas
const appRoutes: Routes=[
    {path: '', redirectTo: '/login', pathMatch: 'full'},  //para que haga match full con la ruta completa
    {path: 'directivas',component: DirectivaComponent},
    {path: 'login', component: LoginComponent},
    {path: 'directivas/:nombre',component: CursoComponent},
    {path: 'directivas/:nombre/:id',component: CursoComponent},
    {path: 'cursos',component: CursoComponent},
    {path: 'clientes', component: ClientesComponent},
    {path: 'clientes/form', component: FormComponent},
    {path: 'clientes/form/:id', component: FormComponent},
    {path: '**', component: DirectivaComponent}
];

//Exportar el modulo del router
export const appRoutingProviders: any[]=[] //Servicio del routing

export const routing:ModuleWithProviders<Route> = RouterModule.forRoot(appRoutes); //exportamos las rutas 