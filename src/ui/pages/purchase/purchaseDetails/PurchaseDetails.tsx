import { Link } from 'react-router-dom';
import SubmitForm from '@app/ui/components/forms/submitForm/SubmitForm';
import { Grid } from '@mui/material';

import './PurchaseDetails.scss';

interface PropsPurchaseDetails {
  errorMessage: JSX.Element;
  isLoading: boolean;
}

const PurchaseDetails = ({errorMessage, isLoading}: PropsPurchaseDetails) => {
  const mockPlan = {
    name: 'Profissional',
    value: 0,
  };
  return (
    <Grid className='purchase-details'>
      <div className='details-box'>
        <div className='details-title'>
          Detalhes da assinatura
        </div>
        <div className='plan-details'>
          <div className='plan-name'>
            {mockPlan.name}
          </div>
          <div  className='plan-value'>
            R$ {mockPlan.value.toFixed(2)}/mês*
          </div>
          <div className='plan-alert'>
            * cobrado mensalmente após o período de 15 dias testes
          </div>
        </div>
        <SubmitForm disabled={isLoading} classess='submit-purchase' label='Assinar'/>

        <div 
          className='purchase-terms'
        >
          Ao clicar em assinar você está concordando com nossos
          <Link to='' className='hover-animation blue-link'> termos de assinantes. </Link>
          Sua assinatura será <b>renovada automaticamente</b> todo mês ao realizar a cobrança no seu cartão 
          de crédito cadastrado até que você realize o cancelamento. <br/>
          Você pode cancelar a qualquer 
          momento antes do próximo ciclo de pagamento.
        </div>
        <div className='error-alert'>{errorMessage}</div>
      </div>
    </Grid>
  );
};

export default PurchaseDetails;