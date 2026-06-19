import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OrdersService } from './core/services/orders.service';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private readonly ordersService = inject(OrdersService);

  constructor() {
    this.ordersService.obtenerOrdenes()
      .subscribe({
        next: (data) => console.log('UPCOMING', data),
        error: (error) => console.error(error)
      });
  }
}
