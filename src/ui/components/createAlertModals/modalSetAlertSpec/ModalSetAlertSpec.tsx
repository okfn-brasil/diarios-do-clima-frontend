import Arrow from '@app/assets/images/icons/arrow-down.svg';
import { ModalFilters } from '@app/models/filters.model';
import { UserState } from '@app/models/user.model';
import ButtonGreen from '@app/ui/components/button/ButtonGreen/ButtonGreen';
import Modal from '@app/ui/components/modal/Modal';

import './ModalSetAlertSpec.scss';

interface ModalSetAlertSpecProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  onClickFilters: () => void;
  userData: UserState;
  openBecomePro: () => void;
  filters: ModalFilters;
}

const ModalSetAlertSpec = ({isOpen, onClickFilters, onClose, openBecomePro, userData, filters}: ModalSetAlertSpecProps) => {
  const checkPlan = (result: () => void) => {
    if(!userData.plan_pro) {
      openBecomePro();
    } else {
      result();
    }
  };

  const submit = () => {
    //
  };

  const onFilters = () => {
    onClickFilters();
  };

  const onKeyWords = () => {
    //
  };

  return (
    <Modal isOpen={isOpen} title={'Criar Alerta'} showFlag={!userData.plan_pro} onClose={onClose} className='create-alert'>
      <div className='create-alert-content'>
        <p className='title paragraph-class'>
          Crie um alerta com aspectos da política ambiental que deseja monitorar
        </p>
        <hr className='thin-line'/>
        <div className='alert-filters' onClick={() => {checkPlan(onFilters);}}>
          <div className='green-arrow'><img src={Arrow} alt='seta para a direita'/></div>
          <div className='small-text alert-filter-desc'>Edite os filtros para receber alertas com o tema que você quer</div>
          {filters.location ? <div className='small-text alert-filter-keys'>Município: {filters.location}</div> : <></>}
          {filters.themes && filters.themes.length? <div className='small-text alert-filter-keys'>Temas: {filters.themes?.join(', ')}</div> : <></>}
          {filters.ente ? <div className='small-text alert-filter-keys'>Ente do governo: {filters.ente}</div> : <></>}
        </div>
        <hr className='thin-line'/>
        <div className='alert-filters' onClick={() => {checkPlan(onKeyWords);}}>
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
          <ButtonGreen onClick={() => {checkPlan(submit);}}>Criar Alerta</ButtonGreen>
        </div>
      </div>
    </Modal>
  );
};

export default ModalSetAlertSpec;
