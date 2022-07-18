import { useEffect } from 'react';
import { FormPurchaseModel, SessionModel, SubscriptionModel } from '@app/models/purchase.model';
import BillingService, { getCardType } from '@app/services/billing';
declare const PagSeguroDirectPayment: {
  setSessionId: (e: string) => void;
  createCardToken: (e: {
    cardNumber: string;
    brand: string | null;
    cvv: string;
    expirationMonth: string;
    expirationYear: string;
    complete: (response: PagSeguroResponse) => void;
    success: (response: PagSeguroResponse) => void;
    error: () => void;
  }) => void
};

interface PagSeguroResponse {
  error: boolean;
  card: {
    token: string;
  }
}

interface PropsPurchaseSubmit {
  isSubmitting: boolean;
  form: FormPurchaseModel;
  onSuccess: (e: string) => void;
  onError: (e: string) => void;
  addressMethod: string;
  phoneMethod: string;
}

const PurchaseSubmit = ({form, onSuccess, onError, isSubmitting, phoneMethod, addressMethod}: PropsPurchaseSubmit) => {
  const billingService = new BillingService();

  const errorMessage = (text: string) => {
    return `Ocorreu um erro ao tentar ${text}. \n\nPor favor, verifique se os dados foram inseridos corretamente e tente novamente.`;
  };

  useEffect(() => {
    if (isSubmitting) {
      submit();
    }
     
  }, [isSubmitting]);

  const submit = () => {
    const paymentErrorMessage = 'realizar o pagamento';
    billingService.getSessionId().then(
      (response: SessionModel) => {
        PagSeguroDirectPayment.setSessionId(response.session);
        PagSeguroDirectPayment.createCardToken({
          cardNumber: form.card.value,
          brand: getCardType(form.card.value),
          cvv: form.cvv.value,
          expirationMonth: form.validity.value.substring(0, 2),
          expirationYear: form.validity.value.substring(2, 6),
          complete: (response: PagSeguroResponse) => {
            if(response.error) {
              onError(errorMessage(paymentErrorMessage));
            }
          },
          success: (response: PagSeguroResponse) => {
            postCard(response.card.token);
          },
          error: () => {
            onError(errorMessage(paymentErrorMessage));
          },
        });
      }
    ). catch(() => {
      onError(errorMessage(paymentErrorMessage));
    });
  };
  
  const postCard = (token: string) => {
    billingService.postCreditCard(form, token)
      .then(() => {
        addAddress();
      })
      .catch(() => {
        onError(errorMessage('cadastrar seu cartão'));
      });
  };

  const addAddress = () => {
    billingService.addAddress(form, addressMethod)
      .then(() => {
        addPhone();
      })
      .catch(() => {
        onError(errorMessage('cadastrar o endereço'));
      });
  };

  const addPhone = () => {
    billingService.addPhone(form, phoneMethod)
      .then(() => {
        postPlanId();
      })
      .catch(() => {
        onError(errorMessage('cadastrar o telefone'));
      });
  };

  const postPlanId = () => {
    billingService.postSubscription('9ea3eb5f-d2d5-4433-8714-43fa7bdb0ce3').then((response: SubscriptionModel)  => {
      onSuccess(response.plan);
    }).catch(() => {
      onError(errorMessage('cadastrar seu novo plano'));
    });
  };

  return (null);
};

export default PurchaseSubmit;