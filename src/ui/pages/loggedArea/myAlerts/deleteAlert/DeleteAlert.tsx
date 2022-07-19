import ButtonGreen from '@app/ui/components/button/ButtonGreen/ButtonGreen';
import ButtonOutlined from '@app/ui/components/button/buttonOutlined/ButtonOutlined';
import Modal from '@app/ui/components/modal/Modal';

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
          <h3 className='h3-class-sx-margin'>Tem certeza que deseja remover o alerta?</h3>
          <div className='paragraph-class'>Você não receberá mais notificações desse alerta e essa configuração será deletada permanentemente.</div>
          <div className='buttons'>
            <ButtonGreen fullWidth onClick={() => onConfirmDelete(alertId)}>Sim, desejo remover</ButtonGreen>
            <ButtonOutlined fullWidth onClick={onClose}>Cancelar</ButtonOutlined>
            <div className='error'>{errorMessage}</div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteAlert;