import { Pipe, PipeTransform } from '@angular/core';
import { Cliente } from '../clientes/cliente';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, texto: string): any {
    if(!texto) return value;
    return value.filter((cliente: { id: string | string[]; })=> cliente.id.includes(texto));
  }

}
