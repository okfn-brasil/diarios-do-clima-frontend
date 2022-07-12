import { UserState } from '@app/models/user.model';
import ButtonGreen from '@app/ui/components/button/ButtonGreen/ButtonGreen';
import Modal from '@app/ui/components/modal/Modal';
import Arrow from '@app/assets/images/icons/arrow-down.svg';
import './ModalCreateAlert.scss';

interface ModalCreateAlertProps {
  isOpen: boolean;
  onClose: () => void;
  userData: UserState;
  openBecomePro: () => void;
}

const ModalCreateAlert = ({isOpen, onClose, openBecomePro, userData}: ModalCreateAlertProps) => {
  const checkPlan = (result: () => void) => {
    if(!userData.plan_pro) {
      openBecomePro();
    } else {
      result();
    }
  }

  const onSubmit = () => {
  }

  const onClickFilters = () => {
  }

  const onClickKeyWords = () => {
  }

  return (
    <Modal isOpen={isOpen} title={'Criar Alerta'} showFlag={!userData.plan_pro} onClose={onClose} className='create-alert'>
      <div className='create-alert-content'>
        <p className='title paragraph-class'>
          Crie um alerta com aspectos da política ambiental que deseja monitorar
        </p>
        <hr className='thin-line'/>
        <div className='alert-filters' onClick={() => {checkPlan(onClickFilters)}}>
          <div className='green-arrow'><img src={Arrow} alt='seta para a direita'/></div>
          <div className='small-text alert-filter-desc'>Edite os filtros para receber alertas com o tema que você quer</div>
          <div className='small-text alert-filter-keys'>Manaus</div>
        </div>
        <hr className='thin-line'/>
        <div className='alert-filters' onClick={() => {checkPlan(onClickKeyWords)}}>
          <div className='green-arrow'><img src={Arrow} alt='seta para a direita'/></div>
          <div className='small-text alert-filter-desc'>Adicione palavras-chave</div>
          <div className='small-text alert-filter-keys'>Adicionar até 5</div>
        </div>
        <hr className='thin-line'/>
        {
          userData.plan_pro ? 
          <div className='small-text email-setting'>
            <span>Seus alertas serão encaminhados para <b>{userData.email}</b></span>
            <span className='blue-link hover-animation'>Editar</span>
          </div> :
          <></>
        }
        <div className='button-space'>
          <ButtonGreen onClick={() => {checkPlan(onSubmit)}}>Criar Alerta</ButtonGreen>
        </div>
      </div>
    </Modal>
  );
}

export default ModalCreateAlert;
