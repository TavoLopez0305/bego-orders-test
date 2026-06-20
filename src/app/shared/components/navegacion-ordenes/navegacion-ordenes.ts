import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-navegacion-ordenes',
  imports: [],
  templateUrl: './navegacion-ordenes.html',
  styleUrl: './navegacion-ordenes.css',
})
export class NavegacionOrdenes {

  tabs = [
    {
      id: 'upcoming',
      nombre: 'Upcoming'
    },
    {
      id: 'completed',
      nombre: 'Completed'
    },
    {
      id: 'past',
      nombre: 'Past'
    }
  ];

  tabActiva = signal('upcoming');

  seleccionarTab(tab: string): void {
    this.tabActiva.set(tab);
  }
}