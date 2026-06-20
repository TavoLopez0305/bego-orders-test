import { Component, inject, OnInit, signal} from '@angular/core';
import { OrdersService } from '../../../core/services/orders.service';
import { Orden } from '../../../core/models/orden.model';

//componentes 
import { HeaderOrdenes } from '../../../shared/components/header-ordenes/header-ordenes';
import { NavegacionOrdenes } from '../../../shared/components/navegacion-ordenes/navegacion-ordenes';
import { BuscadorOrdenes } from '../../../shared/components/buscador-ordenes/buscador-ordenes';

//-------------------
import { TarjetaOrden } from '../../../shared/components/tarjeta-orden/tarjeta-orden';

@Component({
  selector: 'app-lista-ordenes',
  imports: [HeaderOrdenes,NavegacionOrdenes,BuscadorOrdenes,TarjetaOrden],
  templateUrl: './lista-ordenes.html',
  styleUrl: './lista-ordenes.css',
})
export class ListaOrdenes implements OnInit {

  private readonly orderservice = inject(OrdersService);

  ordenes = signal<Orden[]>([]);

  ngOnInit(): void {
    this.obtnerOrdenes();
  }

  obtnerOrdenes(){
    this.orderservice.obtenerOrdenes()
    .subscribe({
     next: (response: any) =>{
      // console.log(response);

       this.ordenes.set(response.result);

       console.log(this.ordenes);
     },
     error: (error) => {
      console.log(error);
     }
    });
  }
}
