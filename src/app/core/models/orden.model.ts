import { Destino } from "./destino.model";

export interface Orden {
  _id: string;
  status: number;
  order_number: string;
  type: string;
  destinations: Destino[];
  status_string: string;
  status_class:string;
  driver_thumbnail: string | null;
}