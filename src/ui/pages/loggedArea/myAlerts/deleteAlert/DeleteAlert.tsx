import ButtonGreen from '@app/ui/components/button/ButtonGreen/ButtonGreen';
import ButtonOutlined from '@app/ui/components/button/buttonOutlined/ButtonOutlined';
import Modal from '@app/ui/components/modal/Modal';
import { TEXTS } from '@app/ui/utils/portal-texts';

import './DeleteAlert.scss';

interface DeleteAlertProps {
  alertId: string;
  isOpen: boolean;
  onConfirmDelete: (id: string) => void;
  onClose: () => void;
  errorMessage: string;
}

const DeleteAlert = ({alertId, onClose, onConfirmDelete, isOpen, errorMessage}: DeleteAlertProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='delete-alert-modal'>
        <div>
          <h3 className='h3-class-sx-margin'>{TEXTS.myAlerts.deleteAlert.title}</h3>
          <div className='paragraph-class'>{TEXTS.myAlerts.deleteAlert.subTitle}</div>
          <div className='buttons'>
            <ButtonGreen fullWidth onClick={() => onConfirmDelete(alertId)}>{TEXTS.myAlerts.deleteAlert.ok}</ButtonGreen>
            <ButtonOutlined fullWidth onClick={onClose}>{TEXTS.myAlerts.deleteAlert.cancel}</ButtonOutlined>
            <div className='error'>{errorMessage}</div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteAlert;