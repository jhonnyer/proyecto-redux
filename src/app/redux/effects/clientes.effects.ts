import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, Observable } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { Cliente } from 'src/app/clientes/cliente';
import { ClienteService } from 'src/app/clientes/cliente.service';

@Injectable()
export class ClienteEffects {
  httpHeaders: HttpHeaders = new HttpHeaders();
  token = sessionStorage.getItem('token');
  constructor(
    private actions$: Actions,
    private clienteService: ClienteService,
    private route: Router
  ) {
    this.httpHeaders = this.httpHeaders.append(
      'Authorization',
      'Bearer ' + this.token
    );
  }

  cliente$:Observable<Cliente>= new Observable();

  loadClientes$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Cliente List] Load clientes'), //Accion definida en el user.actions.ts
      mergeMap(() =>
        this.clienteService.getClientes(this.httpHeaders).pipe(
          map((clientes) => ({
            type: '[Cliente List] Load success',
            clientes,
          })), //Clientes hace referencia a el payload
          catchError(() => EMPTY)
        )
      )
    )
  );

  createCliente$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Cliente create] Add Cliente'), //Accion definida en el user.actions.ts
      mergeMap(cliente =>
        this.clienteService.update(cliente, this.httpHeaders)
        .pipe(
          map((clientes) => ({
            type: '[Cliente List] Load Cliente',
            clientes,
          })), //Clientes hace referencia a el payload
          catchError(() => EMPTY)
        )
      )
    )
  );


  
}
