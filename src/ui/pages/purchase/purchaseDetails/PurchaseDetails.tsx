import SubmitForm from '@app/ui/components/forms/submitForm/SubmitForm';
import { TEXTS } from '@app/ui/utils/portal-texts';
import { Grid } from '@mui/material';

import './PurchaseDetails.scss';

interface PropsPurchaseDetails {
  isLoading: boolean;
}

const PurchaseDetails = ({isLoading}: PropsPurchaseDetails) => {
  const mockPlan = { // TO DO
    name: 'Profissional',
    value: 0,
  };
  return (
    <Grid className='purchase-details'>
      <div className='details-box'>
        <div className='details-title'>
          {TEXTS.purchasePage.detailsTitle}
        </div>
        <div className='plan-details'>
          <div className='plan-name'>
            {mockPlan.name}
          </div>
          <div  className='plan-value'>
            R$ {mockPlan.value.toFixed(2)}{TEXTS.purchasePage.perMonth}
          </div>
          <div className='plan-alert'>
            {TEXTS.purchasePage.detailAlert}
          </div>
        </div>
        <SubmitForm disabled={isLoading} classess='submit-purchase' label={TEXTS.purchasePage.submitLabel}/>

        <div className='purchase-terms'>
          {TEXTS.purchasePage.purchaseTerms}
        </div>
      </div>
    </Grid>
  );
};

export default PurchaseDetails;