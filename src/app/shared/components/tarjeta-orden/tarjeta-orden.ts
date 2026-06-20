import { Component, inject, input,computed,OnInit, OnDestroy, signal  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Orden } from '../../../core/models/orden.model';
import { Destino } from '../../../core/models/destino.model';
//utils
import {formatearFecha,formatearHora} from '../../../shared/utils/fecha.util';
import {cortarTexto} from '../../../shared/utils/texto.util';

@Component({
  selector: 'app-tarjeta-orden',
  imports: [CommonModule],
  templateUrl: './tarjeta-orden.html',
  styleUrl: './tarjeta-orden.css',
  standalone: true,
})
export class TarjetaOrden implements OnInit, OnDestroy  {

  orden = input.required<Orden>();
  readonly formatearFecha = formatearFecha;
  readonly formatearHora = formatearHora;
  readonly cortarTexto = cortarTexto;

  private readonly router = inject(Router);

  ahora = signal(Date.now());
  private intervalo?: number;

  ngOnInit(): void {
    this.intervalo = window.setInterval(() => {
      this.ahora.set(Date.now());
    }, 1000);

  }

  ngOnDestroy(): void {
    clearInterval(this.intervalo);
  }

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

  tiempoRestante = computed(() => {
    const fechaPickup = this.pickup()?.start_date;
    if (!fechaPickup) {
      return 0;
    }
    const inicio = new Date(fechaPickup).getTime();
    return inicio - this.ahora();
  });

  puedeNavegar = computed(() => {
    const fechaPickup = this.pickup()?.start_date;
    if (!fechaPickup) {
      return false;
    }
    return new Date(fechaPickup).getTime() <= Date.now();

  });

  contador = computed(() => {
    const restante = this.tiempoRestante();
    if (restante <= 0) {
      return '00:00:00';
    }
    const horas = Math.floor(restante / 1000 / 60 / 60);
    const minutos = Math.floor(
      (restante / 1000 / 60) % 60
    );
    const segundos = Math.floor(
      (restante / 1000) % 60
    );
    return `${horas.toString().padStart(2,'0')}:${minutos.toString().padStart(2,'0')}:${segundos.toString().padStart(2,'0')}`;
  });

  navegar(): void {
    console.log('Navigate');
  }
}
