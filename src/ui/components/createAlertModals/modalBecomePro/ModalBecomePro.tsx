import ButtonGreen from '@app/ui/components/button/ButtonGreen/ButtonGreen';
import ButtonOutlined from '@app/ui/components/button/buttonOutlined/ButtonOutlined';
import Modal from '@app/ui/components/modal/Modal';
import { urls } from '@app/ui/utils/urls';
import { Link } from 'react-router-dom';
import './ModalBecomePro.scss';

interface ModalBecomeProProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalBecomePro = ({isOpen, onClose}: ModalBecomeProProps) => {

  return (
    <Modal isOpen={isOpen} className='become-pro-modal'>
      <div className='become-pro-modal-content'>
        <p className='h3-class-sx-margin'>Faça upgrade para Profissional</p>
        <p className='paragraph-class'>Para acessar todas as funcionalidades disponíveis no Diário do Clima, faça um teste grátis por 7 dias. </p>
        <Link className='blue-link hover-animation' to={urls.plans.url}>Saiba mais sobre a assinatura</Link>
        <div className='buttons'>
          <Link to={urls.purchase.url}><ButtonGreen classess='hover-animation'>Começar período grátis</ButtonGreen></Link>
          <ButtonOutlined classess='hover-animation' onClick={onClose}>Cancelar</ButtonOutlined>
        </div>
      </div>
    </Modal>
  );
}

export default ModalBecomePro;
