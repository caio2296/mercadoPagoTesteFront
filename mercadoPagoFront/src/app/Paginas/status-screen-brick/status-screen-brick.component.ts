import { Component, OnInit } from '@angular/core';
import { CheckoutMercadoPago } from 'C:/Users/caioc/Documents/mercadoPagoTesteFront/mercadoPagoTesteFront/mercadoPagoFront/src/app/Helpers/CheckoutMercadoPago';

@Component({
  selector: 'app-status-screen-brick',
  standalone: true,
  imports: [],
  templateUrl: './status-screen-brick.component.html',
  styleUrl: './status-screen-brick.component.scss'
})
export class StatusScreenBrickComponent implements OnInit {


   ngOnInit(): void {
     CheckoutMercadoPago.inicializeStatusScreenBrick(1234567);
  }
}
