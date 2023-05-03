import { Link } from 'react-router-dom';
import ButtonGreen from '@app/ui/components/button/ButtonGreen/ButtonGreen';
import ButtonOutlined from '@app/ui/components/button/buttonOutlined/ButtonOutlined';
import Modal from '@app/ui/components/modal/Modal';
import { TEXTS } from '@app/ui/utils/portal-texts';
import { urls } from '@app/ui/utils/urls';

import './ModalBecomePro.scss';

interface ModalBecomeProProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalBecomePro = ({isOpen, onClose}: ModalBecomeProProps) => {

  return (
    <Modal isOpen={isOpen} className='become-pro-modal'>
      <div className='become-pro-modal-content'>
        <p className='h3-class-sx-margin'>{TEXTS.becomeProModal.title}</p>
        <p className='paragraph-class'>{TEXTS.becomeProModal.subtitle}</p>
        <Link className='blue-link hover-animation' to={urls.plans.url}>{TEXTS.becomeProModal.knowMore}</Link>
        <div className='buttons'>
          <Link to={urls.purchase.url}><ButtonGreen classes='hover-animation'>{TEXTS.becomeProModal.startTest}</ButtonGreen></Link>
          <ButtonOutlined classes='hover-animation' onClick={onClose}>{TEXTS.becomeProModal.cancel}</ButtonOutlined>
        </div>
      </div>
    </Modal>
  );
};

export default ModalBecomePro;
