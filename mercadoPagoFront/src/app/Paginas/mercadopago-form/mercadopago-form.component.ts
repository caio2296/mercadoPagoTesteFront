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


  deviceId: string | undefined;
  ngOnInit(): void {

    // const checkDeviceId = () => {
    //   if (window['MP_DEVICE_SESSION_ID']) {
    //     this.deviceId = window['MP_DEVICE_SESSION_ID'];
    //     console.log('Device ID capturado:', this.deviceId);
    //   } else {
    //     console.warn('Device ID ainda não disponível. Tentando novamente...');
    //     setTimeout(checkDeviceId, 100); // Tente novamente após 100ms
    //   }
    // };
    // resolver isso dps 

    
    

    // checkDeviceId(); // Inicia a verificação do Device ID
    CheckoutMercadoPago.initializeMercadoPagoBrick();
  }

  public static  checkDeviceId(): string {
    let deviceId: string;
    const id = (window as any).MP_DEVICE_SESSION_ID;
    if (id) {
      deviceId = id;
      return deviceId;
    } else {
      return "";
    }
  }
}