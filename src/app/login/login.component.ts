import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClienteService } from '../clientes/cliente.service';
import { ILogin } from '../models/ilogin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy{
  public formLogin:FormGroup;
  public subRef$: Subscription=new Subscription();
  public errores:string[]=[];

  constructor(
      private clientService: ClienteService,
      private formBuilder: FormBuilder,
      private http: HttpClient, 
      private router: Router){
      this.formLogin=formBuilder.group({
        username:['', Validators.required],
        password:['',Validators.required]
      })
     }
  ngOnInit(): void {
  }

  Login(){
    const usuarioLogin:ILogin={
      username:this.formLogin.value.username,
      password:this.formLogin.value.password
    }

    console.log(usuarioLogin);
    this.subRef$=this.clientService.getLogin(usuarioLogin).subscribe(
      response => {
        const token=response.body.response.token;
        console.log("Token: "+token);
        sessionStorage.setItem('token',token);
      },
      err=>{
        this.errores=err.error.errors as string[];
        console.log('Código del error desde el Backend: '+err.status);
        console.log(err.error.errors);
      }
    )
  }

  ngOnDestroy(): void {
      if(this.subRef$){
        this.subRef$.unsubscribe();
      }
  }
}
