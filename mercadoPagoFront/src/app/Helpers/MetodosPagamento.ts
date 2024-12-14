import { CheckoutMercadoPago } from '../Helpers/CheckoutMercadoPago';
export class MetodosPagamento{

static async pagamentoPix(formData:any): Promise<any>{

  let paymentResult;
    let paymentResponse = await fetch("https://localhost:44318/api/ProcessarPagamentoPix", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
       Email: formData.payer.email
      }),
    });
  paymentResult = await paymentResponse.json();
  console.log('Pagamento processado com sucesso!', paymentResult);

  return paymentResult; // Finaliza a Promise com o resultado do pagamento
  }

static async pagamentoCartao(preferenceData: any,formData:any,payerData:any): Promise<any>{
        let paymentResult;
        let paymentResponse = await fetch("https://localhost:44318/api/ProcessarPagamentoCartao", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: formData.token,
            description: "Produto Exemplo",
            issuer_id: formData.issuer_id,
            paymentmethodid: formData.payment_method_id,
            TransactionAmount: formData.transaction_amount,
            installments: formData.installments,
              CardholderEmail: payerData.email,
              CardholderName: `${payerData.firstName} ${payerData.lastName}`,
              IdentificationType: formData.payer.identification.type, // Altere para identificationType
              IdentificationNumber: formData.payer.identification.number, // Altere para identificationNumber
            preferenceId: preferenceData.id // Usar o ID da preferência recebida
          }),
        });
      paymentResult = await paymentResponse.json();
      console.log('Pagamento processado com sucesso!', paymentResult);
      return paymentResult; // Finaliza a Promise com o resultado do pagamento
      }

static async SelecionarMetodoPagamento(dadosFormulario: any, dadosPreferenceDoPagamento: any, dadosDoPagador: any) {
        switch (dadosFormulario.payment_method_id) {
          case "pix":
            // pix
            var pagamento = await MetodosPagamento.pagamentoPix(dadosFormulario);
            CheckoutMercadoPago.inicializeStatusScreenBrick(pagamento);
            break;
          case 'bolbradesco':
            // boleto
            console.log("pagamento no boleto");
            break;
          case 'pec':
            // pagamento lotérica
            console.log("pagamento na loterica");
            break;
          default:
            // Agora, chama o endpoint de processar pagamento de cartão
            var pagamento = await MetodosPagamento.pagamentoCartao(dadosPreferenceDoPagamento, dadosFormulario, dadosDoPagador);
            CheckoutMercadoPago.inicializeStatusScreenBrick(pagamento);

            break;
        }
      }

}