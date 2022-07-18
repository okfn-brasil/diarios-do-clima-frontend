import { Dispatch, useState } from 'react';
import Arrow from '@app/assets/images/icons/arrow-down.svg';
import { ModalFilters } from '@app/models/filters.model';
import { UserState } from '@app/models/user.model';
import AlertsService from '@app/services/alerts';
import ButtonGreen from '@app/ui/components/button/ButtonGreen/ButtonGreen';
import Modal from '@app/ui/components/modal/Modal';

import InputError from '@app/ui/components/forms/inputError/inputError';
import Loading from '@app/ui/components/loading/Loading';

import './ModalSetAlertSpec.scss';

interface ModalSetAlertSpecProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  onClickFilters: () => void;
  onClickKeyWords: () => void;
  userData: UserState;
  openBecomePro: () => void;
  onClickEmail: () => void;
  filters: ModalFilters;
  query: string;
  email: string;
}

const ModalSetAlertSpec = ({isOpen, onClickFilters, onClickKeyWords, onClickEmail, onClose, openBecomePro, onSubmit, userData, email, filters, query}: ModalSetAlertSpecProps) => {
  const alertsService = new AlertsService();
  const [isLoading, setLoading] : [boolean, Dispatch<boolean>] = useState(false);
  const [hasError, setError] : [boolean, Dispatch<boolean>] = useState(false);
  const checkPlan = (result: () => void) => {
    if(!userData.plan_pro) {
      openBecomePro();
    } else {
      result();
    }
  };

  const onFilters = () => {
    onClickFilters();
  };

  const onKeyWords = () => {
    onClickKeyWords();
  };

  const onEmail = () => {
    onClickEmail();
  };

  
  const submit = () => {
    setError(false);
    setLoading(true);
    alertsService.postAlert(filters, (email || userData.email) as string, query).then(() => {
      onSubmit();
      setLoading(false);
    }).catch(() => {
      setLoading(false);
      setError(true);
    });
  };

  return (
    <>
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
            <div className='small-text alert-filter-keys'>{query ? query : 'Cadastre palavras chaves na sua busca (Obrigatório)'}</div>
          </div>
          <hr className='thin-line'/>
          {
            userData.plan_pro ? 
              <div className='small-text email-setting'>
                <span>Seus alertas serão encaminhados para <b>{email || userData.email}</b></span>
                <span className='blue-link hover-animation' onClick={() => {checkPlan(onEmail);}}>Editar</span>
              </div> :
              <></>
          }
          <div className='button-space'>
            <InputError>{hasError ? 'Ocorreu um erro ao cadastrar o alerta, por favor, tente novamente' : ''}</InputError>
            <ButtonGreen disabled={!query} onClick={() => {checkPlan(submit);}}>Criar Alerta</ButtonGreen>
          </div>
        </div>
      </Modal>
      <Loading isLoading={isLoading}/>
    </>
  );
};

export default ModalSetAlertSpec;
