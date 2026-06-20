import { Component, inject, input,computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Orden } from '../../../core/models/orden.model';
import { Destino } from '../../../core/models/destino.model';
//utils
import {
  formatearFecha,
  formatearHora
} from '../../../shared/utils/fecha.util';

import {
  cortarTexto
} from '../../../shared/utils/texto.util';

@Component({
  selector: 'app-tarjeta-orden',
  imports: [CommonModule],
  templateUrl: './tarjeta-orden.html',
  styleUrl: './tarjeta-orden.css',
  standalone: true,
})
export class TarjetaOrden {

  orden = input.required<Orden>();
  readonly formatearFecha = formatearFecha;
  readonly formatearHora = formatearHora;
  readonly cortarTexto = cortarTexto;

  private readonly router = inject(Router);

  tiposTransporte: Record<string, string> = {
    FTL: 'bi-truck',
    FCL: 'bi-truck-front',
    LTL: 'bi-truck'
  };

  tipoTransporte = computed(() =>
    this.orden()?.type || 'En proceso'
  );

  estatus = computed(() =>
    this.orden()?.status_string || 'Pendiente'
  );

  iconoTransporte = computed(() => {

    const tipo = this.tipoTransporte();

    return this.tiposTransporte[tipo] || 'bi-truck';

  });

  colorEstado = computed(() => {

    const clase = this.orden()?.status_class;

    switch (clase) {

      case 'blue-dot-bg':
        return '#0C7DED';

      case 'grey-dot-bg':
        return '#969798';

      default:
        return '#969798';
    }

  });

  pickup = computed<Destino | undefined>(() =>
  this.orden().destinations[0]
  );

  dropoff = computed<Destino | undefined>(() =>
    this.orden().destinations[1]
  );
  verDetalle(): void {
    this.router.navigate([
      '/ordenes',
      this.orden()._id
    ]);
  }

}
