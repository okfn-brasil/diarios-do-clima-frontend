import Modal from '@app/ui/components/modal/Modal';
import successImage from '@app/assets/images/alert_modals/alert-created.svg';

import './ModalCreated.scss';
import ButtonGreen from '../../button/ButtonGreen/ButtonGreen';
import ButtonOutlined from '../../button/buttonOutlined/ButtonOutlined';

interface ModalCreatedProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateAnother: () => void;
}

const ModalCreated = ({isOpen, onClose, onCreateAnother}: ModalCreatedProps) => {


  return (
    <Modal isOpen={isOpen} title={'Alerta criado'} onClose={onClose} className='create-alert'>
      <div className='modal-alert-success'>
        <h3 className='h3-class-sx-margin'>Pronto! Agora é só aguardar</h3>
        <div className='paragraph-class'>Já estamos de olho nos diários oficiais  e enviaremos qualquer novidade baseado nos seus filtros</div>
        <div className='success-image'>
          <img src={successImage} alt='mulher escolhendo entre icones'/>
        </div>
        <div className='buttons'>
          <ButtonGreen onClick={onClose} fullWidth>Continuar buscando</ButtonGreen>
          <ButtonOutlined onClick={onCreateAnother} fullWidth>Criar outro alerta</ButtonOutlined>
        </div>
      </div>
    </Modal>
  );
};

export default ModalCreated;
