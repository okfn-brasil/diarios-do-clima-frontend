import AlertIcon from '@app/assets/images/icons/alert.svg';
import ButtonGreen from '@app/ui/components/button/ButtonGreen/ButtonGreen';
import ButtonOutlined from '@app/ui/components/button/buttonOutlined/ButtonOutlined';
import Modal from '@app/ui/components/modal/Modal';
import { TEXTS } from '@app/ui/utils/portal-texts';

import './WarnModal.scss';

interface WanrModalProps {
  message: string;
  onClose: () => void;
  onCancel: () => void;
  isOpen: boolean;
}

const WanrModal = ({isOpen, message, onClose, onCancel}: WanrModalProps) => {

  return (
    <Modal isOpen={isOpen} className='warn-modal'>
      <div>
        <img src={AlertIcon} alt='icone de alerta'/>
        <div className='paragraph-class'>{message}</div>
        <ButtonGreen fullWidth onClick={onClose}>{TEXTS.warnModal.ok}</ButtonGreen>
        <ButtonOutlined fullWidth onClick={onCancel}>{TEXTS.warnModal.cancel}</ButtonOutlined>
      </div>
    </Modal>
  );
};

export default WanrModal;
