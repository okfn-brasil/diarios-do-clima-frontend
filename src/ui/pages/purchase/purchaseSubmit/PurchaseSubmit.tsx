import { useEffect } from 'react';
import { FormPurchaseModel, getCardType, SessionModel, SubscriptionModel } from '@app/models/purchase.model';
import BillingService from '@app/services/billing';
import { TEXTS } from '@app/ui/utils/portal-texts';
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
  isModal?: boolean;
}

const PurchaseSubmit = ({form, onSuccess, onError, isModal, isSubmitting, phoneMethod, addressMethod}: PropsPurchaseSubmit) => {
  const billingService = new BillingService();

  const errorMessage = (text: string) => {
    return `${TEXTS.purchasePage.errors.errorPartA} ${text}. \n\n${TEXTS.purchasePage.errors.errorPartB}`;
  };

  useEffect(() => {
    if (isSubmitting) {
      submit();
    }
     
  }, [isSubmitting]);

  const submit = () => {
    const paymentErrorMessage = TEXTS.purchasePage.errors.onPayment;
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
        onError(errorMessage(TEXTS.purchasePage.errors.onCard));
      });
  };

  const addAddress = () => {
    billingService.addAddress(form, addressMethod)
      .then(() => {
        addPhone();
      })
      .catch(() => {
        onError(errorMessage(TEXTS.purchasePage.errors.onAddress));
      });
  };

  const addPhone = () => {
    billingService.addPhone(form, phoneMethod)
      .then(() => {
        if(isModal) {
          onSuccess('');
        } else {
          postPlanId();
        }
      })
      .catch(() => {
        onError(errorMessage(TEXTS.purchasePage.errors.onPhone));
      });
  };

  const postPlanId = () => {
    billingService.postSubscription(TEXTS.purchasePage.planCode).then((response: SubscriptionModel)  => {
      onSuccess(response.plan);
    }).catch(() => {
      onError(errorMessage(TEXTS.purchasePage.errors.onPlan));
    });
  };

  return (null);
};

export default PurchaseSubmit;