import {MetodosPagamento} from '../Helpers/MetodosPagamento';
export class GestorPagamentos{

      static CriarPagador(dadosFormulario: any) {
        let dadosDoPagador: any;
        switch (dadosFormulario.payment_method_id) {
          case "pix":
            // pix
            dadosDoPagador = {
              email: dadosFormulario.payer.email,
              firstName: '', //o fomulário não possui esse campo, necessário inserir utilizando um model externo
              lastName: '', //o fomulário não possui esse campo, necessário inserir utilizando um model externo
              identification: {
                type: '',
                number: ''
              }
            };
            break;
          case 'bolbradesco':
            // boleto
            console.log("pagador do boleto");
            break;
          case 'pec':
            // pagamento lotérica
            console.log("pagador da loterica");
            break;
          default:
            dadosDoPagador = {
              email: dadosFormulario.payer.email,
              firstName: '', //o fomulário não possui esse campo, necessário inserir utilizando um model externo
              lastName: '', //o fomulário não possui esse campo, necessário inserir utilizando um model externo
              identification: {
                type: dadosFormulario.payer.identification.type,
                number: dadosFormulario.payer.identification.number
              }
            };
            break;
        }
        return dadosDoPagador;
      }
    
      static async ObterPreferenciaPagamento(dadosPagador: any) {
        let preferenciaPagamento = dadosPagador;
        return await fetch("https://localhost:44318/api/ObterPreferencia", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(preferenciaPagamento),
        });
      }

      static async ProcessarPagamento(dadosDoPagador: any, dadosFormulario: any) {
        // Primeiro, obtém a preferência de pagamento
         const preferencePagamentoResponse = await this.ObterPreferenciaPagamento(dadosDoPagador);
     
         const dadosPreferenceDoPagamento = await preferencePagamentoResponse.json();
     
         await MetodosPagamento.SelecionarMetodoPagamento(dadosFormulario, dadosPreferenceDoPagamento, dadosDoPagador);
      }   

}
