import successImage from '@app/assets/images/alert_modals/alert-created.svg';
import ButtonGreen from '@app/ui/components/button/ButtonGreen/ButtonGreen';
import ButtonOutlined from '@app/ui/components/button/buttonOutlined/ButtonOutlined';
import Modal from '@app/ui/components/modal/Modal';
import { TEXTS } from '@app/ui/utils/portal-texts';
import { urls } from '@app/ui/utils/urls';

import './ModalCreated.scss';

interface ModalCreatedProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateAnother: () => void;
  onCreated?: () => void;
}

const ModalCreated = ({isOpen, onClose, onCreated, onCreateAnother}: ModalCreatedProps) => {

  return (
    <Modal isOpen={isOpen} title={'Alerta criado'} onClose={onCreated || onClose} className='create-alert'>
      <div className='modal-alert-success'>
        <h3 className='h3-class-sx-margin'>{TEXTS.alertCreatedModal.title}</h3>
        <div className='paragraph-class'>{TEXTS.alertCreatedModal.subtitle}</div>
        <div className='success-image'>
          <img src={successImage} alt='mulher escolhendo entre icones'/>
        </div>
        <div className='buttons'>
          <ButtonGreen onClick={onCreated || onClose} fullWidth>{location.href.includes(urls.search.url) ? TEXTS.alertCreatedModal.cotinueSearch : TEXTS.alertCreatedModal.continue}</ButtonGreen>
          <ButtonOutlined onClick={onCreateAnother} fullWidth>{TEXTS.alertCreatedModal.createAnother}</ButtonOutlined>
        </div>
      </div>
    </Modal>
  );
};

export default ModalCreated;
