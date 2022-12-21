import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(){
  }

  canActivate() {
    if(sessionStorage.getItem("autenticado")=="true"){  
      return true;
    }
    return false;
  }
}
