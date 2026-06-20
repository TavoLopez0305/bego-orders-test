import { Component, computed, input,output} from '@angular/core';

@Component({
  selector: 'app-tarjeta-resumen-orden',
  standalone: true,
  imports: [],
  templateUrl: './tarjeta-resumen-orden.html',
  styleUrl: './tarjeta-resumen-orden.css'
})
export class TarjetaResumenOrden  {

  detalle = input.required<any>();
  seleccionarDestino = output<'pickup' | 'dropoff'>();

  obtenerColorEstado(estado: string): string {
    const colores: Record<string, string> = {
      'Accepted': '#0C7DED',
      'En espera': '#8B8B8B',
      'On hold': '#8B8B8B',
      'Completed': '#22C55E'
    };

    return colores[estado] ?? '#8B8B8B';
  }

}