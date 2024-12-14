import { GestorPagamentos } from '../Helpers/GestorPagamentos';

declare var MercadoPago: any;
declare global {
    interface Window {
      paymentBrickController: any;
    }
  }



export class CheckoutMercadoPago{

    static initializeMercadoPagoBrick() {
        // Inicializa o SDK do Mercado Pago com a sua public key
        const mp = new MercadoPago('TEST-14aef55c-f356-4e78-8f30-686b99b4f0a8', {
          locale: 'pt' // Define o idioma como português
        });
    
        // Cria o builder dos bricks
        const bricksBuilder = mp.bricks();
    
        // Função para renderizar o Payment Brick
        const renderPaymentBrick = async (bricksBuilder: any) => {
          const settings = {
            initialization: {
              amount: 10000, // Valor total
              preferenceId: "<PREFERENCE_ID>", // ID da preferência gerado no back-end
              payer: {
                firstName: "", // Nome do comprador (será enviado pelo frontend)
                lastName: "",  // Sobrenome do comprador (será enviado pelo frontend)
                email: "" // Email do comprador (será enviado pelo frontend)
              }
            },
            customization: {
              visual: {
                style: {
                  theme: "default", // Tema do visual
                }
              },
              paymentMethods: {
                creditCard: "all",
                debitCard: "all",
                ticket: "all",
                bankTransfer: "all",
                atm: "all",
                onboarding_credits: "all",
                wallet_purchase: "all",
                maxInstallments: 1 // Número máximo de parcelas
              }
            },
            callbacks: {
              onReady: () => {
                console.log('Brick de pagamento está pronto.');
              },
              onSubmit: async ({ selectedPaymentMethod, formData: dadosFormulario }: any) => {
    
                // Construindo o objeto do pagador
                let dadosDoPagador: any = GestorPagamentos.CriarPagador(dadosFormulario);  
    
                try {
    
                  await GestorPagamentos.ProcessarPagamento(dadosDoPagador, dadosFormulario);
                  
                } catch (error) {
    
                  throw error; // Rejeita a Promise em caso de erro
                }
              },
              onError: (error: any) => {
                console.error('Erro no Brick de pagamento:', error);
              }
            }
          };
    
          try {
            // Renderiza o Brick de pagamento no container com id 'paymentBrick_container'
            window.paymentBrickController = await bricksBuilder.create(
              "payment",
              "paymentBrick_container",
              settings
            );
          } catch (error) {
            console.error('Erro ao criar o Brick de pagamento:', error);
          }
        };
    
        // Chama a função para renderizar o Payment Brick
        renderPaymentBrick(bricksBuilder);
      }

   static async inicializeStatusScreenBrick(id_Pagamento:any){
        const mp = new MercadoPago('TEST-14aef55c-f356-4e78-8f30-686b99b4f0a8', {
          locale: 'pt' // Define o idioma como português
        });
        console.log("id: ", id_Pagamento);
        // Cria o builder dos bricks
        const bricksBuilder = mp.bricks();
    
       const renderStatusScreenBrick = async (bricksBuilder: any) => {
      
      const settings = {
        initialization: {
          paymentId: id_Pagamento.id , // id do pagamento a ser mostrado 1328596359
        },
        callbacks: {
          onReady: () => {
            /*
              Callback chamado quando o Brick estiver pronto.
              Aqui você pode ocultar loadings do seu site, por exemplo.
            */
              const paymentBrickContainer = document.getElementById("paymentBrick_container");
              if (paymentBrickContainer) {
                  paymentBrickContainer.classList.add("hidden");
                  setTimeout(() => {
                    paymentBrickContainer.style.display = "none";
                }, 500); // Correspondente ao tempo da transição CSS
              }
    
              // Mostra o Status Screen Brick com transição
              const statusScreenBrickContainer = document.getElementById("statusScreenBrick_container");
              if (statusScreenBrickContainer) {
                  setTimeout(() => {
                      statusScreenBrickContainer.classList.add("visible");
                  }, 500); // Espera a transição de ocultar o Payment Brick
              }
          },
          onError: (error:any) => {
            // callback chamado para todos os casos de erro do Brick
            console.error(error);
          },
        },
       };
       
       window.screen = await bricksBuilder.create(
        'statusScreen',
        'statusScreenBrick_container',
        settings,
       );  
     };
     renderStatusScreenBrick(bricksBuilder);
     
      }

}