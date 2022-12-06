import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteService } from './clientes/cliente.service';
import { RouterModule, Routes } from '@angular/router'; 
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './clientes/form.component';

import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es';
import {routing, appRoutingProviders} from './Routing/app.routing';
import { CursoComponent } from './curso/curso.component';

//Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  //se añade cuando se instala angular Material
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
//angular Material Buscador
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
//Ractividad Formularios Angular
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SearchProductoComponent } from './search-producto/search-producto.component';
import { SearchPipe } from './pipes/search.pipe';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

registerLocaleData(localeES, 'es');

// const routes: Routes=[
//   {path: '', redirectTo: '/clientes', pathMatch: 'full'},  //para que haga match full con la ruta completa
//   {path: 'directivas',component: DirectivaComponent},
//   {path: 'clientes', component: ClientesComponent},
//   {path: 'clientes/form', component: FormComponent},
//   {path: 'clientes/form/:id', component: FormComponent}
// ]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent,
    FormComponent,
    CursoComponent,
    SearchProductoComponent,
    SearchPipe,
    LoginComponent,
    HomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    routing,
    BrowserAnimationsModule,
    // RouterModule.forRoot(routes)
    //Angular Material
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    //Buscador Angular material
    MatFormFieldModule,
    MatInputModule,
    //Reactividad formulario Angular
    ReactiveFormsModule
  ],
  providers: [
    ClienteService, 
    {provide: LOCALE_ID, useValue:'es'},
    appRoutingProviders 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
