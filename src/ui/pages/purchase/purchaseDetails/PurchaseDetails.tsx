import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import SubmitForm from "@app/ui/components/submitForm/SubmitForm";
import { black, blue, gray5, red } from "@app/ui/utils/colors";
import { fontRoboto, fontSora } from "@app/ui/utils/fonts";

interface PropsPurchaseDetails {
  errorMessage: JSX.Element;
  isLoading: boolean;
}

const PurchaseDetails = ({errorMessage, isLoading}: PropsPurchaseDetails) => {
  const mockPlan = {
    name: 'Profissional',
    value: 0,
  }
  return (
    <Grid style={{marginBottom: '80px'}}>
      <div
        style={{
          ...fontSora,
          fontSize: '22px',
          lineHeight: '28px',
          fontWeight: '600'
        }}
      >
        Detalhes da assinatura
      </div>
      <div style={{margin: '24px 0'}}>
        <div style={{...fontRoboto, fontWeight: '600', lineHeight: '18px', marginBottom: '8px'}}>
          {mockPlan.name}
        </div>
        <div  style={{...fontRoboto, lineHeight: '18px', marginBottom: '15px'}}>
          R$ {mockPlan.value.toFixed(2)}/mês*
        </div>
        <div  style={{...fontRoboto, lineHeight: '18px', color: gray5}}>
          * cobrado mensalmente após o período de teste
        </div>
      </div>
      <SubmitForm disabled={isLoading} sx={{marginTop: '0', fontWeight: '600'}} label='Assinar'/>

      <div 
        style={{
          ...fontRoboto,
          marginTop: '24px',
          fontSize: '14px',
          lineHeight: '16px',
          color: black,
        }}
      >
        Ao clicar em assinar você está concordando com nossos
        <Link to='' className='hover-animation' style={{color: blue, fontWeight: 600}}> termos de assinantes. </Link>
        Sua assinatura será <b>renovada automaticamente</b> todo mês ao realizar a cobrança no seu cartão 
        de crédito cadastrado até que você realize o cancelamento. <br/>
        Você pode cancelar a qualquer 
        momento antes do próximo ciclo de pagamento.
      </div>
      <div style={{color: red, fontSize: '14px', marginTop: '20px', ...fontRoboto}}>{errorMessage}</div>
    </Grid>
  );
}

export default PurchaseDetails;