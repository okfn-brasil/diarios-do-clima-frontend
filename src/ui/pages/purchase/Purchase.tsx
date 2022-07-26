import { TEXTS } from '@app/ui/utils/portal-texts';
import { Grid } from '@mui/material';

import PurchaseForm from './purchaseForm/PurchaseForm';

import './Purchase.scss';

const Purchase = () => {
  return (
    <Grid container className='container purchase-form-page'>
      <Grid item lg={2} sm={1} xs={0}></Grid>
      <Grid 
        item 
        container 
        lg={8} 
        sm={10}
        xs={12}
      >
        <div className='form-area'>
          <div className='title'>
            {TEXTS.purchasePage.title}
          </div>
          <div className='sub-title'>
            {TEXTS.purchasePage.subTitle}
          </div>
        </div>
        <Grid item xs={12}>
          <PurchaseForm />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Purchase;