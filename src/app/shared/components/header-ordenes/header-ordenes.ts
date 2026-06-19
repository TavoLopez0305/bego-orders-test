import { Component,inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-ordenes',
  imports: [],
  templateUrl: './header-ordenes.html',
  styleUrl: './header-ordenes.css',
  standalone:true
})
export class HeaderOrdenes {

  private readonly router = inject(Router);

  regresar(): void {
    window.history.back();
  }

  mostrarNotificaciones(): void {
    console.log('Abrir panel de notificaciones');
  }

}
