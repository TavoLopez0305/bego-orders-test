import { Component,input } from '@angular/core';

@Component({
  selector: 'app-loading',
  imports: [],
  templateUrl: './loading.html',
  styleUrl: './loading.css',
  standalone:true
})
export class Loading {

  mensaje = input<string>('Loading information...');

}
