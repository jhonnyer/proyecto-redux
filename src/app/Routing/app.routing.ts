//importar modulos del routing de Angular
import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule, Route } from "@angular/router";

//importamos componentes
import { DirectivaComponent } from "../directiva/directiva.component";
import { ClientesComponent } from "../clientes/clientes.component";
import { FormComponent } from "../clientes/form.component";
import { CursoComponent } from "../curso/curso.component";
import { LoginComponent } from "../login/login.component";
import { LoginGuard } from "../guardas/login.guard";
import { HomeComponent } from "../componentes/home/home.component";
import { HasRoleGuardGuard } from "../guardas/has-role-guard.guard";
import { CanLoadGuard } from "../guardas/can-load.guard";


//Creamos Arrays de rutas
const appRoutes: Routes=[
    {path: '', redirectTo: '/', pathMatch: 'full'},  //para que haga match full con la ruta completa
    {path: 'login', component: LoginComponent},
    {path: 'index',
        children:[
            {path: 'clientes', component: ClientesComponent},
            {path: 'clientes/form', component: FormComponent},
            {path: 'clientes/form/:id', component: FormComponent}
        ], 
        canActivate:[LoginGuard, HasRoleGuardGuard], 
        data: {
            role:'ROLE_ADMIN'
        }
    },
    { path: 'user',
        children:[
            {path: 'directivas', component:DirectivaComponent},
            {path: 'directivas/:nombre',component: CursoComponent},
            {path: 'directivas/:nombre/:id',component: CursoComponent},
            {path: 'cursos',component: CursoComponent}
        ], 
        canActivate:[LoginGuard, HasRoleGuardGuard],
        data: {
            role:'ROLE_USER'
        }
    },
    { path: 'dashboard', loadChildren:() => import('../modulos/dashboard/dashboard.module').then (x=> x.DashboardModule), 
    canActivate:[LoginGuard, HasRoleGuardGuard], 
    data: {
        role:'ROLE_ADMIN'
    }},
    {path: '**', component: HomeComponent}
];

//Exportar el modulo del router
export const appRoutingProviders: any[]=[] //Servicio del routing

export const routing:ModuleWithProviders<Route> = RouterModule.forRoot(appRoutes); //exportamos las rutas 