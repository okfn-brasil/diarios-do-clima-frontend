
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FormPurchaseModel } from '@app/models/purchase.model';
import { UserState } from '@app/models/user.model';
import Modal from '@app/ui/components/modal/Modal';
import PurchaseForm from '@app/ui/pages/purchase/purchaseForm/PurchaseForm';
import { TEXTS } from '@app/ui/utils/portal-texts';

import './ChangePayment.scss';

interface ChangePaymentInterface {
  isOpen: boolean;
  onClose: () => void;
  userData: UserState;
}

const ChangePaymentModal = ({isOpen, userData, onClose}: ChangePaymentInterface) => {
  const [fields, setFields] : [FormPurchaseModel, Dispatch<SetStateAction<FormPurchaseModel>>] = useState({} as FormPurchaseModel);

  useEffect(() => {
    if(userData && userData.address && userData.address.street && userData.credit_card) {
      const splitedDate = userData.credit_card?.holder_birth_date.split('-') as string[];
      setFields({
        card: { value: '' },
        fullName: { value: '' },
        validity: { value: '' },
        cvv: { value: '' },
        address: { value: getValue(userData.address?.street) },
        city: { value: getValue(userData.address?.city) },
        state: { value: getValue(userData.address?.state) },
        cep: { value: getValue(userData.address?.postal_code) },
        birthday: { value: getValue(`${splitedDate[2]}/${splitedDate[1]}/${splitedDate[0]}`) },
        cpf: { value: getValue(userData.credit_card?.cpf) },
        phone: { value: getValue(userData.phone?.area_code ? (userData.phone?.area_code + userData.phone?.number) : '') },
        district: { value: getValue(userData.address?.district) },
        complement: { value: getValue(userData.address?.complement === 'vazio' ? '' : userData.address?.complement) },
        number: { value: getValue(userData.address?.number) },
      });
    }
  }, [userData]);

  const getValue = (value: string) => {
    return value || '';
  };

  return (
    <Modal
      isOpen={isOpen}
      onBack={onClose}
      className='modal-payment'
      title={TEXTS.myAccount.changePaymentTitle}
    >
      <div className='edit-form-modal'>
        <PurchaseForm filledFields={fields} isModal={true} onSubmit={onClose}/>
      </div>
    </Modal>
  );
};

export default ChangePaymentModal;
