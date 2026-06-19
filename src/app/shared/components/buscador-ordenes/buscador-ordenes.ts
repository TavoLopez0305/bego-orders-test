import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-buscador-ordenes',
  imports: [],
  templateUrl: './buscador-ordenes.html',
  styleUrl: './buscador-ordenes.css',
  standalone: true
})
export class BuscadorOrdenes {

  textoBusqueda = signal('');

  buscar(event: Event): void {

    const valor = (event.target as HTMLInputElement).value;

    this.textoBusqueda.set(valor);

    console.log(valor);

  }

}