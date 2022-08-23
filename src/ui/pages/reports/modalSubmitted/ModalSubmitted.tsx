import ButtonGreen from '@app/ui/components/button/ButtonGreen/ButtonGreen';
import Modal from '@app/ui/components/modal/Modal';
import { TEXTS } from '@app/ui/utils/portal-texts';

import './ModalSubmitted.scss';

interface ModalSubmittedProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalModalSubmitted = ({isOpen, onClose}: ModalSubmittedProps) => {

  return (
    <Modal isOpen={isOpen} title={'Pedido enviado'} onClose={onClose}>
      <div className='success-content container'>
        <h3 className='h3-class-sx-margin'>{TEXTS.reportsPage.submitSuccess.title}</h3>
        <div className='paragraph-class'>{TEXTS.reportsPage.submitSuccess.subtitle}</div>
        <div className='buttons'>
          <ButtonGreen onClick={onClose}>{TEXTS.reportsPage.submitSuccess.button}</ButtonGreen>
        </div>
      </div>
    </Modal>
  );
};

export default ModalModalSubmitted;