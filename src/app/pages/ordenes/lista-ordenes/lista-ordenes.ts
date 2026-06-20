import { Component, inject, OnInit, signal, computed} from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from '../../../core/services/orders.service';
import { Orden } from '../../../core/models/orden.model';

//componentes 
import { HeaderOrdenes } from '../../../shared/components/header-ordenes/header-ordenes';
import { NavegacionOrdenes } from '../../../shared/components/navegacion-ordenes/navegacion-ordenes';
import { BuscadorOrdenes } from '../../../shared/components/buscador-ordenes/buscador-ordenes';
import { ErrorModal } from '../../../shared/components/error-modal/error-modal';
import { Loading } from '../../../shared/components/loading/loading';
//-------------------
import { TarjetaOrden } from '../../../shared/components/tarjeta-orden/tarjeta-orden';
// utils
import { sanitizarBusqueda } from '../../../shared/utils/texto.util';

@Component({
  selector: 'app-lista-ordenes',
  imports: [HeaderOrdenes,NavegacionOrdenes,BuscadorOrdenes,TarjetaOrden,ErrorModal,Loading],
  templateUrl: './lista-ordenes.html',
  styleUrl: './lista-ordenes.css',
})
export class ListaOrdenes implements OnInit {

  private readonly orderservice = inject(OrdersService);
  private readonly router = inject(Router);

  ordenes = signal<Orden[]>([]);
  textoBusqueda = signal('');
  mostrarError = signal(false);
  mensajeError = signal('');
  loading = signal(true);

  ngOnInit(): void {

    const mensaje =
      localStorage.getItem('error_orden');

    if (mensaje) {

      this.mensajeError.set(mensaje);
      this.mostrarError.set(true);

      localStorage.removeItem('error_orden');

      setTimeout(() => {

        this.mostrarError.set(false);

      }, 3000);

    }

    this.obtnerOrdenes();

}

  obtnerOrdenes(){
    this.loading.set(true);

    this.orderservice.obtenerOrdenes()
    .subscribe({
     next: (response: any) =>{
      // console.log(response);

       this.ordenes.set(response.result);
       setTimeout(() => {
        this.loading.set(false);
      }, 500);

      //  console.log(this.ordenes);
     },
     error: (error) => {
        console.log(error);
        this.loading.set(false);
        this.mensajeError.set(
          'An error occurred while loading the application.'
        );
        this.mostrarError.set(true);
        setTimeout(() => {
          this.mostrarError.set(false);
        }, 3000);
      }
    });
  }

  ordenesFiltradas = computed(() => {
    const texto =
      sanitizarBusqueda(this.textoBusqueda());
      // console.log('texto', texto);

    if (!texto) {
      return this.ordenes();
    }

    return this.ordenes().filter(orden =>

      sanitizarBusqueda(
        orden.order_number ?? ''
      ).includes(texto)

    );

  });
}
