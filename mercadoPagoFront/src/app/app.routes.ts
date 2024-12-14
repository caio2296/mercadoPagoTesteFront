import { Routes,RouterModule } from '@angular/router';
import { Component, NgModule } from '@angular/core';
import { MercadopagoFormComponent } from '../app/Paginas/mercadopago-form/mercadopago-form.component';
import { StatusScreenBrickComponent } from './Paginas/status-screen-brick/status-screen-brick.component';

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
  }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }