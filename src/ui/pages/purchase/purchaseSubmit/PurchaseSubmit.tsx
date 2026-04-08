import { useEffect } from 'react';
import { FormPurchaseModel, getCardType, Plan, SessionModel, SubscriptionModel } from '@app/models/purchase.model';
import BillingService from '@app/services/billing';
import { TEXTS } from '@app/ui/utils/portal-texts';
declare const PagSeguro: {
  encryptCard: (e: {
    publicKey: string;
    holder: string;
    number: string;
    expMonth: string;
    expYear: string;
    securityCode: string;
  }) => PagSeguroResponse;
};

interface PagSeguroResponse {
  hasErrors: boolean;
  errors?: any;
  encryptedCard: string;
}

interface PropsPurchaseSubmit {
  isSubmitting: boolean;
  form: FormPurchaseModel;
  onSuccess: (e: string) => void;
  onError: (e: string) => void;
  addressMethod: string;
  phoneMethod: string;
  isModal?: boolean;
  plan: Plan;
}

const PurchaseSubmit = ({form, onSuccess, onError, plan, isModal, isSubmitting, phoneMethod, addressMethod}: PropsPurchaseSubmit) => {
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
        try {
          const encrypted = PagSeguro.encryptCard({
            publicKey: response.public_key,
            holder: form.fullName.value,
            number: form.card.value.replace(/\D/g, ''),
            expMonth: form.validity.value.substring(0, 2),
            expYear: form.validity.value.substring(2, 6),
            securityCode: form.cvv.value,
          });

          if (encrypted.hasErrors) {
            onError(errorMessage(paymentErrorMessage));
          } else {
            postCard(encrypted.encryptedCard);
          }
        } catch (e) {
          onError(errorMessage(paymentErrorMessage));
        }
      }
    ).catch(() => {
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
    billingService.postSubscription(plan.id as string).then((response: SubscriptionModel)  => {
      onSuccess(response.plan);
    }).catch(() => {
      onError(errorMessage(TEXTS.purchasePage.errors.onPlan));
    });
  };

  return (null);
};

export default PurchaseSubmit;