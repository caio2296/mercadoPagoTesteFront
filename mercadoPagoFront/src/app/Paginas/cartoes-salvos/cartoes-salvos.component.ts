import { Component, OnInit } from '@angular/core';
import { MercadoPagoService } from
 'C:/Users/caioc/Documents/mercadoPagoTesteFront/mercadoPagoTesteFront/mercadoPagoFront/src/app/Services/mercado-pago.service';
 import { HttpClientModule } from '@angular/common/http';
 import { CommonModule } from '@angular/common';

declare var MercadoPago: any; // Declaração para evitar erros com MercadoPago.js



@Component({
  selector: 'app-cartoes-salvos',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [MercadoPagoService],
  templateUrl: './cartoes-salvos.component.html',
  styleUrl: './cartoes-salvos.component.scss'
})


export class CartoesSalvosComponent implements OnInit {
  customerId: string = '1571234884-Gr6HwpNb0nJb7o'; // ID do cliente de teste
  cartoes: any[] = [];

  constructor(private mercadoPagoService: MercadoPagoService) {}

  ngOnInit(): void {
    this.obterCartoes();
    this.inicializarMercadoPago();
  }

  obterCartoes(): void {
    this.mercadoPagoService.obterCartoesCliente(this.customerId).subscribe({
      next: (data) => {
        console.log('Está carregando os cartões:', data);
         // Transforma a resposta em array caso venha como objeto único
      this.cartoes = Array.isArray(data) ? data : [data];

      console.log('Cartões atribuídos a this.cartoes:', this.cartoes);
      },
      error: (err) => {
        console.error('Erro ao carregar cartões:', err);
        this.cartoes = [];
      }
    });
  }

  inicializarMercadoPago(): void {

    const mp = new MercadoPago('APP_USR-14fb8e46-7c2b-4e1a-a935-05dda7abd7c0', {
      locale: 'pt'});
    mp.fields.create('securityCode', {
      placeholder: 'CVV',
       type: 'text'
    }).mount('form-checkout__securityCode-container');
    this.adicionarListenerDeEnvio(mp);
  }

  adicionarListenerDeEnvio(mp: any): void {
    const formElement = document.getElementById('form-checkout') as HTMLFormElement;
    formElement.addEventListener('submit', (e) => this.createCardToken(e, mp));
  }

  async createCardToken(event: Event, mp: any): Promise<void> {
    try {
      const tokenElement = document.getElementById('token') as HTMLInputElement;
      if (!tokenElement.value) {
        event.preventDefault();
        const token = await mp.fields.createCardToken({
          cardId: (document.getElementById('form-checkout__cardId') as HTMLSelectElement).value
        });
        tokenElement.value = token.id;
        console.log('Token gerado:', tokenElement);
              // Enviar o token para o back-end
      this.processarPagamento(tokenElement.value);

      }
    } catch (e) {
      console.error('Erro ao criar o token do cartão: ', e);
    }
  }

  processarPagamento(token: string): void {
    this.mercadoPagoService.processarPagamento(token).subscribe({
      next: (response) => {
        console.log('Pagamento processado com sucesso:', response);
        // Aqui você pode redirecionar o usuário ou exibir uma mensagem de sucesso
      },
      error: (err) => {
        console.error('Erro ao processar o pagamento:', err);
        // Exibir uma mensagem de erro para o usuário
      }
    });
  }
}
