import { Routes,RouterModule } from '@angular/router';
import { Component, NgModule } from '@angular/core';
import { MercadopagoFormComponent } from '../app/Paginas/mercadopago-form/mercadopago-form.component';
import { StatusScreenBrickComponent } from './Paginas/status-screen-brick/status-screen-brick.component';
import{CartoesSalvosComponent} from './Paginas/cartoes-salvos/cartoes-salvos.component';
import { HttpClientModule } from '@angular/common/http';
import { MercadoPagoService } from './Services/mercado-pago.service';


export const routes: Routes = [{
    path:"",
    pathMatch:"full",
    redirectTo:"mercadoPago"
  },
  {
    path:"mercadoPago", component:MercadopagoFormComponent
  },
  {
    path:"statusScreen", component:StatusScreenBrickComponent
  },
  {
    path:"cartoesSalvos", component:CartoesSalvosComponent
  }
];
@NgModule({
    imports: [RouterModule.forRoot(routes), HttpClientModule],
    exports: [RouterModule],
    providers: [MercadoPagoService]
  })
  export class AppRoutingModule { }