import { Routes } from '@angular/router';
import { ListaOrdenes } from './pages/ordenes/lista-ordenes/lista-ordenes';
import { NotFound } from './pages/not-found/not-found/not-found';
import { DetalleOrden } from './pages/ordenes/detalle-orden/detalle-orden';

export const routes: Routes = [
      {
    path: '',
    redirectTo: 'ordenes',
    pathMatch: 'full'
  },
  {
    path: 'ordenes',
    component: ListaOrdenes
  },
  {
    path: 'ordenes/:id',
    component: DetalleOrden
  },
  {
    path: '**',
    component: NotFound
  }
];
