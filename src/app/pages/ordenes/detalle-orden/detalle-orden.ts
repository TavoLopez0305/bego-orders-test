import { Component, inject, OnInit, signal,computed } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
//services 
import { OrdersService } from '../../../core/services/orders.service';

// componentes
import { HeaderOrdenes } from '../../../shared/components/header-ordenes/header-ordenes';
import { Loading } from '../../../shared/components/loading/loading';
import { TarjetaResumenOrden } from '../../../shared/components/tarjeta-resumen-orden/tarjeta-resumen-orden';
import { TarjetaTimelineOrden } from '../../../shared/components/tarjeta-timeline-orden/tarjeta-timeline-orden';
import { TarjetaDatosDestino } from '../../../shared/components/tarjeta-datos-destino/tarjeta-datos-destino';
export interface DatosDestinoView {
  nombre: string;
  direccion: string;
  estado: string;

  telefono: string;
  correo: string;

  fechaInicio: number;
  fechaFin?: number;

  codigoPostal: number;
}

export interface ResumenOrdenView {

  referencia: string;
  numeroOrden: string;

  pickup: DatosDestinoView;

  dropoff: DatosDestinoView;
}

export interface TimelineOrdenView {

  foto: string;

  estados: {
    nombre: string;
    activo: boolean;
  }[];

  puedeRastrear: boolean;
}


@Component({
  selector: 'app-detalle-orden',
  imports: [CommonModule,
            HeaderOrdenes,
            Loading,
            TarjetaResumenOrden,
            TarjetaTimelineOrden,
            TarjetaDatosDestino
  ],
  templateUrl: './detalle-orden.html',
  styleUrl: './detalle-orden.css',
})
export class DetalleOrden implements OnInit{

  private readonly route = inject(ActivatedRoute);
  private readonly orderService = inject(OrdersService);
  private readonly router = inject(Router);

  idOrden = '';
  detalleOrden = signal<any>(null);
  loading = signal(true);
  error = signal(false);

  resumenOrden = signal<ResumenOrdenView | null>(null);
  timelineOrden = signal<TimelineOrdenView | null>(null);
  destinoSeleccionado = signal<'pickup' | 'dropoff'>('pickup');

  ngOnInit(): void {

    this.idOrden =this.route.snapshot.paramMap.get('id') ?? '';
      this.obtenerDetalle();
  }
  obtenerDetalle(): void {
    this.loading.set(true);

    this.orderService.obeteneOrdenDetalle()
      .subscribe({
        next: (response: any) => {
        const detalle = response.result;


        if (!detalle?._id) {
          this.mostrarError();
          return;
        }

        if (detalle._id !== this.idOrden) {
          this.mostrarError();
          return;
        }
        const resumen: ResumenOrdenView = {
        referencia: detalle.reference_number,

        numeroOrden: detalle.order_number,
          pickup: {

            nombre: detalle.destinations?.[0]?.contact_info?.name ?? '',
            direccion: detalle.destinations?.[0]?.address ?? '',
            estado: detalle.destinations?.[0]?.status_string ?? '',

            telefono: detalle.destinations?.[0]?.contact_info?.telephone ?? '',
            correo: detalle.destinations?.[0]?.contact_info?.email ?? '',

            fechaInicio: detalle.destinations?.[0]?.startDate ?? 0,
            fechaFin: detalle.destinations?.[0]?.endDate ?? 0,

            codigoPostal: detalle.destinations?.[0]?.zip_code ?? 0
          },

          dropoff: {

            nombre: detalle.destinations?.[1]?.contact_info?.name ?? '',
            direccion: detalle.destinations?.[1]?.address ?? '',
            estado: detalle.destinations?.[1]?.status_string ?? '',

            telefono: detalle.destinations?.[1]?.contact_info?.telephone ?? '',
            correo: detalle.destinations?.[1]?.contact_info?.email ?? '',

            fechaInicio: detalle.destinations?.[1]?.startDate ?? 0,
            fechaFin: detalle.destinations?.[1]?.endDate ?? 0,

            codigoPostal: detalle.destinations?.[1]?.zip_code ?? 0
          }
        };
        const timeline: TimelineOrdenView = {
          foto: detalle.driver?.thumbnail || '/assets/img/avatar-default.jpg',
          estados: [
            ...(detalle.status_list?.pickup ?? []).map((estado: any) => ({
              nombre: estado.status,
              activo: estado.active
            })),
            ...(detalle.status_list?.dropoff ?? []).map((estado: any) => ({
              nombre: estado.status,
              activo: estado.active
            }))
          ],
          puedeRastrear: detalle.status >= 3
        };

        this.resumenOrden.set(resumen);
        this.timelineOrden.set(timeline);
        this.detalleOrden.set(detalle);

        // dejamos el loader visible 1 segundo más
        setTimeout(() => {
          this.loading.set(false);
        }, 1000);

      },
        error: () => {
          this.mostrarError();
        }
      });
  }

  private mostrarError(): void {
  localStorage.setItem(
    'error_orden',
    'The order information could not be retrieved. Please try again later.'
  );

  this.router.navigate(['/ordenes']);

}

  destinoActual = computed(() => {

    const resumen = this.resumenOrden();
    if (!resumen) {
      return null;
    }

    return this.destinoSeleccionado() === 'pickup'
      ? resumen.pickup
      : resumen.dropoff;

  });

}
