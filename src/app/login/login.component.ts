import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClienteService } from '../clientes/cliente.service';
import { ILogin } from '../models/ilogin';
import { IResponse } from '../models/iresponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

@Injectable()
export class LoginComponent implements OnInit, OnDestroy{
  public formLogin:FormGroup;
  public subRef$: Subscription=new Subscription();
  public errores:string[]=[];
  public token:string;

  public usuarioLogin:ILogin;
  public auth:boolean=false;

  public response: IResponse;

  
  @Input () Authenticated:boolean=false;
  @Output () isAuthenticated = new EventEmitter<boolean>();

  public aut:boolean;

  constructor(
      formBuilder: FormBuilder, private clientService: ClienteService, private router: Router){
          this.formLogin=formBuilder.group({
          username:['', Validators.required],
          password:['',Validators.required]
        });
        this.token="";
        this.usuarioLogin={ username:"", password:""};
        this.aut=false;
        this.response=new IResponse([],"1","2");
     }
  ngOnInit() {
  }

  Login(){
    this.usuarioLogin={ username:this.formLogin.value.username, password:this.formLogin.value.password}
    this.clientService.getLogin(this.usuarioLogin).subscribe(
      response => {
        if(response.status>400){
          console.log("FAIL LOGIN");
          this.Authenticated=false;
          sessionStorage.setItem('autenticado','false');
          sessionStorage.setItem('roles', JSON.stringify(response.roles));
          this.isAuthenticated.emit(this.Authenticated);
          this.router.navigate(['/']);
        }else{
          console.log("SUCCESSFULL LOGIN");
          this.response=response;
          this.token=response.token;
          sessionStorage.setItem('token',this.token);
          sessionStorage.setItem('roles', response.roles);
          sessionStorage.setItem('autenticado','true');
          this.Authenticated=true;
          console.log(this.Authenticated);
          this.isAuthenticated.emit(this.Authenticated);
          this.router.navigate(['/home']);
        }
      }
    )
  }

  ngOnDestroy(): void {
      if(this.subRef$){
        this.subRef$.unsubscribe();
      }
  }

}
