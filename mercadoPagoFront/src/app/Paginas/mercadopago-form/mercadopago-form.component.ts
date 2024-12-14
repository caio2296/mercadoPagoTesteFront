import { Component, OnInit } from '@angular/core';
import { CheckoutMercadoPago } from 'C:/Users/caioc/Documents/mercadoPagoTesteFront/mercadoPagoTesteFront/mercadoPagoFront/src/app/Helpers/CheckoutMercadoPago';



@Component({
  selector: 'app-mercadopago-form',
  standalone: true,
  imports: [],
  templateUrl: './mercadopago-form.component.html',
  styleUrls: ['./mercadopago-form.component.scss'] // Corrigido para styleUrls
})
export class MercadopagoFormComponent implements OnInit {

  ngOnInit(): void {
    CheckoutMercadoPago.initializeMercadoPagoBrick();
  }
}