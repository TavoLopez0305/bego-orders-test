import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-tarjeta-timeline-orden',
  imports: [],
  templateUrl: './tarjeta-timeline-orden.html',
  styleUrl: './tarjeta-timeline-orden.css',
})
export class TarjetaTimelineOrden  {

  detalle = input.required<any>();
  mostrarTodo = signal(false);

  obtenerPuedeRastrear(
    estados: { nombre:string; activo:boolean }[]
  ): boolean {

    const estadosActivos =
      estados.filter(x => x.activo).length;

    return estadosActivos >= 3;
  }

  rastrearOrden(): void {

    console.log('Track Order');

  }
  toggleMostrarTodo(): void {

  this.mostrarTodo.update(valor => !valor);

  }

  estadosVisibles() {
    return this.mostrarTodo()
      ? this.detalle().estados
      : this.detalle().estados.slice(0, 4);

  }

}