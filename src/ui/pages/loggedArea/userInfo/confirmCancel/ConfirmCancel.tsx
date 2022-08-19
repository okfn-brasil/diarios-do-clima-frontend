import ButtonGreen from '@app/ui/components/button/ButtonGreen/ButtonGreen';
import ButtonOutlined from '@app/ui/components/button/buttonOutlined/ButtonOutlined';
import Modal from '@app/ui/components/modal/Modal';
import { TEXTS } from '@app/ui/utils/portal-texts';

import './ConfirmCancel.scss';

interface CancelPlanProps {
  isOpen: boolean;
  onConfirmCancel: () => void;
  onClose: () => void;
}

const CancelPlan = ({onClose, onConfirmCancel, isOpen}: CancelPlanProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='delete-alert-modal'>
        <div>
          <h3 className='h3-class-sx-margin'>{TEXTS.myAccount.cancelPlanModal.title}</h3>
          <div className='paragraph-class'>{TEXTS.myAccount.cancelPlanModal.subtitle}</div>
          <div className='buttons'>
            <ButtonGreen fullWidth onClick={onConfirmCancel}>{TEXTS.myAccount.cancelPlanModal.ok}</ButtonGreen>
            <ButtonOutlined fullWidth onClick={onClose}>{TEXTS.myAccount.cancelPlanModal.cancel}</ButtonOutlined>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CancelPlan;