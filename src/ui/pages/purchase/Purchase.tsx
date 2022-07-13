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
            Comece seu período de 7 dias de teste.
          </div>
          <div className='sub-title'>
            Usufrua dos benefícios de ser PRO sem compromisso. Cancele a qualquer momento.
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