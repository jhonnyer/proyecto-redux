import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, } from '@angular/router';
import  swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class HasRoleGuardGuard implements CanActivate {

  public auth:boolean;
  public rol:string;

  constructor(){
    this.auth=false;
    this.rol="";
  }

  canActivate(route:ActivatedRouteSnapshot) {
    this.rol=getMessage(sessionStorage.getItem("roles") ?? '');
    let roles:string[]=this.rol.split(',');  
    if(roles.includes(route.data['role'])){
          this.auth=true;
        }
        else{
            this.auth=false;
            swal('Error', 'No tienes permiso para acceder a este sitio', 'warning');
        };
    return this.auth;
  }
}


function getMessage(message: string) {
  return message;
}