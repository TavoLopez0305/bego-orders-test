import { Component, signal, output} from '@angular/core';

@Component({
  selector: 'app-buscador-ordenes',
  imports: [],
  templateUrl: './buscador-ordenes.html',
  styleUrl: './buscador-ordenes.css',
  standalone: true
})
export class BuscadorOrdenes {

  textoBusqueda = signal('');
  busquedaChange = output<string>();

  buscar(event: Event): void {

    const valor =
      (event.target as HTMLInputElement).value;

    // console.log('hijo', valor)
    this.textoBusqueda.set(valor);

    this.busquedaChange.emit(valor);

  }

}