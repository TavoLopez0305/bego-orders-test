import { Component, input, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatosDestinoView } from '../../../pages/ordenes/detalle-orden/detalle-orden';

@Component({
  selector: 'app-tarjeta-datos-destino',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './tarjeta-datos-destino.html',
  styleUrl: './tarjeta-datos-destino.css'
})
export class TarjetaDatosDestino {

  detalle = input.required<DatosDestinoView>();
  tipo = input.required<'pickup' | 'dropoff'>();
  expandido = signal(false);

  toggle(): void {
    this.expandido.update(v => !v);
}
}