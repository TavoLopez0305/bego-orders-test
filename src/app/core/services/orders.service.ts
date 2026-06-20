import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  obtenerOrdenes(){
    return this.http.get(`${this.apiUrl}/orders/upcoming`);
  }

  obeteneOrdenDetalle(){
    return this.http.get(`${this.apiUrl}/orders`);
  }
  obtenerOrden(id: string) {
    return this.http.get(
      `${this.apiUrl}/orders/${id}`
    );
  }
}
