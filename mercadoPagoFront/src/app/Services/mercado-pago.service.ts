import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MercadopagoFormComponent } from '../Paginas/mercadopago-form/mercadopago-form.component';

@Injectable({
  providedIn: 'root'
})
export class MercadoPagoService {
  private apiUrl = 'https://localhost:44318/api/MercadoPago/api/ObterListaCartoesCliente';
  private deviceId: string = MercadopagoFormComponent.checkDeviceId();
  private apiUrlPagamento = 'https://localhost:44318/api/CriarAssinaturaCartãoSalvo';

  constructor(private http: HttpClient) {}

  obterCartoesCliente(idCliente: string): Observable<any> {
    console.log(`${this.apiUrl}/${idCliente}`);
    return this.http.get<any>(`${this.apiUrl}/${idCliente}`).pipe(
      tap((res) => console.log('Resposta da API:', res)), // Imprime a resposta no console
      catchError((error) => {
        console.error('Erro na requisição:', error);
        return throwError(() => new Error('Erro ao obter cartões do cliente.'));
      }));
  }

  processarPagamento(token: string): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Cabeçalho Content-Type
      'X-meli-session-id': this.deviceId, // Cabeçalho com o deviceId
    });

    // Corpo da requisição com o token
    const body = JSON.stringify(token);

   
  console.log('Corpo da requisição:', token.toString());
  console.log('Cabeçalhos:', headers);

  return new Observable((observer) => {
    fetch(`${this.apiUrlPagamento}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "X-meli-session-id": MercadopagoFormComponent.checkDeviceId()
      },
      body: body
    })
      .then((response) => response.json()) // Parse the response to JSON
      .then((data) => {
        console.log('Resposta da requisição:', data);
        observer.next(data);  // Emite a resposta para o observer
        observer.complete();   // Finaliza a execução
      })
      .catch((error) => {
        console.error('Erro ao processar pagamento:', error);
        observer.error(error);  // Emite o erro para o observer
      });
  });
  }
}
