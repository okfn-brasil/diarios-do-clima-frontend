import { useEffect } from "react";
import { FormPurchaseModel } from "@app/models/purchase.model";
import BillingService, { getCardType } from "@app/services/billing";
declare const PagSeguroDirectPayment: any;

interface PagSeguroResponse {
  error: boolean;
  card: {
    token: string;
  }
}

interface PropsPurchaseSubmit {
  isSubmitting: boolean;
  form: FormPurchaseModel;
  onSuccess?: any;
  onError?: any;
  addressMethod: 'POST' | 'PUT';
  phoneMethod: 'POST' | 'PUT';
}

const PurchaseSubmit = ({form, onSuccess, onError, isSubmitting, phoneMethod, addressMethod}: PropsPurchaseSubmit) => {
  const billingService = new BillingService();

  const errorMessage = (e: any) => {
    const errorKey = e ? Object.keys(e)[0] : '';
    return(
      <span>
        Ocorreu um erro ao realizar o pagamento, por favor, verifique os dados inseridos e tente novamente.
        { e && errorKey ? <><br/><br/>Motivo do erro: {e[errorKey]}</> : <></> }
      </span>
    )
  }

  useEffect(() => {
    if (isSubmitting) {
      submit();
    }
     
  }, [isSubmitting])

  const submit = () => {
    billingService.getSessionId().then(
      (response) => {
        PagSeguroDirectPayment.setSessionId(response.session);
        PagSeguroDirectPayment.createCardToken({
          cardNumber: form.card.value,
          brand: getCardType(form.card.value),
          cvv: form.cvv.value,
          expirationMonth: form.validity.value.substring(0, 2),
          expirationYear: form.validity.value.substring(2, 6),
          complete: (response: PagSeguroResponse) => {
            if(response.error) {
              onError(errorMessage({}));
            }
          },
          success: (response: PagSeguroResponse) => {
            postCard(response.card.token);
          },
          error: () => {
            onError(errorMessage({}));
          },
        });
      }
    ). catch(() => {
      onError(errorMessage({}));
    })
  }
  
  const postCard = (token: string) => {
    billingService.postCreditCard(form, token)
      .then(() => {
        addAddress();
      })
      .catch(error => {
        onError(errorMessage(error));
    });
  }

  const addAddress = () => {
    billingService.addAddress(form, addressMethod)
      .then(() => {
        addPhone();
      })
      .catch(error => {
        onError(errorMessage(error));
    });
  }

  const addPhone = () => {
    billingService.addPhone(form, phoneMethod)
      .then(() => {
        postPlanId();
      })
      .catch(error => {
        onError(errorMessage(error));
    });
  }

  const postPlanId = () => {
    billingService.postSubscription('f8f443a6-677a-49bf-8430-9dbc8fda87bc').then((response)  => {
      onSuccess('f8f443a6-677a-49bf-8430-9dbc8fda87bc'); // TO DO REMOVER MOCK
    }).catch(error => {
      onError(errorMessage(error))
    })
  }

  return (null);
}

export default PurchaseSubmit;